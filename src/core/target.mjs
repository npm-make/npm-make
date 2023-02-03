import featureTool from './featureTool.mjs'

export default class {
    compileDefinitionMap = new Map()
    compileOptionList = []
    featureMap = new Map()
    includeDirectoryList = []
    linkDirectoryList = []
    linkLibraryList = []
    linkOptionList = []
    sourceList = []
    sourcePatternList = []

    addCompileDefinitions(scope, ...definitionList) {
        for (let definition of definitionList) {
            featureTool.parseFeature(this.compileDefinitionMap, definition)
        }
    }

    addCompileOptions(...optionList) {
        this.compileOptionList.push(...optionList)
    }

    addFeatures(...featureList) {
        for (let feature of featureList) {
            featureTool.parseFeature(this.featureMap, feature)
        }
    }

    addIncludeDirectories(...directoryList) {
        this.includeDirectoryList.push(...directoryList)
    }

    addLinkDirectories(...directoryList) {
        this.linkDirectoryList.push(...directoryList)
    }

    addLinkLibraries(...libraryList) {
        this.linkLibraryList.push(...libraryList)
    }

    addLinkOptions(...optionList) {
        this.linkOptionList.push(...optionList)
    }

    addSources(...patternList) {
        this.sourcePatternList.push(...patternList)
    }
}
