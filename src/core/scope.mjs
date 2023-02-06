import argumentTool from './argumentTool.mjs'

export default class {
    compileOptionList = []
    definitionTable = {}
    dependencyList = []
    featureTable = {}
    includeDirectoryList = []
    libraryList = []
    linkDirectoryList = []
    linkOptionList = []
    sourceList = []
    sourcePatternList = []

    addCompileOption(...optionList) {
        this.compileOptionList.push(...optionList)
    }

    addDefinition(...definitionList) {
        for (let definition of definitionList) {
            argumentTool.parseArgument(this.definitionTable, definition)
        }
    }

    addDependency(...dependencyList) {
        this.dependencyList.push(...dependencyList)
    }

    addFeature(...featureList) {
        for (let feature of featureList) {
            argumentTool.parseArgument(this.featureTable, feature)
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

    addSource(...patternList) {
        for (let pattern of patternList) {
            let temp1 = pattern.replaceAll(/[|.+^$(){}\[\]\\]/g, '\\$&')
            let temp2 = temp1.replaceAll('**', '.*')
            let temp3 = temp2.replaceAll('*?', '[^/\\]*')
            this.sourcePatternList.push('^/(' + temp3 + ')$')
        }
    }
}
