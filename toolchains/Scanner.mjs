import { readdir } from 'node:fs/promises'

export class Scanner {
    #rootPath = ''
    #fileList = []

    async includePath(path) {
        this.#rootPath = path
        this.#fileList = await readdir(path, { recursive: true })
    }
}
