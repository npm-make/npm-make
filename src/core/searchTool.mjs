import fs from 'node:fs/promises'
import Project from './project.mjs'
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

    static async #searchPath(projectFileList, projectPath, thisPath) {
        let dir = await fs.opendir(projectPath + thisPath)
        for await (let item of dir) {
            if (item.isDirectory()) {
                if (!this.#ignoreDir.test(item.name)) {
                    await this.#searchPath(projectFileList, projectPath, thisPath + '/' + item.name)
                }
            } else {
                projectFileList.push(thisPath + '/' + item.name)
            }
        }
    }

    static #searchTarget(projectFileList, target) {
        if (target instanceof Target) {
            if (target.sourcePatternList.length > 0) {
                let regex = new RegExp(target.sourcePatternList.join('|'))
                for (let projectFile of projectFileList) {
                    if (regex.test(projectFile)) {
                        target.sourceList.push(projectFile)
                    }
                }
            }
        }
    }
}
