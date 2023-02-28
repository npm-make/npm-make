import fs from 'node:fs/promises'

export default class Self {
    static #ignoreDir = /^node_modules$|^npm_make$|^\./i

    static async search(output, base, prefix) {
        let dir = await fs.opendir(base + prefix)
        for await (let item of dir) {
            if (item.isDirectory()) {
                if (!Self.#ignoreDir.test(item.name)) {
                    await this.search(output, base, prefix + '/' + item.name)
                }
            } else {
                output.push(prefix + '/' + item.name)
            }
        }
    }
}
