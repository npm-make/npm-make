import path from 'node:path'

export default class {
    basePath
    compileDefinitionList = []
    compileOptionList = []
    includeDirectoryList = []
    linkDirectoryList = []
    linkLibraryList = []
    linkOptionList = []
    projectFileList
    sourceList = []

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

    addIncludeDirectories(scope, ...directoryList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let projectPath of directoryList) {
                let directory = path.resolve(this.basePath, projectPath)
                this.includeDirectoryList.push({ scope, directory })
            }
        }
    }

    addLinkDirectories(scope, ...directoryList) {
        if (scope === 'PRIVATE' || scope === 'PUBLIC' || scope === 'INTERFACE') {
            for (let projectPath of directoryList) {
                let directory = path.resolve(this.basePath, projectPath)
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
            let pattern1 = patternList.map(item => '^/(' + item + ')$')
            let pattern2 = pattern1.join('|')
            let regex = new RegExp(pattern2)
            for (let projectPath of this.projectFileList) {
                let isMatch = regex.test(projectPath)
                if (isMatch) {
                    let source = path.join(this.basePath, projectPath)
                    this.sourceList.push({ scope, source })
                }
            }
        }
    }
}
