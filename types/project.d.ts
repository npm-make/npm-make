export declare class TargetFeature {
    STANDARD_C: string
    STANDARD_CXX: string
    WIN32_MAIN: boolean
}

declare class InterfaceTarget {
    compileOptionList: string[]
    definitionList: string[]
    dependencyList: string[]
    includeDirectoryList: string[]
    libraryList: string[]
    linkDirectoryList: string[]
    linkOptionList: string[]
    sourceList: string[]
    sourcePatternList: string[]
    targetFeature: TargetFeature
    targetName: string
}

declare class InterfaceProject {
    targetList: InterfaceTarget[]
    projectFileList: string[]
    projectPath: string
}
