import fs from 'node:fs/promises'

export default class {
    static #ignoreDir = /^node_modules|^npm_make|^\./

    /**
     * @param {InterfaceProject} project
     */
    static async searchProject(project) {
        await this.searchPath(project.projectFileList, project.projectPath, '')
        for (let target of project.targetList) {
            for (let sourcePattern of target.sourcePatternList) {
                let regex = this.searchRegex(sourcePattern)
                for (let projectFile of project.projectFileList) {
                    if (regex.test(projectFile)) {
                        target.sourceList.push(projectFile)
                    }
                }
            }
        }
    }

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

    static searchRegex(pattern) {
        let temp1 = pattern.replaceAll(/[.?+^$|(){}\[\]\\]/g, '\\$&')
        let temp2 = temp1.replaceAll(/\*+/g, ret => ret === '*' ? '[^/]*' : '.*')
        return new RegExp('^/(' + temp2 + ')$')
    }
}
