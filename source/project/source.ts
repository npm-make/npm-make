import path from 'node:path'

export default class Source {
    compileOptionList: string[]
    definitionList: string[]
    objectPrefix: string
    sourcePath: string
    sourceType: 'ASM' | 'C' | 'CXX' | 'DEF' | 'MANIFEST' | 'RC'

    constructor(targetName: string, projectPath: string, sourcePath: string) {
        const pathParse = path.parse(sourcePath)
        this.compileOptionList = []
        this.definitionList = []
        this.objectPrefix = path.join(targetName + 'Obj', pathParse.dir, pathParse.name)
        this.sourcePath = path.join(projectPath, sourcePath)
        switch (pathParse.ext.toLowerCase()) {
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
