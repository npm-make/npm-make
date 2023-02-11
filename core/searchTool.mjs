import fs from 'node:fs/promises'

export default class {
    static #ignoreDir = /^node_modules|^npm_make|^\./

    static async searchPath(output, base, last) {
        let dir = await fs.opendir(base + last)
        for await (let item of dir) {
            if (item.isDirectory()) {
                if (!this.#ignoreDir.test(item.name)) {
                    await this.searchPath(output, base, last + '/' + item.name)
                }
            } else {
                output.push(last + '/' + item.name)
            }
        }
    }

    /**
     * @param {core.Project} project
     */
    static async searchProject(project) {
        await this.searchPath(project.projectFileList, project.projectPath, '')
        for (let target of project.targetList) {
            if (target.sourcePatternList.length > 0) {
                let patternList = []
                for (let sourcePattern of target.sourcePatternList) {
                    let temp1 = sourcePattern.replaceAll(/[.?+(){}\[\]\\^$|]/g, '\\$&')
                    let temp2 = temp1.replaceAll('*', '[^/]*')
                    let temp3 = temp2.replaceAll('[^/]*[^/]*', '.*')
                    patternList.push('^/(' + temp3 + ')$')
                }
                let regex = new RegExp(patternList.join('|'))
                for (let projectFile of project.projectFileList) {
                    if (regex.test(projectFile)) {
                        target.sourceList.push(projectFile)
                    }
                }
            }
        }
    }
}
