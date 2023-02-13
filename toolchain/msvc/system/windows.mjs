import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import msvc from '../msvc.mjs'

//noinspection JSUnresolvedVariable
export default class Self {
    static async detect(targetMachine, expectMsvc, expectSdk) {
        switch (process.arch) {
            case 'ia32':
                await this.#detectMsvc('C:\\Program Files', 'x86', targetMachine, expectMsvc)
                await this.#detectSdk('C:\\Program Files', 'x86', targetMachine, expectSdk)
                break
            case 'x64':
                await this.#detectMsvc('C:\\Program Files (x86)', 'x64', targetMachine, expectMsvc)
                await this.#detectSdk('C:\\Program Files (x86)', 'x64', targetMachine, expectSdk)
                break
        }
    }

    static async #detectMsvc(programRoot, localMachine, targetMachine, expectMsvc) {
        let installList = await this.#detectMsvc14Install()
        for (let installPath of installList) {
            let version = await this.#detectMsvc14Version(installPath, expectMsvc)
            if (version) {
                await this.#detectMsvc14Real(localMachine, targetMachine, installPath, version)
                return
            }
        }
        throw new Error('cannot found MSVC')
    }

    static async #detectMsvc14Install() {
        try {
            let installList = []
            let instanceDir = await fs.opendir('C:\\ProgramData\\Microsoft\\VisualStudio\\Packages\\_Instances')
            for await (let instance of instanceDir) {
                let statePath = path.join(instanceDir.path, instance.name, 'state.json')
                let stateJson = JSON.parse(await fs.readFile(statePath, 'utf-8'))
                installList.push(stateJson.installationPath)
            }
            return installList
        } catch {
        }
    }

    static async #detectMsvc14Version(installPath, expectMsvc) {
        try {
            let versionDir = await fs.opendir(path.join(installPath, 'VC', 'Tools', 'MSVC'))
            for await (let versionItem of versionDir) {
                if (!expectMsvc || expectMsvc === versionItem.name) {
                    return versionItem.name
                }
            }
        } catch {
        }
    }

    static async #detectMsvc14Real(localMachine, targetMachine, installPath, version) {
        msvc.versionMsvc = version
        msvc.executeCL = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'cl.exe')
        msvc.executeLIB = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'lib.exe')
        msvc.executeLINK = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'link.exe')
        msvc.includePathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'include'))
        msvc.includePathList.push(path.join(installPath, 'VC', 'Auxiliary', 'VS', 'include'))
        msvc.libraryPathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'lib', targetMachine))
        try {
            await fs.access(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc'))
            msvc.includePathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc', 'include'))
            msvc.libraryPathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc', 'lib', targetMachine))
        } catch {
        }
    }

    static async #detectSdk(programRoot, localMachine, targetMachine, expectSdk) {
        let installList = await this.#detectSdk8Install(programRoot)
        for (let installPath of installList) {
            let version = await this.#detectSdk8Version(installPath, expectSdk)
            if (version) {
                await this.#detectSdk8Real(installPath, localMachine, targetMachine, version)
                return
            }
        }
        throw new Error('cannot found Windows SDK')
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

    static async #detectSdk8Version(installPath, expectSdk) {
        try {
            let includeDir = await fs.opendir(path.join(installPath, 'Include'))
            for await (let versionItem of includeDir) {
                if (!expectSdk || expectSdk === versionItem.name) {
                    return versionItem.name
                }
            }
        } catch {
        }
    }

    static async #detectSdk8Real(installPath, localMachine, targetMachine, version) {
        msvc.versionSdk = version
        msvc.executeRC = path.join(installPath, 'bin', version, localMachine, 'rc.exe')
        await this.#detectSdk8Include(installPath, version)
        await this.#detectSdk8Library(targetMachine, installPath, version)
    }

    static async #detectSdk8Include(installPath, version) {
        let includeDir = await fs.opendir(path.join(installPath, 'Include', version))
        for await (let includeItem of includeDir) {
            msvc.includePathList.push(path.join(includeDir.path, includeItem.name))
        }
    }

    static async #detectSdk8Library(targetMachine, installPath, version) {
        let libraryDir = await fs.opendir(path.join(installPath, 'Lib', version))
        for await (let libraryItem of libraryDir) {
            let machineDir = await fs.opendir(path.join(libraryDir.path, libraryItem.name))
            for await (let machineItem of machineDir) {
                if (machineItem.name === targetMachine) {
                    msvc.libraryPathList.push(path.join(machineDir.path, machineItem.name))
                }
            }
        }
    }
}
