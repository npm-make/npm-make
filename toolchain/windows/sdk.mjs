import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export default class Self {
    static selected

    static async selectSdk(targetMachine, expectVersion) {
        switch (process.arch) {
            case 'ia32':
                return this.#selectSdk('C:\\Program Files', 'x86', targetMachine, expectVersion)
            case 'x64':
                return this.#selectSdk('C:\\Program Files (x86)', 'x64', targetMachine, expectVersion)
        }
    }

    static async #selectSdk(programRoot, localMachine, targetMachine, expectVersion) {
        if (expectVersion === 'v7.1A') {
            this.selected = this.#detectSdk71A(programRoot, localMachine, targetMachine)
        } else {
            let installList = await this.#detectSdkInstall(programRoot)
            for (let installPath of installList) {
                let version = await this.#detectSdkVersion(installPath, expectVersion)
                if (version) {
                    this.selected = await this.#detectSdk(installPath, localMachine, targetMachine, version)
                    break
                }
            }
        }
        return this.selected
    }

    static async #detectSdkInstall(programRoot) {
        try {
            let installList = []
            let installDir = await fs.opendir(path.join(programRoot, 'Windows Kits'))
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

    static async #detectSdk(installPath, localMachine, targetMachine, version) {
        let sdkItem = {}
        sdkItem.version = version
        sdkItem.includeList = []
        sdkItem.libraryList = []
        sdkItem.executeRC = path.join(installPath, 'bin', version, localMachine, 'rc.exe')
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

    static #detectSdk71A(programRoot, localMachine, targetMachine) {
        let sdkItem = {}
        sdkItem.version = 'v7.1A'
        sdkItem.includeList = []
        sdkItem.libraryList = []
        sdkItem.includeList.push(path.join(programRoot, 'Microsoft SDKs', 'Windows', 'v7.1A', 'Include'))
        if (localMachine === 'x86') {
            sdkItem.executeRC = path.join(programRoot, 'Microsoft SDKs', 'Windows', 'v7.1A', 'Bin', 'RC.exe')
        } else {
            sdkItem.executeRC = path.join(programRoot, 'Microsoft SDKs', 'Windows', 'v7.1A', 'Bin', 'x64', 'RC.exe')
        }
        if (targetMachine === 'x86') {
            sdkItem.libraryList.push(path.join(programRoot, 'Microsoft SDKs', 'Windows', 'v7.1A', 'Lib'))
        } else if (targetMachine === 'x64') {
            sdkItem.libraryList.push(path.join(programRoot, 'Microsoft SDKs', 'Windows', 'v7.1A', 'Lib', 'x64'))
        } else {
            return undefined
        }
        return sdkItem
    }
}
