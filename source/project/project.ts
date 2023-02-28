import featureTool from '../featureTool'
import ProjectModule from './projectModule'
import Target from './target'

export default class Project {
    dependencyProjectList: Project[]
    projectFeature: object
    projectFileList: string[]
    projectModule: ProjectModule
    projectName: string
    projectPath: string
    targetList: Target[]

    constructor(projectName: string, featureList: string[]) {
        this.projectFeature = {}
        this.projectFileList = []
        this.projectName = projectName
        this.targetList = []
        if (featureList) {
            for (const feature of featureList) {
                featureTool.parse(this.projectFeature, feature)
            }
        }
    }

    createTarget(targetName: string, ...featureList: string[]): Target {
        const target = new Target(this, targetName, featureList)
        this.targetList.push(target)
        return target
    }

    importProject(projectName: string, ...featureList: string[]): Project {
        this.dependencyProjectList.push(new Project(projectName, featureList))
        return this
    }
}
