declare class BuildFeature {
    DEBUG: boolean
    DEBUG_WITHOUT_RTC: boolean
    FORCE_STATIC_LIBRARY: boolean
    MACHINE: 'ARM' | 'ARM64' | 'ARM64EC' | 'X64' | 'X86'
    PLATFORM: 'DARWIN' | 'LINUX' | 'WIN32'
    RELEASE_WITH_DEBUG_INFO: boolean
    RELEASE_MIN_SIZE: boolean
    STATIC_RUNTIME: boolean
    TOOLCHAIN: 'CLANG' | 'GCC' | 'MSVC'
}

declare class TargetFeature {
    SHARED: boolean
    STANDARD_C: string
    STANDARD_CXX: string
    STATIC: boolean
    WIN32_MAIN: boolean
}

declare class InterfaceOption {
    definition: string
    includeDirectory: string
    library: string
    linkDirectory: string
    option: string
    pattern: string
    scope: 'INTERFACE' | 'PRIVATE' | 'PUBLIC'
}

declare class InterfaceTarget {
    dependencyList: string[]
    dependencyTargetList: InterfaceTarget[]
    optionList: InterfaceOption[]
    sourceList: string[]
    sourcePatternList: string[]
    targetFeature: TargetFeature
    targetName: string
}

declare class InterfaceProject {
    dependencyProjectList: InterfaceProject[]
    targetList: InterfaceTarget[]
    projectFeature: object
    projectFileList: string[]
    projectName: string
    projectPath: string
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
