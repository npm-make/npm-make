import ProjectModule from './projectModule'
import Target from './target'

export default class Project {
    dependencyList: string[]
    dependencyProjectList: Project[]
    projectFeature: object
    projectFileList: string[]
    projectModule: ProjectModule
    projectName: string
    projectPath: string
    targetList: Target[]

    constructor(projectName: string, projectFeature: object) {
        this.projectFeature = projectFeature
        this.projectFileList = []
        this.projectName = projectName
        this.targetList = []
    }

    addProject(projectInput: string): Project {
        this.dependencyList.push(projectInput)
        return this
    }

    addTarget(targetInput: string): Target {
        const target = new Target('', {}, this.projectPath, this.projectFileList)
        this.targetList.push(target)
        return target
    }
}
