import Target from './target.mjs'

export default class {
    targetList = []

    addTarget(targetName, ...featureList) {
        let target = new Target()
        target.targetName = targetName
        target.private.addFeature(...featureList)
        this.targetList.push(target)
        return target
    }
}
