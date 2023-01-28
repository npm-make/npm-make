import fs from 'node:fs/promises'
import path from 'node:path'

export default class {
    static #ignoreDir = /^node_modules|^npm_make|^\./

    static async search(base, pattern) {
        let result = []
        let patternList = pattern.split(/[/\\]+/)
        await this.#searchNext(base, result, patternList, 0)
        return result
    }

    static async #searchNext(base, result, patternList, index) {
        if (patternList.length > index + 1) {
            if (patternList[index].includes('*')) {
                if (patternList[index] === '**') {

                } else {
                    let regex = this.#makeRegex(patternList[index])
                    let dir = await fs.opendir(base)
                    for await (let item of dir) {
                        if (item.isDirectory()) {
                            if (!this.#ignoreDir.test(item.name)) {
                                if (regex.test(item.name)) {
                                    let temp = path.join(base, item.name)
                                    await this.#searchNext(temp, result, patternList, index + 1)
                                }
                            }
                        }
                    }
                }
            } else {
                let temp = path.join(base, patternList[index])
                await this.#searchNext(temp, result, patternList, index + 1)
            }
        } else {
            if (patternList[index].includes('*')) {
                if (patternList[index] === '**') {
                    await this.#searchDoubleLast(base, result)
                } else {
                    let regex = this.#makeRegex(patternList[index])
                    let dir = await fs.opendir(base)
                    for await (let item of dir) {
                        if (item.isFile()) {
                            if (regex.test(item.name)) {
                                let temp = path.join(base, item.name)
                                result.push(temp)
                            }
                        }
                    }
                }
            } else {
                let temp = path.join(base, patternList[index])
                result.push(temp)
            }
        }
    }

    static async #searchDoubleNext(base, result, patternList, index) {
        let dir = await fs.opendir(base)
        for await (let item of dir) {
            if (item.isDirectory()) {
                if (!this.#ignoreDir.test(item.name)) {
                }
            } else if (item.isFile()) {
            }
        }
    }

    static async #searchDoubleLast(base, result) {
        let dir = await fs.opendir(base)
        for await (let item of dir) {
            if (item.isDirectory()) {
                if (!this.#ignoreDir.test(item.name)) {
                    let temp = path.join(base, item.name)
                    await this.#searchDoubleLast(temp, result)
                }
            } else if (item.isFile()) {
                let temp = path.join(base, item.name)
                result.push(temp)
            }
        }
    }

    static #makeRegex(input) {
        let temp1 = input.replaceAll('.', '\\.')
        let temp2 = temp1.replaceAll('*', '.*')
        return new RegExp('^' + temp2 + '$')
    }
}
