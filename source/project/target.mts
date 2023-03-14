import { join } from 'node:path'
import { Source } from './source.mjs'
import { SourceGroup } from './sourceGroup.mjs'

export class Target {
    OUTPUT_NAME: string
    OUTPUT_PATH: string
    STANDARD_C: 'c89' | 'c99' | 'c11' | 'c17'
    STANDARD_CPP: 'c++98' | 'c++03' | 'c++11' | 'c++14' | 'c++17' | 'c++20' | 'c++latest'
    TARGET_NAME: string
    TARGET_TYPE: 'EXECUTE' | 'SHARED' | 'STATIC'
    WIN32_MAIN: boolean
    WIN32_REQUIRED_ADMIN: boolean
    WIN32_WITHOUT_CORE_LIBRARY: boolean
    _COMPILE_OPTION_LIST: string[]
    _DEFINITION_LIST: string[]
    _DEPENDENCY_LIST: string[]
    _DEPENDENCY_TARGET_LIST: Target[]
    _EXPORT_INCLUDE_PATH_LIST: string[]
    _EXPORT_LIBRARY_LIST: string[]
    _EXPORT_LIBRARY_PATH_LIST: string[]
    _INCLUDE_PATH_LIST: string[]
    _LIBRARY_LIST: string[]
    _LIBRARY_PATH_LIST: string[]
    _LINK_OPTION_LIST: string[]
    _PROJECT_PATH: string
    _SOURCE_LIST: Source[]
    _SOURCE_GROUP_LIST: SourceGroup[]
    //debug
    _PROMISE: Promise<void>
    _LINK_NAME: string


    constructor(outputPath: string, projectPath: string, targetName: string, targetType: any) {
        this.OUTPUT_PATH = outputPath
        this.TARGET_NAME = targetName
        this.TARGET_TYPE = targetType
        this._COMPILE_OPTION_LIST = []
        this._DEFINITION_LIST = []
        this._DEPENDENCY_LIST = []
        this._DEPENDENCY_TARGET_LIST = []
        this._EXPORT_INCLUDE_PATH_LIST = []
        this._EXPORT_LIBRARY_LIST = []
        this._EXPORT_LIBRARY_PATH_LIST = []
        this._INCLUDE_PATH_LIST = []
        this._LIBRARY_LIST = []
        this._LIBRARY_PATH_LIST = []
        this._LINK_OPTION_LIST = []
        this._PROJECT_PATH = projectPath
        this._SOURCE_LIST = []
        this._SOURCE_GROUP_LIST = []
    }

    addCompileOption(...optionList: string[]): Target {
        this._COMPILE_OPTION_LIST.push(...optionList)
        return this
    }

    addDefinition(...definitionList: string[]): Target {
        this._DEFINITION_LIST.push(...definitionList)
        return this
    }

    addDependency(...dependencyList: string[]): Target {
        this._DEPENDENCY_LIST.push(...dependencyList)
        return this
    }

    addExportIncludeDirectory(...directoryList: string[]): Target {
        for (const directory of directoryList) {
            this._EXPORT_INCLUDE_PATH_LIST.push(join(this._PROJECT_PATH, directory))
        }
        return this
    }

    addExportLibrary(...libraryList: string[]): Target {
        this._EXPORT_LIBRARY_LIST.push(...libraryList)
        return this
    }

    addExportLibraryDirectory(...directoryList: string[]): Target {
        for (const directory of directoryList) {
            this._EXPORT_LIBRARY_PATH_LIST.push(join(this._PROJECT_PATH, directory))
        }
        return this
    }

    addIncludeDirectory(...directoryList: string[]): Target {
        for (const directory of directoryList) {
            this._INCLUDE_PATH_LIST.push(join(this._PROJECT_PATH, directory))
        }
        return this
    }

    addLibrary(...libraryList: string[]): Target {
        this._LIBRARY_LIST.push(...libraryList)
        return this
    }

    addLibraryDirectory(...directoryList: string[]): Target {
        for (const directory of directoryList) {
            this._LIBRARY_PATH_LIST.push(join(this._PROJECT_PATH, directory))
        }
        return this
    }

    addLinkOption(...optionList: string[]): Target {
        this._LINK_OPTION_LIST.push(...optionList)
        return this
    }

    addSource(...patternList: string[]): SourceGroup {
        const group = new SourceGroup(patternList)
        this._SOURCE_GROUP_LIST.push(group)
        return group
    }
}
