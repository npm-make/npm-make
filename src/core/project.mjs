import Target from './target.mjs'

export default class {
    basePath
    fileList
    packageList = []
    targetList = []

    constructor(basePath, fileList) {
        this.basePath = basePath
        this.fileList = fileList
    }

    addTarget(name, ...featureList) {
        let target = new Target(name, this.basePath, this.fileList, featureList)
        this.targetList.push(target)
        return target
    }

    usePackage(name, ...flagList) {
        this.packageList.push({ name, flagList })
    }
}
