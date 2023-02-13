import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export default class Self {
    static executeRC
    static includePathList
    static libraryList
    static libraryPathList
    static version

    static async detectSdk(targetMachine, expectVersion) {
        this.executeRC = ''
        this.includePathList = []
        this.libraryList = []
        this.libraryPathList = []
        this.version = ''
        switch (process.arch) {
            case 'ia32':
                return this.#detectSdk('C:\\Program Files', 'x86', targetMachine, expectVersion)
            case 'x64':
                return this.#detectSdk('C:\\Program Files (x86)', 'x64', targetMachine, expectVersion)
        }
    }

    static async #detectSdk(programRoot, localMachine, targetMachine, expectVersion) {
        let installList = await this.#detectSdk8Install(programRoot)
        for (let installPath of installList) {
            let version = await this.#detectSdk8Version(installPath, expectVersion)
            if (version) {
                await this.#detectSdk8Real(installPath, localMachine, targetMachine, version)
                break
            }
        }
    }

    static async #detectSdk8Install(programRoot) {
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

    static async #detectSdk8Version(installPath, expectVersion) {
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

    static async #detectSdk8Real(installPath, localMachine, targetMachine, version) {
        this.version = version
        this.executeRC = path.join(installPath, 'bin', version, localMachine, 'rc.exe')
        await this.#detectSdk8Include(installPath, version)
        await this.#detectSdk8Library(targetMachine, installPath, version)
    }

    static async #detectSdk8Include(installPath, version) {
        let includeDir = await fs.opendir(path.join(installPath, 'Include', version))
        for await (let includeItem of includeDir) {
            this.includePathList.push(path.join(includeDir.path, includeItem.name))
        }
    }

    static async #detectSdk8Library(targetMachine, installPath, version) {
        let libraryDir = await fs.opendir(path.join(installPath, 'Lib', version))
        for await (let libraryItem of libraryDir) {
            let machineDir = await fs.opendir(path.join(libraryDir.path, libraryItem.name))
            for await (let machineItem of machineDir) {
                if (machineItem.name === targetMachine) {
                    this.libraryPathList.push(path.join(machineDir.path, machineItem.name))
                }
            }
        }
    }
}
