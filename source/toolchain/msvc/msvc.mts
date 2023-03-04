export default class {
    static environment: object
    static executeASM: string
    static executeCL: string
    static executeLIB: string
    static executeLINK: string
    static executeRC: string
    static libraryList: string[]
    //
    // static async build(builderFeature: BuilderFeature, target: Target) {
    //     if (target.sourceList.length > 0) {
    //         const waitingList = []
    //         for (const source of target.sourceList) {
    //             switch (source.sourceType) {
    //                 case 'ASM':
    //                     waitingList.push(msvcAsm.build(builderFeature, target, source))
    //                     break
    //                 case 'C':
    //                 case 'CXX':
    //                     waitingList.push(msvcCpp.build(builderFeature, target, source))
    //                     break
    //                 case 'RC':
    //                     waitingList.push(msvcRc.build(builderFeature, target, source))
    //                     break
    //             }
    //         }
    //         await Promise.all(waitingList)
    //     }
    //     await msvcLink.build(builderFeature, target)
    // }
    //
    // static async execute(cwd, file, ...args) {
    //     const result = await executeTool.execute({cwd, env: this.environment}, file, ...args)
    //     console.log(result.stdout)
    //     if (result.error) {
    //         throw new Error(result.stdout)
    //     }
    // }
}
//         msvc.libraryList.push('advapi32.lib')
//         msvc.libraryList.push('comdlg32.lib')
//         msvc.libraryList.push('gdi32.lib')
//         msvc.libraryList.push('kernel32.lib')
//         msvc.libraryList.push('ole32.lib')
//         msvc.libraryList.push('oleaut32.lib')
//         msvc.libraryList.push('shell32.lib')
//         msvc.libraryList.push('user32.lib')
//         msvc.libraryList.push('uuid.lib')
//         msvc.libraryList.push('winspool.lib')
