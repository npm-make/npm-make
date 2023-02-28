import featureTool from '../featureTool'
import Project from './project'
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
    projectFileList: string[]
    sourceList: Source[]
    sourceGroupList: SourceGroup[]
    targetFeature: TargetFeature
    targetName: string
    targetPrefix: string
    targetType: 'EXECUTE' | 'SHARED' | 'STATIC'

    constructor(project: Project, targetName: string, featureList: string[]) {
        this.compileOptionList = []
        this.definitionList = []
        this.dependencyTargetList = []
        this.includePathList = []
        this.libraryList = []
        this.libraryPathList = []
        this.linkOptionList = []
        this.projectFileList = project.projectFileList
        this.sourceList = []
        this.sourceGroupList = []
        this.targetFeature = {}
        this.targetName = targetName
        this.targetPrefix = targetName
        this.targetType = 'EXECUTE'
        if (featureList) {
            this.addFeature(...featureList)
        }
    }

    addCompileOption(...optionList: string[]): Target {
        this.compileOptionList.push(...optionList)
        return this
    }

    addDefinition(...definitionList: string[]): Target {
        this.definitionList.push(...definitionList)
        return this
    }

    addDependency(...dependencyList: string[]): Target {
        this.dependencyList.push(...dependencyList)
        return this
    }

    addFeature(...featureList: string[]): Target {
        for (const feature of featureList) {
            featureTool.parse(this.targetFeature, feature)
        }
        return this
    }

    addIncludePath(...pathList: string[]): Target {
        this.includePathList.push(...pathList)
        return this
    }

    addLibrary(...libraryList: string[]): Target {
        this.libraryList.push(...libraryList)
        return this
    }

    addLibraryPath(...pathList: string[]): Target {
        this.libraryPathList.push(...pathList)
        return this
    }

    addLinkOption(...optionList: string[]): Target {
        this.linkOptionList.push(...optionList)
        return this
    }

    addSource(...pathList: string[]): SourceGroup {
        const group = new SourceGroup(this, pathList, null)
        this.sourceGroupList.push(group)
        return group
    }

    addSourcePattern(...patternList: string[]): SourceGroup {
        const group = new SourceGroup(this, null, patternList)
        this.sourceGroupList.push(group)
        return group
    }
}
