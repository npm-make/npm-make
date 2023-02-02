import search from './search.mjs'

export default class {
    static async load(base) {
    }

    static async #loadProject(parent, base) {
        let project = Object.create(parent)
        project.module = await import('file:' + base + '/make.mjs')
        let result = project.module.default.generate(project)
        if (result instanceof Promise) {
            await result
        }
        return project
    }
}
