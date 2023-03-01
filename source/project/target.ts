import Source from './source'
import SourceGroup from './sourceGroup'
import TargetFeature from './targetFeature'

export default class Target {
    compileOptionList: string[]
    definitionList: string[]
    dependencyList: string[]
    dependencyTargetList: Target[]
    exportIncludePathList: string[]
    exportLibraryList: string[]
    exportLibraryPathList: string[]
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

    constructor(targetName: string, targetFeature: TargetFeature, projectFileList: string[]) {
        this.compileOptionList = []
        this.definitionList = []
        this.dependencyTargetList = []
        this.exportIncludePathList = []
        this.exportLibraryList = []
        this.exportLibraryPathList = []
        this.includePathList = []
        this.libraryList = []
        this.libraryPathList = []
        this.linkOptionList = []
        this.projectFileList = projectFileList
        this.sourceList = []
        this.sourceGroupList = []
        this.targetFeature = targetFeature
        this.targetName = targetName
        this.targetPrefix = targetName
        this.targetType = 'EXECUTE'
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

    addExportIncludePath(...pathList: string[]): Target {
        this.exportIncludePathList.push(...pathList)
        return this
    }

    addExportLibrary(...libraryList: string[]): Target {
        this.exportLibraryList.push(...libraryList)
        return this
    }

    addExportLibraryPath(...pathList: string[]): Target {
        this.exportLibraryPathList.push(...pathList)
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

    addSource(...inputList: string[]): SourceGroup {
        const group = new SourceGroup(this.targetName, this.projectFileList)
        group.addSource(...inputList)
        this.sourceGroupList.push(group)
        return group
    }

    addSourcePattern(...patternList: string[]): SourceGroup {
        const group = new SourceGroup(this.targetName, this.projectFileList)
        group.addSourcePattern(...patternList)
        this.sourceGroupList.push(group)
        return group
    }
}
