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

    static async #loadSource(project) {
        await search.searchDir(project.searchResult, project.projectPath, '')
        for (let target of project.targetList) {
            await this.#matchSource(project, target, 'PRIVATE')
            await this.#matchSource(project, target, 'PUBLIC')
            await this.#matchSource(project, target, 'INTERFACE')
        }
    }

    static async #matchSource(project, target, scope) {
        let patternList = []
        for (let sourcePattern of target.sourcePatternList) {
            if (sourcePattern.scope === scope) {
                patternList.push('^/(' + sourcePattern.pattern + ')$')
            }
        }
        if (patternList.length > 0) {
            let patternRegex = new RegExp(patternList.join('|'))
            for (let searchPath of project.searchResult) {
                if (patternRegex.test(searchPath)) {
                    target.sourceList.push({ scope, searchPath })
                }
            }
        }
    }
}
