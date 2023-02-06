import fs from 'node:fs/promises'
import Project from './project.mjs'
import Scope from './scope.mjs'
import Target from './target.mjs'

export default class {
    static #ignoreDir = /^node_modules|^npm_make|^\./

    static async searchProject(project) {
        if (project instanceof Project) {
            await this.#searchPath(project.projectFileList, project.projectPath, '')
            for (let target of project.targetList) {
                this.#searchTarget(project.projectFileList, target)
            }
        }
    }

    static async #searchPath(result, base, last) {
        let dir = await fs.opendir(base + last)
        for await (let item of dir) {
            if (item.isDirectory()) {
                if (!this.#ignoreDir.test(item.name)) {
                    await this.#searchPath(result, base, last + '/' + item.name)
                }
            } else {
                result.push(last + '/' + item.name)
            }
        }
    }

    static #searchTarget(result, target) {
        if (target instanceof Target) {
            this.#searchScope(result, target.interface)
            this.#searchScope(result, target.private)
            this.#searchScope(result, target.public)
        }
    }

    static #searchScope(result, scope) {
        if (scope instanceof Scope) {
            if (scope.sourcePatternList.length > 0) {
                let regex = new RegExp(scope.sourcePatternList.join('|'))
                for (let item of result) {
                    if (regex.test(item)) {
                        scope.sourceList.push(item)
                    }
                }
            }
        }
    }
}
