import { Detect } from '../detect.mjs'
import process from 'node:process'
import fs from 'node:fs/promises'
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

function checkLocalMachine(input: string) {
    switch (input.toUpperCase()) {
        case 'HOSTX64':
            return process.arch === 'x64'
        case 'HOSTX86':
            return process.arch === 'ia32'
    }
}

function parseTargetMachine(input: string) {
    switch (input.toUpperCase()) {
        case 'ARM':
        case 'ARM64':
        case 'ARM64EC':
        case 'X64':
        case 'X86':
            return input.toUpperCase()
    }
}

async function detectMsvc14(detect: Detect, installPath: string) {
    const verDir = await fs.opendir(installPath)
    for await (const verItem of verDir) {
        const subDir = await fs.opendir(verDir.path + '/' + verItem.name)
        for await (const subItem of subDir) {
            switch (subItem.name.toUpperCase()) {
                case 'ATLMFC':
                    break
                case 'BIN':
                    await detectMsvc14Bin(detect, subDir.path + '/' + subItem.name, verItem.name)
                    break
                case 'INCLUDE':
                    detect.add(null, 'MSVC', verItem.name, 'includePath', subDir.path + '/' + subItem.name)
                    break
                case 'LIB':
                    await detectMsvc14Lib(detect, subDir.path + '/' + subItem.name, verItem.name)
                    break
            }
        }
    }
}

async function detectMsvc14Bin(detect: Detect, binPath: string, version: string) {
    const arch1Dir = await fs.opendir(binPath)
    for await (const arch1Item of arch1Dir) {
        if (checkLocalMachine(arch1Item.name)) {
            const arch2Dir = await fs.opendir(binPath)
            for await (const arch2Item of arch2Dir) {
                const machine = parseTargetMachine(arch2Item.name)
                if (machine) {
                    detect.add(machine, 'MSVC', version, 'executePath', arch2Dir.path + '/' + arch2Item.name)
                    await detect.tryAdd(machine, 'MSVC', version, 'executeCL', arch2Dir.path + '/' + arch2Item.name + '/cl.exe')
                    await detect.tryAdd(machine, 'MSVC', version, 'executeLIB', arch2Dir.path + '/' + arch2Item.name + '/lib.exe')
                    await detect.tryAdd(machine, 'MSVC', version, 'executeLINK', arch2Dir.path + '/' + arch2Item.name + '/link.exe')
                    await detect.tryAdd('ARM', 'MSVC', version, 'executeASM', arch2Dir.path + '/' + arch2Item.name + '/armasm.exe')
                    await detect.tryAdd('ARM64', 'MSVC', version, 'executeASM', arch2Dir.path + '/' + arch2Item.name + '/armasm64.exe')
                    await detect.tryAdd('X86', 'MSVC', version, 'executeASM', arch2Dir.path + '/' + arch2Item.name + '/ml.exe')
                    await detect.tryAdd('X64', 'MSVC', version, 'executeASM', arch2Dir.path + '/' + arch2Item.name + '/ml64.exe')
                }
            }
        }
    }
}

async function detectMsvc14Lib(detect: Detect, libPath: string, version: string) {
    const archDir = await fs.opendir(libPath)
    for await (const archItem of archDir) {
        const machine = parseTargetMachine(archItem.name)
        if (machine) {
            detect.add(machine, 'MSVC', version, 'libraryPath', archDir.path + '/' + archItem.name)
        }
    }
}
