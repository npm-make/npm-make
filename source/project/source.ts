import crypto from 'node:crypto'
import path from 'node:path'

export default class Source {
    compileOptionList: string[]
    definitionList: string[]
    objectPrefix: string
    sourcePath: string
    sourceType: 'ASM' | 'C' | 'CXX' | 'DEF' | 'MANIFEST' | 'RC'

    constructor(targetName: string, projectPath: string, sourcePath: string) {
        const pathHash = crypto.createHash('md5')
            .update(sourcePath)
            .digest('base64url')
        this.compileOptionList = []
        this.definitionList = []
        this.objectPrefix = path.join(targetName + 'Obj', pathHash)
        this.sourcePath = path.join(projectPath, sourcePath)
        switch (path.extname(sourcePath.toLowerCase())) {
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
