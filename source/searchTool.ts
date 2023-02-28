import fs from 'node:fs/promises'

export default class Self {
    private static ignoreDir = /^node_modules$|^npm_make$|^\./i

    static async search(output, base, prefix) {
        const dir = await fs.opendir(base + prefix)
        for await (const item of dir) {
            if (item.isDirectory()) {
                if (!Self.ignoreDir.test(item.name)) {
                    await this.search(output, base, prefix + '/' + item.name)
                }
            } else {
                output.push(prefix + '/' + item.name)
            }
        }
    }
}
