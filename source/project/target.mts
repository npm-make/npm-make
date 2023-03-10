// import path from 'node:path'
// import Source from './source'
// import SourceGroup from './sourceGroup'
// import TargetFeature from './targetFeature'
//
import path from 'node:path'

export class Source {
    _COMPILE_OPTION_LIST: string[]
    _DEFINITION_LIST: string[]
    _INCLUDE_PATH_LIST: string[]
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

export class SourceGroup extends Source {
    _PROJECT_PATH: string
    _SOURCE_PATTERN_LIST: string[]

    addCompileOption(...optionList: string[]) {
        this._COMPILE_OPTION_LIST.push(...optionList)
    }

    addDefinition(...definitionList: string[]) {
        this._DEFINITION_LIST.push(...definitionList)
    }

    addIncludeDirectory(...directoryList: string[]) {
        for (const directory of directoryList) {
            this._INCLUDE_PATH_LIST.push(path.join(this._PROJECT_PATH, directory))
        }
    }

    addSource(...patternList: string[]) {
        this._SOURCE_PATTERN_LIST.push(...patternList)
    }
}

export class Target extends SourceGroup {
    LIBRARY: boolean
    OUTPUT_NAME: string
    OUTPUT_PATH: string
    STANDARD_C: '11' | '17'
    STANDARD_CPP: '14' | '17' | '20' | 'latest'
    TARGET_NAME: string
    TARGET_VERSION: string
    WIN32_MAIN: boolean
    _LIBRARY_LIST: string[]
    _LIBRARY_PATH_LIST: string[]
    _LINK_OPTION_LIST: string[]
    _PROJECT_FILE_LIST: string[]
    _SOURCE_LIST: Source[]


//     dependencyList: string[]
//     dependencyTargetList: Target[]
//     exportIncludePathList: string[]
//     exportLibraryList: string[]
//     exportLibraryPathList: string[]
//     sourceGroupList: SourceGroup[]
//     targetType: 'EXECUTE' | 'SHARED' | 'STATIC'
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
//
//     addDependency(...dependencyList: string[]): Target {
//         this.dependencyList.push(...dependencyList)
//         return this
//     }
//
//     addExportIncludePath(...inputList: string[]): Target {
//         for (const input of inputList) {
//             this.exportIncludePathList.push(path.join(this.projectPath, input))
//         }
//         return this
//     }
//
//     addExportLibrary(...libraryList: string[]): Target {
//         this.exportLibraryList.push(...libraryList)
//         return this
//     }
//
//     addExportLibraryPath(...inputList: string[]): Target {
//         for (const input of inputList) {
//             this.exportLibraryPathList.push(path.join(this.projectPath, input))
//         }
//         return this
//     }
//
//     addLibrary(...libraryList: string[]): Target {
//         this.libraryList.push(...libraryList)
//         return this
//     }
//
//     addLibraryPath(...inputList: string[]): Target {
//         for (const input of inputList) {
//             this.libraryPathList.push(path.join(this.projectPath, input))
//         }
//         return this
//     }
//
//     addLinkOption(...optionList: string[]): Target {
//         this.linkOptionList.push(...optionList)
//         return this
//     }
//
//     addSource(...inputList: string[]): SourceGroup {
//         const group = new SourceGroup(this.projectPath, this.projectFileList, this.targetName)
//         group.addSource(...inputList)
//         this.sourceGroupList.push(group)
//         return group
//     }
//
//     addSourcePattern(...patternList: string[]): SourceGroup {
//         const group = new SourceGroup(this.projectPath, this.projectFileList, this.targetName)
//         group.addSourcePattern(...patternList)
//         this.sourceGroupList.push(group)
//         return group
//     }
// }
//
// export interface TargetFeature {
}
