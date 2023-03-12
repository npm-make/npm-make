export class SourceGroup {
    _COMPILE_OPTION_LIST: string[]
    _DEFINITION_LIST: string[]
    _SOURCE_PATTERN_LIST: string[]

    constructor(patternList: string[]) {
        this._COMPILE_OPTION_LIST = []
        this._DEFINITION_LIST = []
        this._SOURCE_PATTERN_LIST = patternList
    }

    addCompileOption(...optionList: string[]): SourceGroup {
        this._COMPILE_OPTION_LIST.push(...optionList)
        return this
    }

    addDefinition(...definitionList: string[]): SourceGroup {
        this._DEFINITION_LIST.push(...definitionList)
        return this
    }

    addSource(...patternList: string[]): SourceGroup {
        this._SOURCE_PATTERN_LIST.push(...patternList)
        return this
    }
}
