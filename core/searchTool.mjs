import fs from 'node:fs/promises'

export default class {
    static #ignoreDir = /^node_modules|^npm_make|^\./

    static async searchPath(output, base, last) {
        let dir = await fs.opendir(base + last)
        for await (let item of dir) {
            if (item.isDirectory()) {
                if (!this.#ignoreDir.test(item.name)) {
                    await this.searchPath(output, base, last + '/' + item.name)
                }
            } else {
                output.push(last + '/' + item.name)
            }
        }
    }

    static async searchProject(project) {

    }
}
