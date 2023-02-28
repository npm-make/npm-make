import path from 'node:path'
import Target from './target'

export default class Source {
    definitionList: string[]
    includePathList: string[]
    objectPrefix: string
    optionList: string[]
    sourcePath: string
    sourceType: 'ASM' | 'C' | 'CXX' | 'DEF' | 'MANIFEST' | 'RC'

    constructor(target: Target, sourcePath: string) {
        this.definitionList = []
        this.includePathList = []
        this.optionList = []
        this.sourcePath = sourcePath
        //通过路径计算
        const sourceParse = path.parse(sourcePath)
        this.objectPrefix = path.join(target.targetName + 'Obj', sourceParse.dir, sourceParse.name)
        switch (sourceParse.ext.toLowerCase()) {
            case '.asm':
            case '.s':
                this.sourceType = 'ASM'
                break
            case '.c':
                this.sourceType = 'C'
                break
            case '.cc':
            case '.cpp':
            case '.cxx':
            case '.ixx':
                this.sourceType = 'CXX'
                break
            case '.def':
                this.sourceType = 'DEF'
                break
            case '.manifest':
                this.sourceType = 'MANIFEST'
                break
            case '.rc':
                this.sourceType = 'RC'
                break
        }
    }
}
