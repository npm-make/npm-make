import fs from 'node:fs/promises'
import path from 'node:path'

export default class {
    result = []

    async search(base, pattern) {
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
        await this.#searchNext(base, ...patternMap)
    }

    async #searchNext(base, patternFirst, ...patternOther) {
        try {
            if (patternFirst === undefined) {
                await this.#appendFile(base)
            } else if (patternFirst instanceof RegExp) {
                await this.#searchDir(base, false, patternFirst, ...patternOther)
            } else if (patternFirst === '**') {
                if (patternOther.length > 0) {
                    await this.#searchDir(base, true, null, ...patternOther)
                }
            } else {
                let next = path.join(base, patternFirst)
                await this.#searchNext(next, ...patternOther)
            }
        } catch {
            //这可能是拼写错误导致的，应当提示警告，但也可能是正常扫描过程，难以区分，暂时忽略
        }
    }

    async #searchDir(base, whole, patternFirst, ...patternOther) {
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
                            await this.#searchNext(next, ...patternOther)
                        }
                        if (whole) {
                            await this.#searchDir(next, true, null, ...patternOther)
                        }
                    }
                }
                let isFile = item.isFile()
                if (isFile) {
                    if (patternOther.length === 0) {
                        await this.#appendFile(next, true)
                    }
                }
            }
        }
    }

    async #appendFile(path) {
        let file = await fs.stat(path)
        this.result.push({ path, size: file.size, modify: file.mtimeMs })
    }
}
