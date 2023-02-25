import path from 'node:path'
import url from 'node:url'
import BuildFeature from '../project/buildFeature'
import Project from '../project/project'
import ProjectMake from '../project/projectMake'
import searchTool from './searchTool'

export default class {
    static async loadProject(project: Project, buildFeature: BuildFeature) {
        let makeUrl = url.pathToFileURL(path.join(project.projectPath, 'make.mjs'))
        let makeModule = await import(makeUrl)
        project.projectMake = makeModule.default as ProjectMake
        let result = makeModule.default.generate(project, project.projectFeature, buildFeature)
        if (result instanceof Promise) {
            await result
        }
        await searchTool.searchProject(project)
        return project
    }
}
