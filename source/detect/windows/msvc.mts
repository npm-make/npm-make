import fs from 'node:fs/promises'
import process from 'node:process'
import { Detect } from '../detect.mjs'

async function detectMsvc11(detect: Detect, installPath: string, version: string) {
    const subDir = await fs.opendir(installPath)
    for await (const subItem of subDir) {
        switch (subItem.name.toUpperCase()) {
            case 'ATLMFC':
                await detect.tryAdd('MSVC', version, null, 'includePath', subDir.path + '/' + subItem.name + '/include')
                await detect.tryAdd('MSVC', version, 'X86', 'libraryPath', subDir.path + '/' + subItem.name + '/lib')
                await detect.tryAdd('MSVC', version, 'ARM', 'libraryPath', subDir.path + '/' + subItem.name + '/lib/arm')
                await detect.tryAdd('MSVC', version, 'X64', 'libraryPath', subDir.path + '/' + subItem.name + '/lib/amd64')
                break
            case 'BIN':
                await detectMsvc11Bin(detect, subDir.path + '/' + subItem.name, version, '')
                break
            case 'INCLUDE':
                detect.add('MSVC', version, null, 'includePath', subDir.path + '/' + subItem.name)
                break
            case 'LIB':
                detect.add('MSVC', version, 'X86', 'libraryPath', subDir.path + '/' + subItem.name)
                await detect.tryAdd('MSVC', version, 'ARM', 'libraryPath', subDir.path + '/' + subItem.name + '/arm')
                await detect.tryAdd('MSVC', version, 'X64', 'libraryPath', subDir.path + '/' + subItem.name + '/x64')
                break
        }
    }
}

async function detectMsvc11Bin(detect: Detect, binPath: string, version: string, archPath: string) {
    // async function detectMsvcBinAdd(detect: Detect, binPath: string, version: string, machineType: string) {
    //     switch (machineType.toUpperCase()) {
    //         case 'AMD64_ARM':
    //         case 'ARM':
    //         case 'X86_ARM':
    //             detect.add('ARM', 'MSVC', version, 'executePath', binPath)
    //             await detect.tryAdd('ARM', 'MSVC', version, 'executeCL', binPath + '/cl.exe')
    //             await detect.tryAdd('ARM', 'MSVC', version, 'executeLIB', binPath + '/lib.exe')
    //             await detect.tryAdd('ARM', 'MSVC', version, 'executeLINK', binPath + '/link.exe')
    //             await detect.tryAdd('ARM', 'MSVC', version, 'executeASM', binPath + '/armasm.exe')
    //             break
    //         case 'ARM64':
    //             detect.add('ARM64', 'MSVC', version, 'executePath', binPath)
    //             await detect.tryAdd('ARM64', 'MSVC', version, 'executeCL', binPath + '/cl.exe')
    //             await detect.tryAdd('ARM64', 'MSVC', version, 'executeLIB', binPath + '/lib.exe')
    //             await detect.tryAdd('ARM64', 'MSVC', version, 'executeLINK', binPath + '/link.exe')
    //             await detect.tryAdd('ARM64', 'MSVC', version, 'executeASM', binPath + '/armasm64.exe')
    //             break
    //         case 'AMD64':
    //         case 'X64':
    //         case 'X86_AMD64':
    //             detect.add('X64', 'MSVC', version, 'executePath', binPath)
    //             await detect.tryAdd('X64', 'MSVC', version, 'executeCL', binPath + '/cl.exe')
    //             await detect.tryAdd('X64', 'MSVC', version, 'executeLIB', binPath + '/lib.exe')
    //             await detect.tryAdd('X64', 'MSVC', version, 'executeLINK', binPath + '/link.exe')
    //             await detect.tryAdd('X64', 'MSVC', version, 'executeASM', binPath + '/ml64.exe')
    //             break
    //         case '':
    //         case 'AMD64_X86':
    //         case 'X86':
    //             detect.add('X86', 'MSVC', version, 'executePath', binPath)
    //             await detect.tryAdd('X86', 'MSVC', version, 'executeCL', binPath + '/cl.exe')
    //             await detect.tryAdd('X86', 'MSVC', version, 'executeLIB', binPath + '/lib.exe')
    //             await detect.tryAdd('X86', 'MSVC', version, 'executeLINK', binPath + '/link.exe')
    //             await detect.tryAdd('X86', 'MSVC', version, 'executeASM', binPath + '/ml.exe')
    //             break
    //     }
    // }
    //
    // function checkLocalMachine(input: string) {
    //     switch (input.toUpperCase()) {
    //         case 'AMD64':
    //         case 'AMD64_ARM':
    //         case 'AMD64_X86':
    //         case 'HOSTX64':
    //             return process.arch === 'x64'
    //         case '':
    //         case 'X86_AMD64':
    //         case 'X86_ARM':
    //         case 'HOSTX86':
    //             return process.arch === 'ia32'
    //     }
    // }
    //
    // const archDir = await fs.opendir(binPath)
    // for await (const archItem of archDir) {
    //     if (!archPath) {
    //         await detectMsvc11Bin(detect, archDir.path + archItem.name, version, archItem.name)
    //     }
    // }
    // if (checkLocalMachine(archPath)) {
    //     switch (archPath.toUpperCase()) {
    //         case 'AMD64_ARM':
    //         case 'X86_ARM':
    //             detect.add('ARM', 'MSVC', version, 'executePath', binPath)
    //             await detect.tryAdd('ARM', 'MSVC', version, 'executeCL', binPath + '/cl.exe')
    //             await detect.tryAdd('ARM', 'MSVC', version, 'executeLIB', binPath + '/lib.exe')
    //             await detect.tryAdd('ARM', 'MSVC', version, 'executeLINK', binPath + '/link.exe')
    //             await detect.tryAdd('ARM', 'MSVC', version, 'executeASM', binPath + '/armasm.exe')
    //             break
    //         case 'AMD64':
    //         case 'X86_AMD64':
    //             detect.add('X64', 'MSVC', version, 'executePath', binPath)
    //             await detect.tryAdd('X64', 'MSVC', version, 'executeCL', binPath + '/cl.exe')
    //             await detect.tryAdd('X64', 'MSVC', version, 'executeLIB', binPath + '/lib.exe')
    //             await detect.tryAdd('X64', 'MSVC', version, 'executeLINK', binPath + '/link.exe')
    //             await detect.tryAdd('X64', 'MSVC', version, 'executeASM', binPath + '/ml64.exe')
    //             break
    //         case '':
    //         case 'AMD64_X86':
    //             detect.add('X86', 'MSVC', version, 'executePath', binPath)
    //             await detect.tryAdd('X86', 'MSVC', version, 'executeCL', binPath + '/cl.exe')
    //             await detect.tryAdd('X86', 'MSVC', version, 'executeLIB', binPath + '/lib.exe')
    //             await detect.tryAdd('X86', 'MSVC', version, 'executeLINK', binPath + '/link.exe')
    //             await detect.tryAdd('X86', 'MSVC', version, 'executeASM', binPath + '/ml.exe')
    //             break
    //     }
    // }
}

