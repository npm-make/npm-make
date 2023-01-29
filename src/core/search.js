import fs from 'node:fs/promises'
import path from 'node:path'

export default class {
    static async search(base, pattern) {
        let result = []
        let patternSplit = pattern.split(/[/\\]+/)
        let patternMap = patternSplit.map(this.#patternMap)
        await this.#searchNext(base, result, ...patternMap)
        return result
    }

    static async #searchNext(base, result, patternFirst, ...patternOther) {
        try {
            if (patternFirst === undefined) {
                result.push(base)
            } else if (patternFirst instanceof RegExp) {
                await this.#searchDir(base, result, false, patternFirst, ...patternOther)
            } else if (patternFirst === '**') {
                await this.#searchNext(base, result, ...patternOther)
                await this.#searchDir(base, result, true, null, ...patternOther)
            } else {
                let next = path.join(base, patternFirst)
                await this.#searchNext(next, result, ...patternOther)
            }
        } catch {
            //这可能是拼写错误导致的，应当提示警告，但也可能是正常扫描过程，难以区分，暂时忽略
        }
    }

    static async #searchDir(base, result, doubleStar, patternFirst, ...patternOther) {
        let dir = await fs.opendir(base)
        for await (let item of dir) {
            let isMatch = doubleStar || patternFirst.test(item.name)
            if (isMatch) {
                let next = path.join(base, item.name)
                if (patternOther.length > 0) {
                    let isDir = item.isDirectory()
                    if (isDir) {
                        let isIgnore = /^node_modules|^npm_make|^\./.test(item.name)
                        if (!isIgnore) {
                            await this.#searchNext(next, result, ...patternOther)
                            if (doubleStar) {
                                await this.#searchDir(next, result, true, null, ...patternOther)
                            }
                        }
                    }
                } else {
                    let isFile = item.isFile()
                    if (isFile) {
                        result.push(next)
                    }
                }
            }
        }
    }

    static #patternMap(input) {
        let hasStar = input.includes('*')
        if (hasStar) {
            if (input === '**') {
                return input
            } else {
                let temp1 = input.replaceAll('.', '\\.')
                let temp2 = temp1.replaceAll('*', '.*')
                return new RegExp('^' + temp2 + '$')
            }
        } else {
            return input
        }
    }
}
