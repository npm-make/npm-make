import fs from 'node:fs/promises'
import path from 'node:path'
import { MachineType } from '../../type.mjs'
import { Detect } from '../detect.mjs'

function detectSdk(installPath: string, localMachine: MachineType, targetMachine: MachineType, version: string) {
    this.version = version
    this.versionNumber = this.parseVersion(version)
    this.executePath = path.join(installPath, 'bin', version, localMachine)
    this.executeRC = path.join(this.executePath, 'rc.exe')
    this.includePathList.push(path.join(installPath, 'Include', version, 'cppwinrt'))
    this.includePathList.push(path.join(installPath, 'Include', version, 'shared'))
    this.includePathList.push(path.join(installPath, 'Include', version, 'ucrt'))
    this.includePathList.push(path.join(installPath, 'Include', version, 'um'))
    this.includePathList.push(path.join(installPath, 'Include', version, 'winrt'))
    this.libraryPathList.push(path.join(installPath, 'Lib', version, 'ucrt', targetMachine))
    this.libraryPathList.push(path.join(installPath, 'Lib', version, 'um', targetMachine))
}

async function detectSdk10(detect: Detect, installPath: string) {
    const verDir = await fs.opendir(installPath + '/bin')
    for await (const verItem of verDir) {
        if (/^\d+\.\d+\.\d+\.\d+$/.test(verItem.name)) {
            const archDir = await fs.opendir(verDir.path + '/' + verItem.name)
            for await (const archItem of archDir) {
                switch (archItem.name) {
                    case 'arm':
                        detect.push({
                            version: verItem.name,
                            localMachine: 'ARM',
                            executePath: archDir.path + '/' + archItem.name
                        })
                        break
                    case 'arm64':
                        detect.push({
                            version: verItem.name,
                            localMachine: 'ARM64',
                            executePath: archDir.path + '/' + archItem.name
                        })
                        break
                    case 'x64':
                        detect.push({
                            version: verItem.name,
                            localMachine: 'X64',
                            executePath: archDir.path + '/' + archItem.name
                        })
                        break
                    case 'x86':
                        detect.push({
                            version: verItem.name,
                            localMachine: 'X86',
                            executePath: archDir.path + '/' + archItem.name
                        })
                        break
                }
            }
        }
    }
}

const detect = new Detect()
await detectSdk10(detect, 'C:\\Program Files (x86)\\Windows Kits\\10')
console.log(detect)
