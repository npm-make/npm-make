declare class BuildFeature {
    DEBUG: boolean
    DEBUG_WITHOUT_RTC: boolean
    MACHINE: 'ARM' | 'ARM64' | 'ARM64EC' | 'X64' | 'X86'
    RELEASE_WITH_DEBUG_INFO: boolean
    RELEASE_MIN_SIZE: boolean
    STATIC_RUNTIME: boolean
}

declare class TargetFeature {
    SHARED: boolean
    STANDARD_C: string
    STANDARD_CXX: string
    STATIC: boolean
    WIN32_MAIN: boolean
}

declare class ToolchainSource {
    buildFeature: BuildFeature
    definitionList: string[]
    includePathList: string[]
    objectPrefix: string
    optionList: string[]
    outputPath: string
    sourcePath: string
    sourceStatus: 'WAIT' | 'SUCCESS'
    sourceType: 'ASM' | 'C' | 'CXX' | 'DEF' | 'MANIFEST' | 'RC'
    targetFeature: TargetFeature
}

declare class ToolchainTarget {
    buildFeature: BuildFeature
    libraryList: string[]
    libraryPathList: string[]
    optionList: string[]
    outputPath: string
    sourceList: ToolchainSource[]
    targetFeature: TargetFeature
    targetPrefix: string
    targetStatus: 'WAIT' | 'SUCCESS'
    targetType: 'EXECUTE' | 'SHARED' | 'STATIC'
}

declare class InternalOption {
    definition: string
    includeDirectory: string
    library: string
    linkDirectory: string
    option: string
    pattern: string
    scope: 'INTERFACE' | 'PRIVATE' | 'PUBLIC'
}

declare class InternalTarget {
    dependencyTargetList: InternalTarget[]
    optionList: InternalOption[]
    sourceList: string[]
    sourcePatternList: string[]
    targetFeature: TargetFeature
    targetName: string
    targetStatus: 'WAIT' | 'SUCCESS'
}

declare class InternalProject {
    dependencyProjectList: InternalProject[]
    targetList: InternalTarget[]
    projectFeature: any
    projectFileList: string[]
    projectName: string
    projectPath: string
    projectStatus: 'WAIT' | 'SUCCESS'
}
