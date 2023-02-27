import path from 'node:path'
import Source from './source'
import TargetFeature from './targetFeature'

export default class Target {
    compileOptionList: string[]
    definitionList: string[]
    dependencyTargetList: Target[]
    includePathList: string[]
    libraryList: string[]
    libraryPathList: string[]
    linkOptionList: string[]
    outputPath: string
    sourceList: Source[]
    targetFeature: TargetFeature
    targetName: string
    targetPrefix: string
    targetType: 'EXECUTE' | 'SHARED' | 'STATIC'

    constructor(outputPath: string, targetName: string) {
        this.compileOptionList = []
        this.definitionList = []
        this.dependencyTargetList = []
        this.includePathList = []
        this.libraryList = []
        this.libraryPathList = []
        this.linkOptionList = []
        this.outputPath = outputPath
        this.sourceList = []
        this.targetFeature = {}
        this.targetName = targetName
        this.targetPrefix = path.join(outputPath, targetName)
        this.targetType = 'EXECUTE'
    }
}
