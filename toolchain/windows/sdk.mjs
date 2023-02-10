import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export default class Self {
    static selected

    static async selectSdk(targetMachine, installPath, expectVersion) {
        switch (process.arch) {
            case 'ia32':
                return this.#selectSdk('C:\\Program Files\\Windows Kits', 'x86', targetMachine, installPath, expectVersion)
            case 'x64':
                return this.#selectSdk('C:\\Program Files (x86)\\Windows Kits', 'x64', targetMachine, installPath, expectVersion)
        }
    }

    static async #selectSdk(installRoot, localMachine, targetMachine, installPath, expectVersion) {
        if (installPath) {
            let version = await this.#detectSdkVersion(installPath, expectVersion)
            if (version) {
                this.selected = this.#detectSdk(localMachine, targetMachine, installPath, version)
            }
        } else {
            let installList = await this.#detectSdkInstall(installRoot)
            for (let thisPath of installList) {
                let version = await this.#detectSdkVersion(thisPath, expectVersion)
                if (version) {
                    this.selected = this.#detectSdk(localMachine, targetMachine, thisPath, version)
                    break
                }
            }
        }
        return this.selected
    }

    static async #detectSdkInstall(installRoot) {
        try {
            let installList = []
            let installDir = await fs.opendir(installRoot)
            for await (let installItem of installDir) {
                installList.push(path.join(installDir.path, installItem.name))
            }
            return installList
        } catch {
        }
    }

    static async #detectSdkVersion(installPath, expectVersion) {
        try {
            let includeDir = await fs.opendir(path.join(installPath, 'Include'))
            for await (let versionItem of includeDir) {
                if (!expectVersion || expectVersion === versionItem.name) {
                    return versionItem.name
                }
            }
        } catch {
        }
    }

    static async #detectSdk(localMachine, targetMachine, installPath, version) {
        let sdkItem = {}
        sdkItem.version = version
        sdkItem.executeRC = path.join(installPath, 'bin', version, localMachine, 'rc.exe')
        sdkItem.includeList = []
        sdkItem.libraryList = []
        await this.#detectSdkInclude(sdkItem.includeList, installPath, version)
        await this.#detectSdkLibrary(sdkItem.libraryList, targetMachine, installPath, version)
        return sdkItem
    }

    static async #detectSdkInclude(includeList, installPath, version) {
        let includeDir = await fs.opendir(path.join(installPath, 'Include', version))
        for await (let includeItem of includeDir) {
            includeList.push(path.join(includeDir.path, includeItem.name))
        }
    }

    static async #detectSdkLibrary(libraryList, targetMachine, installPath, version) {
        let libraryDir = await fs.opendir(path.join(installPath, 'Lib', version))
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
