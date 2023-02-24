import Option from './option'
import TargetFeature from './targetFeature'

export default class Target {
    dependencyTargetList: Target[]
    optionList: Option[]
    sourceList: string[]
    sourceRegexList: RegExp[]
    targetFeature: TargetFeature
    targetName: string
    targetStatus: 'WAIT' | 'SUCCESS'
}
