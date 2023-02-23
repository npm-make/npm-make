import BuildFeature from '../buildFeature'
import TargetFeature from '../targetFeature'

export default class ToolchainSource {
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
