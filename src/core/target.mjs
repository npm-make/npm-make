import argumentTool from './argumentTool.mjs'

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
            argumentTool.parseArgument(this.compileDefinitionMap, definition)
        }
    }

    addCompileOptions(...optionList) {
        this.compileOptionList.push(...optionList)
    }

    addFeatures(...featureList) {
        for (let feature of featureList) {
            argumentTool.parseArgument(this.featureMap, feature)
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

    __afterSearch(projectFileList) {
        let pattern1 = this.sourcePatternList.map(item => '^/(' + item + ')$')
        let pattern2 = pattern1.join('|')
        let regex = new RegExp(pattern2)
        for (let projectFile of projectFileList) {
            if (regex.test(projectFile)) {
                this.sourceList.push(projectFile)
            }
        }
    }
}
