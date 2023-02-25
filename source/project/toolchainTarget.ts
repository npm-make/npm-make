import BuildFeature from './buildFeature'
import TargetFeature from './targetFeature'
import Source from './source'

export default class ToolchainTarget {
    dependencyTargetList: ToolchainTarget[]
    buildFeature: BuildFeature
    libraryList: string[]
    libraryPathList: string[]
    optionList: string[]
    outputPath: string
    sourceList: Source[]
    targetFeature: TargetFeature
    targetPrefix: string
    targetStatus: 'WAIT' | 'SUCCESS'
    targetType: 'EXECUTE' | 'SHARED' | 'STATIC'
}