async function detectMsvc14(detect: Detect, installPath: string) {
    const verDir = await fs.opendir(installPath)
    for await (const verItem of verDir) {
        const subDir = await fs.opendir(verDir.path + '/' + verItem.name)
        for await (const subItem of subDir) {
            switch (subItem.name.toUpperCase()) {
                case 'ATLMFC':
                    await detectMsvc14Atl(detect, subDir.path + '/' + subItem.name, verItem.name)
                    break
                case 'BIN':
                    await detectMsvc14Bin(detect, subDir.path + '/' + subItem.name, verItem.name)
                    break
                case 'INCLUDE':
                    detect.add('MSVC', verItem.name, null, 'includePath', subDir.path + '/' + subItem.name)
                    break
                case 'LIB':
                    await detectMsvc14Lib(detect, subDir.path + '/' + subItem.name, verItem.name, '')
                    break
            }
        }
    }
}

async function detectMsvc14Atl(detect: Detect, atlPath: string, version: string) {
    await detect.tryAdd('MSVC', version, null, 'includePath', atlPath + '/include')
    try {
        await detectMsvc14Lib(detect, atlPath + '/lib', version, '')
    } catch {
    }
}

async function detectMsvc14Bin(detect: Detect, binPath: string, version: string) {
    // const arch1Dir = await fs.opendir(binPath)
    // for await (const arch1Item of arch1Dir) {
    //     const arch2Dir = await fs.opendir(binPath)
    //     for await (const arch2Item of arch2Dir) {
    //         switch (arch1Item.name) {
    //             case 'HostX64':
    //                 if (process.arch === 'x64') {
    //                     await detectMsvcBinAdd(detect, arch2Dir.path + '/' + arch2Item.name, version, arch2Item.name)
    //                 }
    //                 break
    //             case 'HostX86':
    //                 if (process.arch === 'ia32') {
    //                     await detectMsvcBinAdd(detect, arch2Dir.path + '/' + arch2Item.name, version, arch2Item.name)
    //                 }
    //                 break
    //         }
    //     }
    // }
}

async function detectMsvc14Lib(detect: Detect, libPath: string, version: string, feature: string) {
    const archDir = await fs.opendir(libPath)
    for await (const archItem of archDir) {
        const machine = archItem.name.toUpperCase()
        switch (machine) {
            case 'ONECORE':
                await detectMsvc14Lib(detect, archDir.path + '/' + archItem.name, version, feature + '_OC')
                break
            case 'SPECTRE':
                await detectMsvc14Lib(detect, archDir.path + '/' + archItem.name, version, feature + '_SPECTRE')
                break
            case 'ARM':
            case 'ARM64':
            case 'ARM64EC':
            case 'X64':
            case 'X86':
                detect.add('MSVC', version, machine + feature, 'libraryPath', archDir.path + '/' + archItem.name)
                break
        }
    }
}
