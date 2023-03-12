export class Source {
    _COMPILE_OPTION_LIST: string[]
    _DEFINITION_LIST: string[]
    _OBJECT_PREFIX: string
    _SOURCE_PATH: string
    _SOURCE_TYPE: 'ASM' | 'C' | 'CPP' | 'DEF' | 'MANIFEST' | 'RC'

    constructor() {
        this._COMPILE_OPTION_LIST = []
        this._DEFINITION_LIST = []
    }
}
