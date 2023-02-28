import Source from './source'
import Target from './target'

export default class SourceGroup {
    sourceList: Source[]
    target: Target

    constructor(target: Target, pathList: string[], patternList: string[]) {
        this.sourceList = []
        this.target = target
        if (pathList) {
            this.addSource(...pathList)
        }
        if (patternList) {
            this.addSourcePattern(...patternList)
        }
    }

    addCompileOption(...optionList: string[]): SourceGroup {
        for (let source of this.sourceList) {
            source.optionList.push(...optionList)
        }
        return this
    }

    addDefinition(...definitionList: string[]): SourceGroup {
        for (let source of this.sourceList) {
            source.definitionList.push(...definitionList)
        }
        return this
    }

    addIncludePath(...pathList: string[]): SourceGroup {
        for (let source of this.sourceList) {
            source.includePathList.push(...pathList)
        }
        return this
    }

    addSource(...pathList: string[]): SourceGroup {
        for (let path of pathList) {
            let source = new Source(this.target, path)
            this.sourceList.push(source)
            this.target.sourceList.push(source)
        }
        return this
    }

    addSourcePattern(...patternList: string[]): SourceGroup {
        return this
    }
}
