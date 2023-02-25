import executeTool from '../executeTool'
import msvcAsm from './asm'
import msvcCpp from './cpp'
import msvcLink from './link'
import msvcRc from './rc'
import ToolchainTarget from '../target'

export default class {
    static environment
    static executeASM
    static executeCL
    static executeLIB
    static executeLINK
    static executeRC
    static libraryList

    static async build(target: ToolchainTarget) {
        if (target.targetStatus == 'WAIT') {
            if (target.sourceList.length > 0) {
                let waitingList = []
                for (let source of target.sourceList) {
                    if (source.sourceStatus == 'WAIT') {
                        switch (source.sourceType) {
                            case 'ASM':
                                waitingList.push(msvcAsm.build(source))
                                break
                            case 'C':
                            case 'CXX':
                                waitingList.push(msvcCpp.build(source))
                                break
                            case 'RC':
                                waitingList.push(msvcRc.build(source))
                                break
                        }
                    }
                }
                await Promise.all(waitingList)
            }
            await msvcLink.build(target)
        }
    }

    static async execute(cwd, file, ...args) {
        let result = await executeTool.execute({cwd, env: this.environment}, file, ...args)
        console.log(result.stdout)
        if (result.error) {
            throw new Error(result.stdout)
        }
    }
}
