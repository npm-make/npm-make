import Target from './target.mjs'

export default class Project {
    targetList = []
    featureTable

    addTarget(targetName, ...featureList) {
        let target = new Target()
        target.targetName = targetName
        target.addFeature(...featureList)
        this.targetList.push(target)
        return target
    }
}
