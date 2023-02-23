import BuildFeature from '../buildFeature'
import TargetFeature from '../targetFeature'
import ToolchainSource from './source'

export default class ToolchainTarget {
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
