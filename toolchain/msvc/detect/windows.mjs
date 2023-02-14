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
        let detectMsvc14 = await this.#detectMsvc14(programRoot, localMachine, targetMachine, expectMsvc)
        if (!detectMsvc14) {
            throw new Error('cannot found MSVC')
        }
    }

    static async #detectMsvc14(programRoot, localMachine, targetMachine, expectMsvc) {
        let installPathList = await this.#detectMsvc14Install()
        for (let installPath of installPathList) {
            let versionList = await this.#detectMsvc14Version(installPath)
            for (let version of versionList) {
                if (!expectMsvc || expectMsvc === version) {
                    await this.#detectMsvc14Real(localMachine, targetMachine, installPath, version)
                    return true
                }
            }
        }
        return false
    }

    static async #detectMsvc14Install() {
        try {
            let installPathList = []
            let instanceDir = await fs.opendir('C:\\ProgramData\\Microsoft\\VisualStudio\\Packages\\_Instances')
            for await (let instance of instanceDir) {
                let statePath = path.join(instanceDir.path, instance.name, 'state.json')
                let stateJson = JSON.parse(await fs.readFile(statePath, 'utf-8'))
                installPathList.push(stateJson.installationPath)
            }
            return installPathList
        } catch {
        }
    }

    static async #detectMsvc14Version(installPath) {
        try {
            let versionList = []
            let versionDir = await fs.opendir(path.join(installPath, 'VC', 'Tools', 'MSVC'))
            for await (let versionItem of versionDir) {
                versionList.push(versionItem.name)
            }
            return versionList
        } catch {
        }
    }

    static async #detectMsvc14Real(localMachine, targetMachine, installPath, version) {
        msvc.versionMsvc = version
        msvc.executeCL = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'cl.exe')
        msvc.executeLIB = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'lib.exe')
        msvc.executeLINK = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'link.exe')
        msvc.includePathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'include'))
        msvc.libraryPathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'lib', targetMachine))
        try {
            await fs.access(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc'))
            msvc.includePathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc', 'include'))
            msvc.libraryPathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc', 'lib', targetMachine))
        } catch {
        }
    }

    static async #detectSdk(programRoot, localMachine, targetMachine, expectSdk) {
        let detectSdk8 = await this.#detectSdk8(programRoot, localMachine, targetMachine, expectSdk)
        if (!detectSdk8) {
            throw new Error('cannot found Windows SDK')
        }
    }

    static async #detectSdk8(programRoot, localMachine, targetMachine, expectSdk) {
        let installPathList = await this.#detectSdk8Install(programRoot)
        for (let installPath of installPathList) {
            let versionList = await this.#detectSdk8Version(installPath)
            for (let version of versionList) {
                if (!expectSdk || expectSdk === version) {
                    await this.#detectSdk8Real(installPath, localMachine, targetMachine, version)
                    return true
                }
            }
        }
        return false
    }

    static async #detectSdk8Install(programRoot) {
        try {
            let installPathList = []
            let installDir = await fs.opendir(path.join(programRoot, 'Windows Kits'))
            for await (let installItem of installDir) {
                installPathList.push(path.join(installDir.path, installItem.name))
            }
            return installPathList
        } catch {
        }
    }

    static async #detectSdk8Version(installPath) {
        try {
            let versionList = []
            let includeDir = await fs.opendir(path.join(installPath, 'Include'))
            for await (let versionItem of includeDir) {
                versionList.push(versionItem.name)
            }
            return versionList
        } catch {
        }
    }

    static async #detectSdk8Real(installPath, localMachine, targetMachine, version) {
        msvc.versionSdk = version
        msvc.executeRC = path.join(installPath, 'bin', version, localMachine, 'rc.exe')
        msvc.includePathList.push(path.join(installPath, 'Include', version, 'cppwinrt'))
        msvc.includePathList.push(path.join(installPath, 'Include', version, 'shared'))
        msvc.includePathList.push(path.join(installPath, 'Include', version, 'ucrt'))
        msvc.includePathList.push(path.join(installPath, 'Include', version, 'um'))
        msvc.includePathList.push(path.join(installPath, 'Include', version, 'winrt'))
        msvc.libraryPathList.push(path.join(installPath, 'Lib', version, 'ucrt', targetMachine))
        msvc.libraryPathList.push(path.join(installPath, 'Lib', version, 'um', targetMachine))
    }
}
