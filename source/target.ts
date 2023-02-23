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

// /**
//  * @mixes InternalTarget
//  */
// export default function Self() {
// }
//
// Self.prototype.addSource = function (...sourceList) {
//     this.sourceList.push(...sourceList)
// }
//
// Self.prototype.addSourceRegex = function (...regexList) {
//     this.sourceRegexList.push(...regexList)
// }
//
//     addCompileOption(...optionList) {
//         this.compileOptionList.push(...optionList)
//     }
//
//     addDefinition(...definitionList) {
//         this.definitionList.push(...definitionList)
//     }
//
//     addDependency(...dependencyList) {
//         this.dependencyList.push(...dependencyList)
//     }
//
//     addFeature(...featureList) {
//         for (let feature of featureList) {
//             argumentTool.parse(this.featureMap, feature)
//         }
//     }
//
//     addIncludeDirectory(...directoryList) {
//         this.includeDirectoryList.push(...directoryList)
//     }
//
//     addLibrary(...libraryList) {
//         this.libraryList.push(...libraryList)
//     }
//
//     addLinkDirectory(...directoryList) {
//         this.linkDirectoryList.push(...directoryList)
//     }
//
//     addLinkOption(...optionList) {
//         this.linkOptionList.push(...optionList)
//     }
