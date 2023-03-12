import { join } from 'node:path'

export class Source {
    _COMPILE_OPTION_LIST: string[]
    _DEFINITION_LIST: string[]
    _OBJECT_PREFIX: string
    _SOURCE_PATH: string
    _SOURCE_TYPE: 'ASM' | 'C' | 'CPP' | 'DEF' | 'MANIFEST' | 'RC'
//
//     constructor(projectPath: string, targetName: string, sourcePath: string) {
//         const pathParse = path.parse(sourcePath)
//         this.compileOptionList = []
//         this.definitionList = []
//         this.objectPrefix = path.join(targetName + 'Obj', pathParse.dir, pathParse.name)
//         this.sourcePath = path.join(projectPath, sourcePath)
//         switch (pathParse.ext.toLowerCase()) {
//             case '.asm':
//             case '.s':
//                 this.sourceType = 'ASM'
//                 break
//             case '.c':
//                 this.sourceType = 'C'
//                 break
//             case '.cc':
//             case '.cpp':
//             case '.cxx':
//             case '.ixx':
//                 this.sourceType = 'CXX'
//                 break
//             case '.def':
//                 this.sourceType = 'DEF'
//                 break
//             case '.manifest':
//                 this.sourceType = 'MANIFEST'
//                 break
//             case '.rc':
//                 this.sourceType = 'RC'
//                 break
//         }
//     }
}

export class SourceGroup {
    _COMPILE_OPTION_LIST: string[]
    _DEFINITION_LIST: string[]
    _SOURCE_PATTERN_LIST: string[]

    constructor(patternList: string[]) {
        this._COMPILE_OPTION_LIST = []
        this._DEFINITION_LIST = []
        this._SOURCE_PATTERN_LIST = patternList
    }

    addCompileOption(...optionList: string[]) {
        this._COMPILE_OPTION_LIST.push(...optionList)
    }

    addDefinition(...definitionList: string[]) {
        this._DEFINITION_LIST.push(...definitionList)
    }

    addSource(...patternList: string[]) {
        this._SOURCE_PATTERN_LIST.push(...patternList)
    }
}

export class Target extends SourceGroup {
    OUTPUT_NAME: string
    OUTPUT_PATH: string
    SHARED: boolean
    STANDARD_C: '89' | '99' | '11' | '17'
    STANDARD_CPP: '98' | '03' | '11' | '14' | '17' | '20' | 'latest'
    STATIC: boolean
    TARGET_NAME: string
    TARGET_VERSION: string
    WIN32_MAIN: boolean
    WIN32_REQUIRED_ADMIN: boolean
    WIN32_WITHOUT_CORE_LIBRARY: boolean
    _DEPENDENCY_LIST: string[]
    _DEPENDENCY_TARGET_LIST: Target[]
    _EXPORT_INCLUDE_PATH_LIST: string[]
    _EXPORT_LIBRARY_LIST: string[]
    _EXPORT_LIBRARY_PATH_LIST: string[]
    _INCLUDE_PATH_LIST: string[]
    _LIBRARY_LIST: string[]
    _LIBRARY_PATH_LIST: string[]
    _LINK_OPTION_LIST: string[]
    _PROJECT_FILE_LIST: string[]
    _PROJECT_PATH: string
    _SOURCE_LIST: Source[]
    _SOURCE_GROUP_LIST: SourceGroup[]
//
//     constructor(projectPath: string, projectFileList: string[], targetName: string, targetFeature?: TargetFeature) {
//         this.compileOptionList = []
//         this.definitionList = []
//         this.dependencyTargetList = []
//         this.exportIncludePathList = []
//         this.exportLibraryList = []
//         this.exportLibraryPathList = []
//         this.includePathList = []
//         this.libraryList = []
//         this.libraryPathList = []
//         this.linkOptionList = []
//         this.projectFileList = projectFileList
//         this.projectPath = projectPath
//         this.sourceList = []
//         this.sourceGroupList = []
//         this.targetFeature = targetFeature || {}
//         this.targetName = targetName
//         this.targetPrefix = targetName
//         this.targetType = 'EXECUTE'
//     }

    addDependency(...dependencyList: string[]) {
        this._DEPENDENCY_LIST.push(...dependencyList)
    }

    addExportIncludeDirectory(...directoryList: string[]) {
        for (const directory of directoryList) {
            this._EXPORT_INCLUDE_PATH_LIST.push(join(this._PROJECT_PATH, directory))
        }
    }

    addExportLibrary(...libraryList: string[]) {
        this._EXPORT_LIBRARY_LIST.push(...libraryList)
    }

    addExportLibraryDirectory(...directoryList: string[]) {
        for (const directory of directoryList) {
            this._EXPORT_LIBRARY_PATH_LIST.push(join(this._PROJECT_PATH, directory))
        }
    }

    addIncludeDirectory(...directoryList: string[]) {
        for (const directory of directoryList) {
            this._INCLUDE_PATH_LIST.push(join(this._PROJECT_PATH, directory))
        }
    }

    addLibrary(...libraryList: string[]) {
        this._LIBRARY_LIST.push(...libraryList)
    }

    addLibraryDirectory(...directoryList: string[]) {
        for (const directory of directoryList) {
            this._LIBRARY_PATH_LIST.push(join(this._PROJECT_PATH, directory))
        }
    }

    addLinkOption(...optionList: string[]) {
        this._LINK_OPTION_LIST.push(...optionList)
    }

    addSource(...patternList: string[]): SourceGroup {
        const group = new SourceGroup(patternList)
        this._SOURCE_GROUP_LIST.push(group)
        return group
    }
}
