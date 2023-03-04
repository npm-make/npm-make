// import process from 'node:process'
// import detectWindows from './windows/detect.mjs'
// import msvc from '../toolchain/msvc/sdk.mts'
//
// export default class {
//     static async detect(targetMachine, expectMsvc, expectSdk) {
//         this.executeASM = ''
//         this.executeCL = ''
//         this.executeLIB = ''
//         this.executeLINK = ''
//         this.executePathList = []
//         this.executeRC = ''
//         this.includePathList = []
//         this.libraryList = []
//         this.libraryPathList = []
//         this.versionMsvc = ''
//         this.versionSdk = ''
//         switch (process.platform) {
//             case 'win32':
//                 await detectWindows.detect(targetMachine, expectMsvc, expectSdk)
//                 break
//         }
//         this.environment = {}
//         this.environment.INCLUDE = this.includePathList.join(';')
//         this.environment.LIB = this.libraryPathList.join(';')
//         this.environment.PATH = this.executePathList.join(';')
//     }
//
//     static async detect(targetMachine, expectMsvc, expectSdk) {
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
//         switch (process.arch) {
//             case 'ia32':
//                 await this.#detectMsvc('C:\\Program Files', 'x86', targetMachine, expectMsvc)
//                 await this.#detectSdk('C:\\Program Files', 'x86', targetMachine, expectSdk)
//                 break
//             case 'x64':
//                 await this.#detectMsvc('C:\\Program Files (x86)', 'x64', targetMachine, expectMsvc)
//                 await this.#detectSdk('C:\\Program Files (x86)', 'x64', targetMachine, expectSdk)
//                 break
//         }
//     }
//
//
// }
// import fs from 'node:fs/promises'
// import path from 'node:path'
// import process from 'node:process'
// import msvc from '../../toolchain/msvc/sdk.mts'
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
