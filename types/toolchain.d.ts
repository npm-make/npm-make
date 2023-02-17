import { TargetFeature } from './project'

declare class BuildFeature {
    DEBUG: boolean
    DEBUG_WITHOUT_RTC: boolean
    MACHINE: string
    RELEASE_WITH_DEBUG_INFO: boolean
    RELEASE_MIN_SIZE: boolean
    STATIC_RUNTIME: boolean
}

declare class ToolchainSource {
    buildFeature: BuildFeature
    buildSuccess: boolean
    definitionList: string[]
    includePathList: string[]
    objectPrefix: string
    optionList: string[]
    outputPath: string
    sourcePath: string
    sourceType: 'ASM' | 'C' | 'CXX' | 'DEF' | 'MANIFEST' | 'RC'
    targetFeature: TargetFeature
}

declare class ToolchainTarget {
    buildFeature: BuildFeature
    buildSuccess: boolean
    libraryList: string[]
    libraryPathList: string[]
    optionList: string[]
    outputPath: string
    sourceList: ToolchainSource[]
    targetFeature: TargetFeature
    targetPrefix: string
    targetType: 'EXECUTE' | 'SHARED' | 'STATIC'
}
