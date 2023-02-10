import Target from './target.mjs'

/**
 * @namespace core
 */
export default class Project {
    targetList = []
    featureTable


    addTarget(targetName, ...featureList) {
        let target = new Target()
        target.targetName = targetName
        target.addFeature(...featureList)
        this.#project.targetList.push(target)
        return target
    }
}
