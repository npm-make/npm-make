export default class {
    /**
     * @type {core.Target} target
     */
    #target

    addCompileOption(...optionList) {
        this.#target.compileOptionList.push(...optionList)
    }

    addDefinition(...definitionList) {
    }

    addDependency(...dependencyList) {
        this.#target.dependencyList.push(...dependencyList)
    }

    addFeature(...featureList) {
    }

    addIncludeDirectory(...directoryList) {
        this.#target.includeDirectoryList.push(...directoryList)
    }

    addLibrary(...libraryList) {
        this.#target.libraryList.push(...libraryList)
    }

    addLinkDirectory(...directoryList) {
        this.#target.linkDirectoryList.push(...directoryList)
    }

    addLinkOption(...optionList) {
        this.#target.linkOptionList.push(...optionList)
    }

    addSource(...sourceList) {
        this.#target.sourceList.push(...sourceList)
    }

    addSourcePattern(...patternList) {
        this.#target.sourcePatternList.push(...patternList)
    }

    checkIncludeFile(...fileList) {
    }

    checkLinkLibrary(...libraryList) {
    }
}
