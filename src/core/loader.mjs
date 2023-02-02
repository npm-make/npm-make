import path from 'node:path'

export default class {
    static async load(base) {
        let makePath = path.join(base, 'make.js')
        let makeModule = await import('file:' + makePath)

    }
}
