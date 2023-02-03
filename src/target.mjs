export default class {
    compileDefinitionList = []
    compileOptionList = []
    featureList = []
    includeDirectoryList = []
    linkDirectoryList = []
    linkLibraryList = []
    linkOptionList = []
    sourceList = []
    sourcePatternList = []
    targetName

    constructor(targetName, featureList) {
        this.targetName = targetName
        this.addFeatures('PRIVATE', ...featureList)
    }

    addCompileDefinitions(scope, ...definitionList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let definition of definitionList) {
                this.compileDefinitionList.push({ scope, definition })
            }
        }
    }

    addCompileOptions(scope, ...optionList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let option of optionList) {
                this.compileOptionList.push({ scope, option })
            }
        }
    }

    addFeatures(scope, ...featureList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let feature of featureList) {
                this.featureList.push({ scope, feature })
            }
        }
    }

    addIncludeDirectories(scope, ...directoryList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let directory of directoryList) {
                this.includeDirectoryList.push({ scope, directory })
            }
        }
    }

    addLinkDirectories(scope, ...directoryList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let directory of directoryList) {
                this.linkDirectoryList.push({ scope, directory })
            }
        }
    }

    addLinkLibraries(scope, ...libraryList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let library of libraryList) {
                this.linkLibraryList.push({ scope, library })
            }
        }
    }

    addLinkOptions(scope, ...optionList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let option of optionList) {
                this.linkOptionList.push({ scope, option })
            }
        }
    }

    addSources(scope, ...patternList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let pattern of patternList) {
                this.sourcePatternList.push({ scope, pattern })
            }
        }
    }
}
