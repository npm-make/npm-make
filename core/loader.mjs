import url from 'node:url'
import Project from './project.mjs'
import searchTool from './searchTool.mjs'

export default class {
    static async loadProject(projectPath, featureTable) {
        let makeUrl = url.pathToFileURL(projectPath + '/make.mjs')
        let makeModule = await import(makeUrl)
        let project = new Project()
        project.featureTable = featureTable
        let result = makeModule.default.generate(project)
        if (result instanceof Promise) {
            await result
        }
        await searchTool.searchProject(project)
        return project
    }
}
