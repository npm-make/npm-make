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

function checkLocalMachine(input: string) {
    switch (input) {
        case 'arm':
            return process.arch === 'arm'
        case 'arm64':
            return process.arch === 'arm64'
        case 'x64':
            return process.arch === 'x64'
        case 'x86':
            return process.arch === 'ia32'
    }
}

async function detectSdk7(detect: Detect, installPath: string) {
    const verDir = await fs.opendir(installPath)
    for await (const verItem of verDir) {
        await detect.tryAdd('WinSDK', verItem.name, null, 'includePath', verDir.path + '/' + verItem.name + '/Include')
        await detect.tryAdd('WinSDK', verItem.name, 'X86', 'executePath', verDir.path + '/' + verItem.name + '/bin')
        await detect.tryAdd('WinSDK', verItem.name, 'X86', 'executeRC', verDir.path + '/' + verItem.name + '/bin/rc.exe')
        await detect.tryAdd('WinSDK', verItem.name, 'X64', 'executePath', verDir.path + '/' + verItem.name + '/bin/x64')
        await detect.tryAdd('WinSDK', verItem.name, 'X64', 'executeRC', verDir.path + '/' + verItem.name + '/bin/x64/rc.exe')
        await detect.tryAdd('WinSDK', verItem.name, 'X86', 'libraryPath', verDir.path + '/' + verItem.name + '/Lib')
        await detect.tryAdd('WinSDK', verItem.name, 'X64', 'libraryPath', verDir.path + '/' + verItem.name + '/Lib/x64')
    }
}

async function detectSdk8(detect: Detect, installPath: string) {
    const verDir = await fs.opendir(installPath)
    for await (const verItem of verDir) {
        try {
            await detectSdk8Bin(detect, verDir.path + '/' + verItem.name + '/bin', verItem.name, true)
            await detectSdk8Inc(detect, verDir.path + '/' + verItem.name + '/Include', verItem.name)
            await detectSdk8Lib(detect, verDir.path + '/' + verItem.name + '/Lib')
        } catch {
        }
    }
}

async function detectSdk8Bin(detect: Detect, binPath: string, version: string, firstCall: boolean) {
    const archDir = await fs.opendir(binPath)
    for await (const archItem of archDir) {
        if (checkLocalMachine(archItem.name)) {
            detect.add('WinSDK', version, null, 'executePath', archDir.path + '/' + archItem.name)
            await detect.tryAdd('WinSDK', version, null, 'executeRC', archDir.path + '/' + archItem.name + '/rc.exe')
        } else if (firstCall) {
            await detectSdk8Bin(detect, binPath, archItem.name, false)
        }
    }
}

async function detectSdk8Inc(detect: Detect, incPath: string, version: string) {
    const verDir = await fs.opendir(incPath)
    for await (const verItem of verDir) {
        if (version === '10') {
            const subDir = await fs.opendir(verDir.path + '/' + verItem.name)
            for await (const subItem of subDir) {
                detect.add('WinSDK', verItem.name, null, 'includePath', subDir.path + '/' + subItem.name)
            }
        } else {
            detect.add('WinSDK', version, null, 'includePath', verDir.path + '/' + verItem.name)
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
                        detect.add('WinSDK', verItem.name, machine, 'libraryPath', archDir.path + '/' + archItem.name)
                        break
                }
            }
        }
    }
}
