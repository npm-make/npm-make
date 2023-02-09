import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export default class Self {
    static selected

    static async selectSdk(targetMachine, expectVersion) {
        let sdkList = []
        switch (process.arch) {
            case 'ia32':
                await this.#detectSdk(sdkList, 'x86', targetMachine, 'C:\\Program Files\\Windows Kits')
                break
            case 'x64':
                await this.#detectSdk(sdkList, 'x64', targetMachine, 'C:\\Program Files (x86)\\Windows Kits')
                break
        }
        if (sdkList.length > 0) {
            if (expectVersion) {
                for (let sdkItem of sdkList) {
                    if (sdkItem.version === expectVersion) {
                        this.selected = sdkItem
                        return
                    }
                }
                throw new Error('Windows SDK specified version not found')
            } else {
                this.selected = sdkList.at(-1)
            }
        } else {
            throw new Error('Windows SDK not found')
        }
    }

    static async #detectSdk(sdkList, localMachine, targetMachine, installPath) {
        try {
            let installDir = await fs.opendir(installPath)
            for await (let installItem of installDir) {
                let rootPath = path.join(installDir.path, installItem.name)
                await this.#detectSdkRoot(sdkList, localMachine, targetMachine, rootPath)
            }
        } catch {
        }
    }

    static async #detectSdkRoot(sdkList, localMachine, targetMachine, rootPath) {
        try {
            let includeDir = await fs.opendir(path.join(rootPath, 'Include'))
            for await (let versionItem of includeDir) {
                await this.#detectSdkVersion(sdkList, localMachine, targetMachine, rootPath, versionItem.name)
            }
        } catch {
        }
    }

    static async #detectSdkVersion(sdkList, localMachine, targetMachine, rootPath, version) {
        let sdkItem = {}
        sdkItem.version = version
        sdkItem.executeRC = path.join(rootPath, 'bin', version, localMachine, 'rc.exe')
        sdkItem.includeList = []
        sdkItem.libraryList = []
        await this.#detectSdkInclude(sdkItem.includeList, rootPath, version)
        await this.#detectSdkLibrary(sdkItem.libraryList, targetMachine, rootPath, version)
        sdkList.push(sdkItem)
    }

    static async #detectSdkInclude(includeList, rootPath, version) {
        let includeDir = await fs.opendir(path.join(rootPath, 'Include', version))
        for await (let includeItem of includeDir) {
            includeList.push(path.join(includeDir.path, includeItem.name))
        }
    }

    static async #detectSdkLibrary(libraryList, targetMachine, rootPath, version) {
        let libraryDir = await fs.opendir(path.join(rootPath, 'Lib', version))
        for await (let libraryItem of libraryDir) {
            let machineDir = await fs.opendir(path.join(libraryDir.path, libraryItem.name))
            for await (let machineItem of machineDir) {
                if (machineItem.name === targetMachine) {
                    libraryList.push(path.join(machineDir.path, machineItem.name))
                }
            }
        }
    }
}
