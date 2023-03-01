import ProjectModule from './projectModule'
import Target from './target'
import TargetFeature from './targetFeature'

export default class Project {
    dependencyProjectList: Project[]
    projectFeature: object
    projectFileList: string[]
    projectModule: ProjectModule
    projectName: string
    projectPath: string
    targetList: Target[]

    constructor(projectName: string, projectFeature: object) {
        this.projectFeature = projectFeature || {}
        this.projectFileList = []
        this.projectName = projectName
        this.targetList = []
    }

    addProject(projectName: string, projectFeature?: object): Project {
        this.dependencyProjectList.push(new Project(projectName, projectFeature))
        return this
    }

    addTarget(targetName: string, targetFeature?: TargetFeature): Target {
        const target = new Target(this.projectPath, this.projectFileList, targetName, targetFeature)
        this.targetList.push(target)
        return target
    }
}
