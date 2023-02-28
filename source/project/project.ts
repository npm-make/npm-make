import ProjectModule from './projectModule'
import Target from './target'

export default class Project {
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

    addTarget(targetName: string, ...featureList: string[]) {
        return new Target(this, targetName, featureList)
    }
}
