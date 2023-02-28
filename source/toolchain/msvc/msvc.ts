import BuilderFeature from '../../project/builderFeature'
import executeTool from '../../executeTool'
import Target from '../../project/target'
import msvcAsm from './asm'
import msvcCpp from './cpp'
import msvcLink from './link'
import msvcRc from './rc'

export default class {
    static environment
    static executeASM
    static executeCL
    static executeLIB
    static executeLINK
    static executeRC
    static libraryList

    static async build(builderFeature: BuilderFeature, target: Target) {
        if (target.sourceList.length > 0) {
            let waitingList = []
            for (let source of target.sourceList) {
                switch (source.sourceType) {
                    case 'ASM':
                        waitingList.push(msvcAsm.build(builderFeature, target, source))
                        break
                    case 'C':
                    case 'CXX':
                        waitingList.push(msvcCpp.build(builderFeature, target, source))
                        break
                    case 'RC':
                        waitingList.push(msvcRc.build(builderFeature, target, source))
                        break
                }
            }
            await Promise.all(waitingList)
        }
        await msvcLink.build(builderFeature, target)
    }

    static async execute(cwd, file, ...args) {
        let result = await executeTool.execute({cwd, env: this.environment}, file, ...args)
        console.log(result.stdout)
        if (result.error) {
            throw new Error(result.stdout)
        }
    }
}
