import Target from './scope.mjs'

export default class {
    featureList
    makeModule
    packageList = []
    projectPath
    searchResult = []
    targetList = []

    constructor(projectPath, featureList, makeModule) {
        this.featureList = featureList
        this.makeModule = makeModule
        this.projectPath = projectPath
    }

    addTarget(name, ...featureList) {
        let target = new Target(name, featureList)
        this.targetList.push(target)
        return target
    }

    usePackage(name, ...featureList) {
        this.packageList.push({ name, featureList })
    }
}
