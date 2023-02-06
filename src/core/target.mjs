import Scope from './scope.mjs'

export default class {
    interface = new Scope()
    private = new Scope()
    public = new Scope()
    targetName

    constructor(targetName, ...featureList) {
        this.targetName = targetName
        this.private.addFeature(...featureList)
    }
}
