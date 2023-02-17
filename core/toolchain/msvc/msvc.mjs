import process from 'node:process'
import detectWindows from './detect/windows.mjs'
import executeTool from '../../executeTool.mjs'
import msvcAsm from './asm.mjs'
import msvcCpp from './cpp.mjs'
import msvcLink from './link.mjs'
import msvcRc from './rc.mjs'

export default class Self {
    static environment
    static executeASM
    static executeCL
    static executeLIB
    static executeLINK
    static executePathList
    static executeRC
    static includePathList
    static libraryList
    static libraryPathList
    static versionMsvc
    static versionSdk

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
                            promiseList.push(msvcRc.build(source))
                            break
                    }
                }
            }
            if (promiseList.length > 0) {
                await Promise.all(promiseList)
            }
            await msvcLink.build(target)
        }
    }

    static async detect(targetMachine, expectMsvc, expectSdk) {
        this.executeASM = ''
        this.executeCL = ''
        this.executeLIB = ''
        this.executeLINK = ''
        this.executePathList = []
        this.executeRC = ''
        this.includePathList = []
        this.libraryList = []
        this.libraryPathList = []
        this.versionMsvc = ''
        this.versionSdk = ''
        switch (process.platform) {
            case 'win32':
                await detectWindows.detect(targetMachine, expectMsvc, expectSdk)
                break
        }
        this.environment = {}
        this.environment.INCLUDE = this.includePathList.join(';')
        this.environment.LIB = this.libraryPathList.join(';')
        this.environment.PATH = this.executePathList.join(';')
    }

    static async execute(cwd, file, ...args) {
        let result = await executeTool.execute({ cwd, env: this.environment }, file, ...args)
        console.log(result.stdout)
        if (result.error) {
            throw new Error(result.stdout)
        }
    }
}
