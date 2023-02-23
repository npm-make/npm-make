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

    addCompileOption(compileOption) {
        Option.append(inputList, this.optionList, 'compileOption')
    }

    addDefinition(...inputList) {
        Option.append(inputList, this.optionList, 'definition')
    }

    addDependency(...inputList) {
    }

    addFeature(...inputList) {
    }

    addIncludeDirectory(...inputList) {
        Option.append(inputList, this.optionList, 'includeDirectory')
    }

    addLibrary(...inputList) {
        Option.append(inputList, this.optionList, 'library')
    }

    addLinkDirectory(...inputList) {
        Option.append(inputList, this.optionList, 'linkDirectory')
    }

    addLinkOption(...inputList) {
        Option.append(inputList, this.optionList, 'linkOption')
    }

    addSource(...sourceList) {
        this.sourceList.push(...sourceList)
    }

    addSourceRegex(...regexList) {
        this.sourceRegexList.push(...regexList)
    }
}
