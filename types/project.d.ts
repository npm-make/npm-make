import { TargetFeature } from './toolchain'

declare class InterfaceTarget {
    compileOptionList: string[]
    definitionList: string[]
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
