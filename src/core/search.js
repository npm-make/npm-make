import fs from 'node:fs/promises'
import path from 'node:path'

export default class {
    static async search(base, pattern) {
        let regex = new RegExp(pattern)
        let output = []
        await this.#searchNext(base, regex, output, '')
        return output
    }

    static async #searchNext(base, regex, output, last) {
        let dir = await fs.opendir(base + last)
        for await (let item of dir) {
            let isDir = item.isDirectory()
            if (isDir) {
                let isIgnore = /^node_modules|^npm_make|^\./.test(item.name)
                if (!isIgnore) {
                    await this.#searchNext(base, regex, output, last + '/' + item.name)
                }
            }
            let isFile = item.isFile()
            if (isFile) {
                let isMatch = regex.test(last + '/' + item.name)
                if (isMatch) {
                    let next = path.join(base, last, item.name)
                    output.push(next)
                }
            }
        }
    }
}
