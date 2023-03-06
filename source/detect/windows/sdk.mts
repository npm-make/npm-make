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

async function detectSdk7(detect: Detect, installPath: string) {
    const verDir = await fs.opendir(installPath)
    for await (const verItem of verDir) {
        await detect.tryAdd('WinSDK', verItem.name, null, 'includePath', verDir.path + '/' + verItem.name + '/Include')
        await detect.tryAdd('WinSDK', verItem.name, 'X86', 'libraryPath', verDir.path + '/' + verItem.name + '/Lib')
        await detect.tryAdd('WinSDK', verItem.name, 'X64', 'libraryPath', verDir.path + '/' + verItem.name + '/Lib/x64')
        switch (process.arch) {
            case 'ia32':
                await detect.tryAdd('WinSDK', verItem.name, null, 'executePath', verDir.path + '/' + verItem.name + '/bin')
                await detect.tryAdd('WinSDK', verItem.name, null, 'executeRC', verDir.path + '/' + verItem.name + '/bin/rc.exe')
                break
            case 'x64':
                await detect.tryAdd('WinSDK', verItem.name, null, 'executePath', verDir.path + '/' + verItem.name + '/bin/x64')
                await detect.tryAdd('WinSDK', verItem.name, null, 'executeRC', verDir.path + '/' + verItem.name + '/bin/x64/rc.exe')
                break
        }
    }
}

async function detectSdk8(detect: Detect, installPath: string) {
    const verDir = await fs.opendir(installPath)
    for await (const verItem of verDir) {
        try {
            await detectSdk8Bin(detect, verDir.path + '/' + verItem.name + '/bin', verItem.name)
            await detectSdk8Inc(detect, verDir.path + '/' + verItem.name + '/Include', verItem.name)
            await detectSdk8Lib(detect, verDir.path + '/' + verItem.name + '/Lib')
        } catch {
        }
    }
}

async function detectSdk8Bin(detect: Detect, binPath: string, version: string) {
    const archDir = await fs.opendir(binPath)
    for await (const archItem of archDir) {
        if (/\d+\.\d+\.\d+\.\d+/.test(archItem.name)) {
            await detectSdk8Inc(detect, archDir.path + '/' + archItem.name, archItem.name)
        } else {
            if (checkLocalMachine(archItem.name)) {
                detect.add('WinSDK', version, null, 'executePath', archDir.path + '/' + archItem.name)
                await detect.tryAdd('WinSDK', version, null, 'executeRC', archDir.path + '/' + archItem.name + '/rc.exe')
            }
        }
    }
}

async function detectSdk8Inc(detect: Detect, incPath: string, version: string) {
    const subDir = await fs.opendir(incPath)
    for await (const subItem of subDir) {
        if (/\d+\.\d+\.\d+\.\d+/.test(subItem.name)) {
            await detectSdk8Inc(detect, subDir.path + '/' + subItem.name, subItem.name)
        } else {
            detect.add('WinSDK', version, null, 'includePath', subDir.path + '/' + subItem.name)
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
                detect.add('WinSDK', verItem.name, archItem.name, 'libraryPath', archDir.path + '/' + archItem.name)
            }
        }
    }
}
