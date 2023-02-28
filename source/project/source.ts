import path from 'node:path'

export default class Source {
    objectPrefix: string
    sourcePath: string
    sourceType: 'ASM' | 'C' | 'CXX' | 'DEF' | 'MANIFEST' | 'RC'

    constructor(targetName: string, sourcePath: string) {
        const sourceParse = path.parse(sourcePath)
        this.objectPrefix = path.join(targetName + 'Obj', sourceParse.dir, sourceParse.name)
        this.sourcePath = sourcePath
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
