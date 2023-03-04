import fs from 'node:fs/promises'
import process from 'node:process'
import { Detect } from '../detect.mjs'

function checkLocalMachine(input: string) {
    switch (input.toUpperCase()) {
        case 'HOSTX64':
            return process.arch === 'x64'
        case 'HOSTX86':
            return process.arch === 'ia32'
    }
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
                    detect.add(null, 'MSVC', verItem.name, 'includePath', subDir.path + '/' + subItem.name)
                    break
                case 'LIB':
                    await detectMsvc14Lib(detect, subDir.path + '/' + subItem.name, verItem.name, '')
                    break
            }
        }
    }
}

async function detectMsvc14Atl(detect: Detect, atlPath: string, version: string) {
    await detect.tryAdd(null, 'MSVC', version, 'includePath', atlPath + '/include')
    try {
        await detectMsvc14Lib(detect, atlPath + '/lib', version, '')
    } catch {
    }
}

async function detectMsvc14Bin(detect: Detect, binPath: string, version: string) {
    const arch1Dir = await fs.opendir(binPath)
    for await (const arch1Item of arch1Dir) {
        if (checkLocalMachine(arch1Item.name)) {
            const arch2Dir = await fs.opendir(binPath)
            for await (const arch2Item of arch2Dir) {
                const machine = arch2Item.name.toUpperCase()
                switch (machine) {
                    case 'ARM':
                    case 'ARM64':
                    case 'X64':
                    case 'X86':
                        detect.add(machine, 'MSVC', version, 'executePath', arch2Dir.path + '/' + arch2Item.name)
                        await detect.tryAdd(machine, 'MSVC', version, 'executeCL', arch2Dir.path + '/' + arch2Item.name + '/cl.exe')
                        await detect.tryAdd(machine, 'MSVC', version, 'executeLIB', arch2Dir.path + '/' + arch2Item.name + '/lib.exe')
                        await detect.tryAdd(machine, 'MSVC', version, 'executeLINK', arch2Dir.path + '/' + arch2Item.name + '/link.exe')
                        break
                }
                switch (machine) {
                    case 'ARM':
                        await detect.tryAdd(machine, 'MSVC', version, 'executeASM', arch2Dir.path + '/' + arch2Item.name + '/armasm.exe')
                        break
                    case 'ARM64':
                        await detect.tryAdd(machine, 'MSVC', version, 'executeASM', arch2Dir.path + '/' + arch2Item.name + '/armasm64.exe')
                        break
                    case 'X64':
                        await detect.tryAdd(machine, 'MSVC', version, 'executeASM', arch2Dir.path + '/' + arch2Item.name + '/ml64.exe')
                        break
                    case 'X86':
                        await detect.tryAdd(machine, 'MSVC', version, 'executeASM', arch2Dir.path + '/' + arch2Item.name + '/ml.exe')
                        break
                }
            }
        }
    }
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
                detect.add(machine + feature, 'MSVC', version, 'libraryPath', archDir.path + '/' + archItem.name)
                break
        }
    }
}
