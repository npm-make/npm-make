import path from 'node:path'
import Project from './project'
import Target from './target'

export default class Source {
    definitionList: string[]
    includePathList: string[]
    objectPrefix: string
    optionList: string[]
    outputPath: string
    sourcePath: string
    sourceStatus: 'WAIT' | 'SUCCESS'
    sourceType: 'ASM' | 'C' | 'CXX' | 'DEF' | 'MANIFEST' | 'RC'

    constructor(project: Project, target: Target, outputPath: string, sourcePath: string) {
        let sourceParse = path.parse(sourcePath)
        this.definitionList = []
        this.includePathList = []
        this.objectPrefix = path.join(target.targetName + 'Obj', sourceParse.dir, sourceParse.name)
        this.optionList = []
        this.outputPath = outputPath
        this.sourcePath = path.join(project.projectPath, sourcePath)
        this.sourceStatus = 'WAIT'
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
