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
