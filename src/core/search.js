import fs from 'node:fs/promises'
import path from 'node:path'

export default class {
    static async search(output, base, pattern) {
        let patternSplit = pattern.split(/[/\\]+/)
        let patternMap = patternSplit.map(
            input => {
                let hasStar = input.includes('*')
                if (hasStar) {
                    if (input === '**') {
                        return input
                    } else {
                        let temp1 = input.replaceAll('.', '\\.')
                        let temp2 = temp1.replaceAll('?', '.?')
                        let temp3 = temp2.replaceAll('*', '.*')
                        return new RegExp('^' + temp3 + '$')
                    }
                } else {
                    return input
                }
            }
        )
        await this.#searchNext(output, base, ...patternMap)
    }

    static async #searchNext(output, base, patternFirst, ...patternOther) {
        try {
            if (patternFirst === undefined) {
                await this.#appendFile(output, base)
            } else if (patternFirst instanceof RegExp) {
                await this.#searchDir(output, base, false, patternFirst, ...patternOther)
            } else if (patternFirst === '**') {
                if (patternOther.length > 0) {
                    await this.#searchDir(output, base, true, null, ...patternOther)
                }
            } else {
                let next = path.join(base, patternFirst)
                await this.#searchNext(output, next, ...patternOther)
            }
        } catch {
            //这可能是拼写错误导致的，应当提示警告，但也可能是正常扫描过程，难以区分，暂时忽略
        }
    }

    static async #searchDir(output, base, whole, patternFirst, ...patternOther) {
        let dir = await fs.opendir(base)
        for await (let item of dir) {
            let isMatch = whole || patternFirst.test(item.name)
            if (isMatch) {
                let next = path.join(base, item.name)
                let isDir = item.isDirectory()
                if (isDir) {
                    let isIgnore = /^node_modules|^npm_make|^\./.test(item.name)
                    if (!isIgnore) {
                        if (patternOther.length > 0) {
                            await this.#searchNext(output, next, ...patternOther)
                        }
                        if (whole) {
                            await this.#searchDir(output, next, true, null, ...patternOther)
                        }
                    }
                }
                let isFile = item.isFile()
                if (isFile) {
                    if (patternOther.length === 0) {
                        await this.#appendFile(output, next)
                    }
                }
            }
        }
    }

    static async #appendFile(output, path) {
        let file = await fs.stat(path)
        output.push({ path, size: file.size, modify: file.mtimeMs })
    }
}
