import Target from './target.mjs'

export default class {
    basePath
    fileList
    targetList = []

    addTarget(name, ...featureList) {
        let target = new Target()
        target.basePath = this.basePath
        target.targetName = name
        target.waitingList = this.fileList
        target.addFeatures('PRIVATE', ...featureList)
        this.targetList.push(target)
        return target
    }

    usePackage(name, ...flagList) {
    }
}
