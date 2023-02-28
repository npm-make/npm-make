import ProjectModule from './projectModule'
import Target from './target'

export default class Project {
    projectFeature: object
    projectFileList: string[]
    projectModule: ProjectModule
    projectName: string
    projectPath: string
    targetList: Target[]

    constructor(projectName: string, projectPath: string, projectFeature: object, projectModule: ProjectModule) {
        this.projectFeature = projectFeature
        this.projectFileList = []
        this.projectModule = projectModule
        this.projectName = projectName
        this.projectPath = projectPath
        this.targetList = []
    }

    addTarget(targetName: string, ...featureList: string[]) {
        return new Target(this, targetName, featureList)
    }
}
