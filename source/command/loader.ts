import path from 'node:path'
import url from 'node:url'
import Project from '../project'
import searchTool from './searchTool'

export default class {
    static async loadProject(projectPath, featureMap) {
        let makeUrl = url.pathToFileURL(path.join(projectPath, 'make.mjs'))
        let makeModule = await import(makeUrl)
        let project = new Project
        project.featureMap = featureMap
        project.projectPath = projectPath
        let result = makeModule.default.generate(project)
        if (result instanceof Promise) {
            await result
        }
        await searchTool.searchProject(project)
        return project
    }
}
