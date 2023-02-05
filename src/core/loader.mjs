import url from 'node:url'
import Project from './project.mjs'
import search from './search.mjs'

export default class {
    static async loadProject(projectPath, featureList) {
        let makeUrl = url.pathToFileURL(projectPath + '/make.mjs')
        let makeModule = await import(makeUrl)
        let project = new Project(projectPath, featureList, makeModule)
        let result = makeModule.default.generate(project)
        if (result instanceof Promise) {
            await result
        }
        await this.#loadSource(project)
        return project
    }
}
