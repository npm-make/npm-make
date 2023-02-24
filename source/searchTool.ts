import fs from 'node:fs/promises'
import Project from './project'

export default class Self {
    private static ignoreDir = /^node_modules$|^npm_make$|^\./

    static async searchProject(project: Project) {
        await this.searchPath(project.projectFileList, project.projectPath, '')
        for (let target of project.targetList) {
            for (let sourceRegex of target.sourceRegexList) {
                for (let projectFile of project.projectFileList) {
                    if (sourceRegex.test(projectFile)) {
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
                if (!Self.ignoreDir.test(item.name)) {
                    await this.searchPath(output, base, last + '/' + item.name)
                }
            } else {
                output.push(last + '/' + item.name)
            }
        }
    }
}
