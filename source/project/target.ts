import path from 'node:path'
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
    projectPath: string
    sourceList: Source[]
    sourceGroupList: SourceGroup[]
    targetFeature: TargetFeature
    targetName: string
    targetPrefix: string
    targetType: 'EXECUTE' | 'SHARED' | 'STATIC'

    constructor(targetName: string, targetFeature: TargetFeature, projectPath: string, projectFileList: string[]) {
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
        this.projectPath = projectPath
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

    addExportIncludePath(...inputList: string[]): Target {
        for (const input of inputList) {
            this.exportIncludePathList.push(path.join(this.projectPath, input))
        }
        return this
    }

    addExportLibrary(...libraryList: string[]): Target {
        this.exportLibraryList.push(...libraryList)
        return this
    }

    addExportLibraryPath(...inputList: string[]): Target {
        for (const input of inputList) {
            this.exportLibraryPathList.push(path.join(this.projectPath, input))
        }
        return this
    }

    addIncludePath(...inputList: string[]): Target {
        for (const input of inputList) {
            this.includePathList.push(path.join(this.projectPath, input))
        }
        return this
    }

    addLibrary(...libraryList: string[]): Target {
        this.libraryList.push(...libraryList)
        return this
    }

    addLibraryPath(...inputList: string[]): Target {
        for (const input of inputList) {
            this.libraryPathList.push(path.join(this.projectPath, input))
        }
        return this
    }

    addLinkOption(...optionList: string[]): Target {
        this.linkOptionList.push(...optionList)
        return this
    }

    addSource(...inputList: string[]): SourceGroup {
        const group = new SourceGroup(this.targetName, this.projectPath, this.projectFileList)
        group.addSource(...inputList)
        this.sourceGroupList.push(group)
        return group
    }

    addSourcePattern(...patternList: string[]): SourceGroup {
        const group = new SourceGroup(this.targetName, this.projectPath, this.projectFileList)
        group.addSourcePattern(...patternList)
        this.sourceGroupList.push(group)
        return group
    }
}
