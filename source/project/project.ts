import ProjectModule from './projectModule'
import Target from './target'
import TargetFeature from './targetFeature'

export default class Project {
    dependencyList: string[]
    packageList: string[]
    projectFileList: string[]
    projectModule: ProjectModule
    projectName: string
    projectPath: string
    targetList: Target[]

    constructor(projectName: string, packageList: string[]) {
        this.dependencyList = []
        this.packageList = packageList
        this.projectFileList = []
        this.projectName = projectName
        this.targetList = []
    }

    addTarget(targetName: string, targetFeature?: TargetFeature): Target {
        const target = new Target(this.projectPath, this.projectFileList, targetName, targetFeature)
        this.targetList.push(target)
        return target
    }

    hasProject(projectName: string): boolean {
        return this.packageList.includes(projectName)
    }

    useProject(projectName: string): void {
        this.dependencyList.push(projectName)
    }
}
