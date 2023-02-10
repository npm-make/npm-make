export default class {
    /**
     * @type {core.Project} project
     */
    #project

    constructor(project) {
        this.#project = project
    }

    addTarget(targetName, ...featureList) {
        return this.#project.addTarget(targetName, ...featureList)
    }
}
