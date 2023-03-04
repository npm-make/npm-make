import fs from 'node:fs/promises'
import process from 'node:process'
import { Detect } from '../detect.mjs'

export async function detectSdk(detect: Detect) {
    switch (process.arch) {
        case 'ia32':
            await detectSdk7(detect, 'C:/Program Files/Microsoft SDKs/Windows')
            await detectSdk8(detect, 'C:/Program Files/Windows Kits')
            break
        case 'x64':
            await detectSdk7(detect, 'C:/Program Files (x86)/Microsoft SDKs/Windows')
            await detectSdk8(detect, 'C:/Program Files (x86)/Windows Kits')
            break
    }
}

async function detectSdk7(detect: Detect, installPath: string) {
    const verDir = await fs.opendir(installPath)
    for await (const verItem of verDir) {
        await detect.tryAdd(null, 'WinSDK', verItem.name, 'includePath', verDir.path + '/' + verItem.name + '/Include')
        await detect.tryAdd('X86', 'WinSDK', verItem.name, 'executePath', verDir.path + '/' + verItem.name + '/bin')
        await detect.tryAdd('X86', 'WinSDK', verItem.name, 'executeRC', verDir.path + '/' + verItem.name + '/bin/rc.exe')
        await detect.tryAdd('X64', 'WinSDK', verItem.name, 'executePath', verDir.path + '/' + verItem.name + '/bin/x64')
        await detect.tryAdd('X64', 'WinSDK', verItem.name, 'executeRC', verDir.path + '/' + verItem.name + '/bin/x64/rc.exe')
        await detect.tryAdd('X86', 'WinSDK', verItem.name, 'libraryPath', verDir.path + '/' + verItem.name + '/Lib')
        await detect.tryAdd('X64', 'WinSDK', verItem.name, 'libraryPath', verDir.path + '/' + verItem.name + '/Lib/x64')
    }
}

async function detectSdk8(detect: Detect, installPath: string) {
    const verDir = await fs.opendir(installPath)
    for await (const verItem of verDir) {
        const subDir = await fs.opendir(verDir.path + '/' + verItem.name)
        for await (const subItem of subDir) {
            switch (subItem.name.toUpperCase()) {
                case 'BIN':
                    await detectSdk8Bin(detect, subDir.path + '/' + subItem.name, verItem.name, true)
                    break
                case 'INCLUDE':
                    await detectSdk8Inc(detect, subDir.path + '/' + subItem.name, verItem.name)
                    break
                case 'LIB':
                    await detectSdk8Lib(detect, subDir.path + '/' + subItem.name)
                    break
            }
        }
    }
}

async function detectSdk8Bin(detect: Detect, binPath: string, version: string, firstCall: boolean) {
    const archDir = await fs.opendir(binPath)
    for await (const archItem of archDir) {
        switch (archItem.name.toUpperCase()) {
            case 'ARM':
                if (process.arch === 'arm') {

                }
                break
            case 'ARM64':
                return process.arch === 'arm64'
            case 'X64':
                return process.arch === 'x64'
            case 'X86':
                return process.arch === 'ia32'

        }
        if (checkLocalMachine(archItem.name)) {
            detect.add(null, 'WinSDK', version, 'executePath', archDir.path + '/' + archItem.name)
            await detect.tryAdd(null, 'WinSDK', version, 'executeRC', archDir.path + '/' + archItem.name + '/rc.exe')
        } else if (firstCall) {
            await detectSdk8Bin(detect, binPath, archItem.name, false)
        }
    }
}

function checkLocalMachine(input: string) {
    switch (input.toUpperCase()) {
        case 'ARM':
            return process.arch === 'arm'
        case 'ARM64':
            return process.arch === 'arm64'
        case 'X64':
            return process.arch === 'x64'
        case 'X86':
            return process.arch === 'ia32'
    }
}

async function detectSdk8Inc(detect: Detect, incPath: string, version: string) {
    const verDir = await fs.opendir(incPath)
    for await (const verItem of verDir) {
        if (/^\d+\.\d+\.\d+\.\d+$/.test(verItem.name)) {
            const subDir = await fs.opendir(verDir.path + '/' + verItem.name)
            for await (const subItem of subDir) {
                detect.add(null, 'WinSDK', verItem.name, 'includePath', subDir.path + '/' + subItem.name)
            }
        } else {
            detect.add(null, 'WinSDK', version, 'includePath', verDir.path + '/' + verItem.name)
        }
    }
}

async function detectSdk8Lib(detect: Detect, libPath: string) {
    const verDir = await fs.opendir(libPath)
    for await (const verItem of verDir) {
        const subDir = await fs.opendir(verDir.path + '/' + verItem.name)
        for await (const subItem of subDir) {
            const archDir = await fs.opendir(subDir.path + '/' + subItem.name)
            for await (const archItem of archDir) {
                const machine = archItem.name.toUpperCase()
                switch (machine) {
                    case 'ARM':
                    case 'ARM64':
                    case 'X64':
                    case 'X86':
                        detect.add(machine, 'WinSDK', verItem.name, 'libraryPath', archDir.path + '/' + archItem.name)
                        break
                }
            }
        }
    }
}
