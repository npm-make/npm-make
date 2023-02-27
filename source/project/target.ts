import featureTool from '../featureTool'
import Source from './source'
import SourceGroup from './sourceGroup'
import TargetFeature from './targetFeature'

export default class Target {
    compileOptionList: string[]
    definitionList: string[]
    dependencyList: string[]
    dependencyTargetList: Target[]
    includePathList: string[]
    libraryList: string[]
    libraryPathList: string[]
    linkOptionList: string[]
    sourceList: Source[]
    targetFeature: TargetFeature
    targetName: string
    targetPrefix: string
    targetType: 'EXECUTE' | 'SHARED' | 'STATIC'

    constructor(targetName: string) {
        this.compileOptionList = []
        this.definitionList = []
        this.dependencyTargetList = []
        this.includePathList = []
        this.libraryList = []
        this.libraryPathList = []
        this.linkOptionList = []
        this.sourceList = []
        this.targetFeature = {}
        this.targetName = targetName
        this.targetPrefix = targetName
        this.targetType = 'EXECUTE'
    }

    addCompileOption(...optionList: string[]) {
        this.compileOptionList.push(...optionList)
    }

    addDefinition(...definitionList: string[]) {
        this.definitionList.push(...definitionList)
    }

    addDependency(...dependencyList: string[]) {
        this.dependencyList.push(...dependencyList)
    }

    addFeature(...featureList: string[]) {
        for (let feature of featureList) {
            featureTool.parse(this.targetFeature, feature)
        }
    }

    addIncludePath(...pathList: string[]) {
        this.includePathList.push(...pathList)
    }

    addLibrary(...libraryList: string[]) {
        this.libraryList.push(...libraryList)
    }

    addLibraryPath(...pathList: string[]) {
        this.libraryPathList.push(...pathList)
    }

    addLinkOption(...optionList: string[]) {
        this.linkOptionList.push(...optionList)
    }

    addSource(...pathList: string[]): SourceGroup {
        let result = SourceGroup.fromPathList(this, pathList)
        this.sourceList.push(...result.sourceList)
        return result
    }
}
