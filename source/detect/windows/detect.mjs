// import fs from 'node:fs/promises'
// import path from 'node:path'
// import process from 'node:process'
// import msvc from '../../toolchain/msvc/msvc.ts'
//
// export default class Self {
//     // static async #detectMsvc(programRoot, localMachine, targetMachine, expectMsvc) {
//     //     let detectMsvc14 = await this.#detectMsvc14(programRoot, localMachine, targetMachine, expectMsvc)
//     //     if (!detectMsvc14) {
//     //         throw new Error('cannot found MSVC')
//     //     }
//     // }
//     //
//     // static async #detectMsvc14(programRoot, localMachine, targetMachine, expectMsvc) {
//     //     let installPathList = await this.#detectMsvc14Install()
//     //     for (let installPath of installPathList) {
//     //         let versionList = await this.#detectMsvc14Version(installPath)
//     //         for (let version of versionList) {
//     //             if (!expectMsvc || expectMsvc === version) {
//     //                 await this.#detectMsvc14Real(localMachine, targetMachine, installPath, version)
//     //                 return true
//     //             }
//     //         }
//     //     }
//     //     return false
//     // }
//     //
//     // static async #detectMsvc14Install() {
//     //     try {
//     //         let installPathList = []
//     //         let instanceDir = await fs.opendir('C:\\ProgramData\\Microsoft\\VisualStudio\\Packages\\_Instances')
//     //         for await (let instance of instanceDir) {
//     //             let statePath = path.join(instanceDir.path, instance.name, 'state.json')
//     //             let stateJson = JSON.parse(await fs.readFile(statePath, 'utf-8'))
//     //             installPathList.push(stateJson.installationPath)
//     //         }
//     //         return installPathList
//     //     } catch {
//     //     }
//     // }
//     //
//     // static async #detectMsvc14Version(installPath) {
//     //     try {
//     //         let versionList = []
//     //         let versionDir = await fs.opendir(path.join(installPath, 'VC', 'Tools', 'MSVC'))
//     //         for await (let versionItem of versionDir) {
//     //             versionList.push(versionItem.name)
//     //         }
//     //         return versionList
//     //     } catch {
//     //     }
//     // }
//
//     static #detectMsvc11Base(installPath, localMachine, targetMachine, version) {
//         msvc.versionMsvc = version
//         msvc.includePathList.push(path.join(installPath, 'VC', 'include'))
//         switch (targetMachine) {
//             case 'arm':
//                 msvc.libraryPathList.push(path.join(installPath, 'VC', 'lib', 'arm'))
//                 switch (localMachine) {
//                     case 'x86':
//                         this.#detectMsvc11Execute(installPath, 'x86_arm', 'armasm.exe')
//                         break
//                     case 'x64':
//                         this.#detectMsvc11Execute(installPath, 'amd64_arm', 'armasm.exe')
//                         break
//                 }
//                 break
//             case 'x64':
//                 msvc.libraryPathList.push(path.join(installPath, 'VC', 'lib', 'amd64'))
//                 switch (localMachine) {
//                     case 'x86':
//                         this.#detectMsvc11Execute(installPath, 'x86_amd64', 'ml64.exe')
//                         break
//                     case 'x64':
//                         this.#detectMsvc11Execute(installPath, 'amd64', 'ml64.exe')
//                         break
//                 }
//                 break
//             case 'x86':
//                 msvc.libraryPathList.push(path.join(installPath, 'VC', 'lib'))
//                 switch (localMachine) {
//                     case 'x86':
//                         this.#detectMsvc11Execute(installPath, '', 'ml.exe')
//                         break
//                     case 'x64':
//                         this.#detectMsvc11Execute(installPath, 'amd64_x86', 'ml.exe')
//                         break
//                 }
//                 break
//         }
//     }
//
//     static #detectMsvc11Execute(installPath, executePath, executeASM) {
//         msvc.executeASM = path.join(installPath, 'VC', 'bin', executePath, executeASM)
//         msvc.executeCL = path.join(installPath, 'VC', 'bin', executePath, 'cl.exe')
//         msvc.executeLIB = path.join(installPath, 'VC', 'bin', executePath, 'lib.exe')
//         msvc.executeLINK = path.join(installPath, 'VC', 'bin', executePath, 'link.exe')
//         msvc.executePathList.push(path.join(installPath, 'VC', 'bin', executePath))
//     }
//
//     static #detectMsvc14Base(installPath, localMachine, targetMachine, version) {
//         msvc.versionMsvc = version
//         msvc.includePathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'include'))
//         msvc.libraryPathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'lib', targetMachine))
//         switch (localMachine) {
//             case 'x64':
//                 this.#detectMsvc14Execute(installPath, targetMachine, version, 'Hostx64')
//                 break
//             case 'x86':
//                 this.#detectMsvc14Execute(installPath, targetMachine, version, 'Hostx86')
//                 break
//         }
//     }
//
//     static async #detectMsvc14Execute(targetMachine, executePath) {
//         try {
//             await fs.access(executePath)
//             msvc.executeCL = path.join(executePath, 'cl.exe')
//             msvc.executeLIB = path.join(executePath, 'lib.exe')
//             msvc.executeLINK = path.join(executePath, 'link.exe')
//             msvc.executePathList.push(executePath)
//             switch (targetMachine) {
//                 case 'arm':
//                     msvc.executeASM = path.join(executePath, 'armasm.exe')
//                     break
//                 case 'arm64':
//                 case 'arm64ec':
//                     msvc.executeASM = path.join(executePath, 'armasm64.exe')
//                     break
//                 case 'x64':
//                     msvc.executeASM = path.join(executePath, 'ml64.exe')
//                     break
//                 case 'x86':
//                     msvc.executeASM = path.join(executePath, 'ml.exe')
//                     break
//             }
//         } catch {
//         }
//     }
//
//     static async #detectMsvc14Mfc(targetMachine, mfcPath) {
//         try {
//             await fs.access(mfcPath)
//             msvc.includePathList.push(path.join(mfcPath, 'include'))
//             msvc.libraryPathList.push(path.join(mfcPath, 'lib', targetMachine))
//         } catch {
//         }
//     }
//
//     //
//     // static async #detectSdk(programRoot, localMachine, targetMachine, expectSdk) {
//     //     let detectSdk8 = await this.#detectSdk8(programRoot, localMachine, targetMachine, expectSdk)
//     //     if (!detectSdk8) {
//     //         throw new Error('cannot found Windows SDK')
//     //     }
//     // }
//     //
//     // static async #detectSdk8(programRoot, localMachine, targetMachine, expectSdk) {
//     //     let installPathList = await this.#detectSdk8Install(programRoot)
//     //     for (let installPath of installPathList) {
//     //         let versionList = await this.#detectSdk8Version(installPath)
//     //         for (let version of versionList) {
//     //             if (!expectSdk || expectSdk === version) {
//     //                 await this.#detectSdk8Real(installPath, localMachine, targetMachine, version)
//     //                 return true
//     //             }
//     //         }
//     //     }
//     //     return false
//     // }
//     //
//     // static async #detectSdk8Install(programRoot) {
//     //     try {
//     //         let installPathList = []
//     //         let installDir = await fs.opendir(path.join(programRoot, 'Windows Kits'))
//     //         for await (let installItem of installDir) {
//     //             installPathList.push(path.join(installDir.path, installItem.name))
//     //         }
//     //         return installPathList
//     //     } catch {
//     //     }
//     // }
//     //
//     // static async #detectSdk8Version(installPath) {
//     //     try {
//     //         let versionList = []
//     //         let includeDir = await fs.opendir(path.join(installPath, 'Include'))
//     //         for await (let versionItem of includeDir) {
//     //             versionList.push(versionItem.name)
//     //         }
//     //         return versionList
//     //     } catch {
//     //     }
//     // }
//
//     static #detectSdk7Base(installPath, targetMachine, version) {
//         msvc.versionSdk = version
//         msvc.includePathList.push(path.join(installPath, version, 'Include'))
//         switch (targetMachine) {
//             case 'x64':
//                 msvc.executeRC = path.join(installPath, version, 'Bin', 'x64', 'rc.exe')
//                 msvc.executePathList.push(path.join(installPath, version, 'Bin', 'x64'))
//                 msvc.libraryPathList.push(path.join(installPath, version, 'Lib', 'x64'))
//                 break
//             case 'x86':
//                 msvc.executeRC = path.join(installPath, version, 'Bin', 'rc.exe')
//                 msvc.executePathList.push(path.join(installPath, version, 'Bin'))
//                 msvc.libraryPathList.push(path.join(installPath, version, 'Lib'))
//                 break
//         }
//     }
//
//     static #detectSdk8Base(installPath, localMachine, targetMachine, version) {
//         msvc.versionSdk = version
//         msvc.executeRC = path.join(installPath, 'bin', localMachine, 'rc.exe')
//         msvc.executePathList.push(path.join(installPath, 'bin', localMachine))
//         msvc.includePathList.push(path.join(installPath, 'Include', 'shared'))
//         msvc.includePathList.push(path.join(installPath, 'Include', 'um'))
//         msvc.includePathList.push(path.join(installPath, 'Include', 'winrt'))
//         switch (version) {
//             case '8.0':
//                 msvc.libraryPathList.push(path.join(installPath, 'Lib', 'winv6.2', 'um', targetMachine))
//                 break
//             case '8.1':
//                 msvc.libraryPathList.push(path.join(installPath, 'Lib', 'winv6.3', 'um', targetMachine))
//                 break
//         }
//     }
//
//     static #detectSdk10Base(installPath, localMachine, targetMachine, version) {
//         msvc.versionSdk = version
//         msvc.executeRC = path.join(installPath, 'bin', version, localMachine, 'rc.exe')
//         msvc.executePathList.push(path.join(installPath, 'bin', version, localMachine))
//         msvc.includePathList.push(path.join(installPath, 'Include', version, 'cppwinrt'))
//         msvc.includePathList.push(path.join(installPath, 'Include', version, 'shared'))
//         msvc.includePathList.push(path.join(installPath, 'Include', version, 'ucrt'))
//         msvc.includePathList.push(path.join(installPath, 'Include', version, 'um'))
//         msvc.includePathList.push(path.join(installPath, 'Include', version, 'winrt'))
//         msvc.libraryPathList.push(path.join(installPath, 'Lib', version, 'ucrt', targetMachine))
//         msvc.libraryPathList.push(path.join(installPath, 'Lib', version, 'um', targetMachine))
//     }
// }
