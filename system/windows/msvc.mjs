import child_process from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

class Msvc {
    executeCL
    includeList = []
    libraryList = []
    version

    constructor(localMachine, targetMachine, installPath, version) {
        this.version = version
        this.executeCL = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'cl.exe')
        this.includeList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'include'))
        this.includeList.push(path.join(installPath, 'VC', 'Auxiliary', 'VS', 'include'))
        this.libraryList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'lib', targetMachine))
    }
}

class Sdk {
}

export default class Self {
    msvcList = []
    sdkList = []

    async detect(localMachine, targetMachine) {
        await this.#detectSdk(localMachine, targetMachine)
    }

    async #detectMsvc(localMachine, targetMachine) {
        let instanceDir = await fs.opendir('C:\\ProgramData\\Microsoft\\VisualStudio\\Packages\\_Instances')
        for await (let instance of instanceDir) {
            let statePath = path.join(instanceDir.path, instance.name, 'state.json')
            let stateText = await fs.readFile(statePath, 'utf-8')
            let stateJson = JSON.parse(stateText)
            let versionPath = path.join(stateJson.installationPath, 'VC', 'Tools', 'MSVC')
            let versionDir = await fs.opendir(versionPath)
            for await (let version of versionDir) {
                this.msvcList.push(new Msvc(localMachine, targetMachine, stateJson.installationPath, version))
            }
        }
    }

    async #detectSdk(localMachine, targetMachine) {
        switch (process.arch) {
            case 'x64':
                rootDir = await fs.opendir('C:\\Program Files\\Windows Kits')
        }

        try {
            let rootDir
            await this.#detectSdkRoot(localMachine, targetMachine, rootDir)
        } catch {
        }
        try {
            let rootDir = await fs.opendir('C:\\Program Files (x86)\\Windows Kits')
            await this.#detectSdkRoot(localMachine, targetMachine, rootDir)
        } catch {
        }
    }

    async #detectSdkRoot(localMachine, targetMachine, rootPath) {
        for await (let rootItem of rootDir) {
            try {
                let rootPath = path.join(rootDir.path, rootItem.name)
                let includePath = path.join(rootDir.path, rootItem.name, 'Include')
                let includeDir = await fs.opendir(includePath)
                for await (let versionItem of includeDir) {
                    await this.#detectSdkVersion(localMachine, targetMachine, rootPath, versionItem.name)
                }
            } catch {
            }
        }
    }

    async #detectSdkVersion(localMachine, targetMachine, rootPath, version) {
        let sdkItem = {}
        sdkItem.version = version
        sdkItem.executeRC = path.join(rootPath, 'bin', version, localMachine, 'rc.exe')
        sdkItem.includeList = []
        sdkItem.libraryList = []
        await this.#detectSdkInclude(rootPath, version, sdkItem.includeList)
        await this.#detectSdkLibrary(targetMachine, rootPath, version, sdkItem.libraryList)
        this.sdkList.push(sdkItem)
    }

    async #detectSdkInclude(rootPath, version, output) {
        let includeDir = await fs.opendir(path.join(rootPath, 'Include', version))
        for await (let includeItem of includeDir) {
            output.push(path.join(includeDir.path, includeItem.name))
        }
    }

    async #detectSdkLibrary(targetMachine, rootPath, version, output) {
        let libraryDir = await fs.opendir(path.join(rootPath, 'Lib', version))
        for await (let libraryItem of libraryDir) {
            let machineDir = await fs.opendir(path.join(libraryDir.path, libraryItem.name))
            for await (let machineItem of machineDir) {
                if (machineItem.name === targetMachine) {
                    output.push(path.join(machineDir.path, machineItem.name))
                }
            }
        }
    }
}

let ret = new Self()
await ret.detect('x64', 'x64')

console.log(ret)
