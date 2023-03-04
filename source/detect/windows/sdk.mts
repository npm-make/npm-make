import fs from 'node:fs/promises'
import { Detect } from '../detect.mjs'

function parseMachine(input: string) {
    switch (input) {
        case 'arm':
            return 'ARM'
        case 'arm64':
            return 'ARM64'
        case 'arm64ec':
            return 'ARM64EC'
        case 'x64':
            return 'X64'
        case 'x86':
            return 'X86'
    }
}

async function detectSdk10(detect: Detect, installPath: string) {
    const binDir = await fs.opendir(installPath + '/bin')
    for await (const binItem of binDir) {
        const machine1 = parseMachine(binItem.name)
        if (machine1) {
            detect.add(machine1, 'WinSDK', null, 'executePath', binDir.path + '/' + binItem.name)
            await detect.tryAdd(machine1, 'WinSDK', null, 'executeRC', binDir.path + '/' + binItem.name + '/rc.exe')
        } else {
            const archDir = await fs.opendir(binDir.path + '/' + binItem.name)
            for await (const archItem of archDir) {
                const machine2 = parseMachine(archItem.name)
                if (machine2) {
                    detect.add(machine2, 'WinSDK', binItem.name, 'executePath', archDir.path + '/' + archItem.name)
                    await detect.tryAdd(machine2, 'WinSDK', binItem.name, 'executeRC', archDir.path + '/' + archItem.name + '/rc.exe')
                }
            }
        }
    }
    const incDir = await fs.opendir(installPath + '/Include')
    for await (const incItem of incDir) {
        const subDir = await fs.opendir(incDir.path + '/' + incItem.name)
        for await (const subItem of subDir) {
            detect.add(null, 'WinSDK', incItem.name, 'includePath', subDir.path + '/' + subItem.name)
        }
    }
    const libDir = await fs.opendir(installPath + '/Lib')
    for await (const libItem of libDir) {
        const subDir = await fs.opendir(libDir.path + '/' + libItem.name)
        for await (const subItem of subDir) {
            const archDir = await fs.opendir(subDir.path + '/' + subItem.name)
            for await (const archItem of archDir) {
                const machine = parseMachine(archItem.name)
                if (machine) {
                    detect.add(machine, 'WinSDK', libItem.name, 'libraryPath', archDir.path + '/' + archItem.name)
                }
            }
        }
    }
}

const detect = new Detect()
await detectSdk10(detect, 'C:\\Program Files (x86)\\Windows Kits\\10')
console.log(detect)
