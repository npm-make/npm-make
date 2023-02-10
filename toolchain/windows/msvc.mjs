import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export default class Self {
    static selected

    static async selectMsvc(targetMachine, installPath, expectVersion) {
        switch (process.arch) {
            case 'ia32':
                return this.#selectMsvc('x86', targetMachine, installPath, expectVersion)
            case 'x64':
                return this.#selectMsvc('x64', targetMachine, installPath, expectVersion)
        }
    }

    static async #selectMsvc(localMachine, targetMachine, installPath, expectVersion) {
        if (installPath) {
            let version = await this.#detectMsvcVersion(installPath, expectVersion)
            if (version) {
                this.selected = this.#detectMsvc(localMachine, targetMachine, installPath, version)
            }
        } else {
            let installList = await this.#detectMsvcInstall()
            for (let thisPath of installList) {
                let version = await this.#detectMsvcVersion(thisPath, expectVersion)
                if (version) {
                    this.selected = this.#detectMsvc(localMachine, targetMachine, thisPath, version)
                    break
                }
            }
        }
        return this.selected
    }

    static async #detectMsvcInstall() {
        try {
            let installList = []
            let instanceDir = await fs.opendir('C:\\ProgramData\\Microsoft\\VisualStudio\\Packages\\_Instances')
            for await (let instance of instanceDir) {
                let statePath = path.join(instanceDir.path, instance.name, 'state.json')
                let stateJson = JSON.parse(await fs.readFile(statePath, 'utf-8'))
                //noinspection JSUnresolvedVariable
                installList.push(stateJson.installationPath)
            }
            return installList
        } catch {
        }
    }

    static async #detectMsvcVersion(installPath, expectVersion) {
        try {
            let versionDir = await fs.opendir(path.join(installPath, 'VC', 'Tools', 'MSVC'))
            for await (let versionItem of versionDir) {
                if (!expectVersion || expectVersion === versionItem.name) {
                    return versionItem.name
                }
            }
        } catch {
        }
    }

    static async #detectMsvc(localMachine, targetMachine, installPath, version) {
        let msvcItem = {}
        msvcItem.version = version
        msvcItem.executeCL = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'cl.exe')
        msvcItem.includeList = []
        msvcItem.libraryList = []
        await this.#detectMsvcInclude(msvcItem.includeList, installPath, version)
        await this.#detectMsvcLibrary(msvcItem.libraryList, targetMachine, installPath, version)
        return msvcItem
    }

    static async #detectMsvcInclude(includeList, installPath, version) {
        includeList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'include'))
        includeList.push(path.join(installPath, 'VC', 'Auxiliary', 'VS', 'include'))
    }

    static async #detectMsvcLibrary(libraryList, targetMachine, installPath, version) {
        libraryList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'lib', targetMachine))
    }
}
