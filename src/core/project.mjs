import Target from './target.mjs'

export default class {
    featureList
    packageList = []
    projectFileList = []
    projectName
    projectPath
    targetList = []

    constructor(projectName, ...featureList) {
        this.projectName = projectName
        this.featureList = featureList
    }

    addTarget(targetName, ...featureList) {
        let target = new Target()
        target.targetName = targetName
        target.addFeature(...featureList)
        this.targetList.push(target)
        return target
    }

    usePackage(packageName, ...featureList) {
        this.packageList.push({ packageName, featureList })
    }
}
