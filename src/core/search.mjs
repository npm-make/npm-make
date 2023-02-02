import fs from 'node:fs/promises'

export default class {
    static async searchDir(output, base, last) {
        let dir = await fs.opendir(base + last)
        for await (let item of dir) {
            let isDir = item.isDirectory()
            if (isDir) {
                let isIgnore = /^node_modules|^npm_make|^\./.test(item.name)
                if (!isIgnore) {
                    await this.searchDir(output, base, last + '/' + item.name)
                }
            } else {
                output.push(last + '/' + item.name)
            }
        }
    }
}
