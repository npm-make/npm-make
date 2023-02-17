import argumentTool from './argumentTool.mjs'

/**
 * @namespace core
 */
export default class Target {
    compileOptionList = []
    definitionList = []
    dependencyList = []
    featureMap = new Map
    includeDirectoryList = []
    libraryList = []
    linkDirectoryList = []
    linkOptionList = []
    sourceList = []
    sourcePatternList = []
    targetName
    objectPath

    addCompileOption(...optionList) {
        this.compileOptionList.push(...optionList)
    }

    addDefinition(...definitionList) {
        this.definitionList.push(...definitionList)
    }

    addDependency(...dependencyList) {
        this.dependencyList.push(...dependencyList)
    }

    addFeature(...featureList) {
        for (let feature of featureList) {
            argumentTool.parse(this.featureMap, feature)
        }
    }

    addIncludeDirectory(...directoryList) {
        this.includeDirectoryList.push(...directoryList)
    }

    addLibrary(...libraryList) {
        this.libraryList.push(...libraryList)
    }

    addLinkDirectory(...directoryList) {
        this.linkDirectoryList.push(...directoryList)
    }

    addLinkOption(...optionList) {
        this.linkOptionList.push(...optionList)
    }

    addSource(...sourceList) {
        this.sourceList.push(...sourceList)
    }

    addSourcePattern(...patternList) {
        this.sourcePatternList.push(...patternList)
    }
}
