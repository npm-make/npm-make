import Target from './target.mjs'

/**
 * @namespace core
 */
export default class Project {
    featureMap = new Map
    /**
     * @type {core.Target[]}
     */
    targetList = []
    projectFileList = []
    projectPath

    addTarget(targetName, ...featureList) {
        let target = new Target
        target.targetName = targetName
        target.addFeature(...featureList)
        this.targetList.push(target)
        return target
    }
}
