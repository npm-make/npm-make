import executeTool from '../../executeTool.mjs'
import msvcAsm from './asm.mjs'
import msvcCpp from './cpp.mjs'
import msvcLink from './link.mjs'
import windowsRc from '../windows/rc.mjs'

export default class {
    static environment
    static executeASM
    static executeCL
    static executeLIB
    static executeLINK
    static libraryList

    /**
     * @param {ToolchainTarget} target
     */
    static async build(target) {
        if (!target.buildSuccess) {
            let promiseList = []
            for (let source of target.sourceList) {
                if (!source.buildSuccess) {
                    switch (source.sourceType) {
                        case 'ASM':
                            promiseList.push(msvcAsm.build(source))
                            break
                        case 'C':
                        case 'CXX':
                            promiseList.push(msvcCpp.build(source))
                            break
                        case 'RC':
                            promiseList.push(windowsRc.build(source))
                            break
                    }
                }
            }
            await Promise.all(promiseList)
            await msvcLink.build(target)
        }
    }

    static async execute(cwd, file, ...args) {
        let result = await executeTool.execute({ cwd, env: this.environment }, file, ...args)
        console.log(result.stdout)
        if (result.error) {
            throw new Error(result.stdout)
        }
    }
}
