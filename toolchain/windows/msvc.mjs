import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export default class Self {
    static selected

    static async selectMsvc(targetMachine, expectVersion) {
        let msvcList = []
        switch (process.arch) {
            case 'ia32':
                await this.#detectMsvc(msvcList, 'x86', targetMachine)
                break
            case 'x64':
                await this.#detectMsvc(msvcList, 'x64', targetMachine)
                break
        }
        if (msvcList.length > 0) {
            if (expectVersion) {
                for (let msvcItem of msvcList) {
                    if (msvcItem.version === expectVersion) {
                        this.selected = msvcItem
                        return
                    }
                }
                throw new Error('MSVC specified version not found')
            } else {
                this.selected = msvcList.at(-1)
            }
        } else {
            throw new Error('MSVC not found')
        }
    }

    static async #detectMsvc(msvcList, localMachine, targetMachine) {
        try {
            let instanceDir = await fs.opendir('C:\\ProgramData\\Microsoft\\VisualStudio\\Packages\\_Instances')
            for await (let instance of instanceDir) {
                let statePath = path.join(instanceDir.path, instance.name, 'state.json')
                let stateJson = JSON.parse(await fs.readFile(statePath, 'utf-8'))
                //noinspection JSUnresolvedVariable
                await this.#detectMsvcRoot(msvcList, localMachine, targetMachine, stateJson.installationPath)
            }
        } catch {
        }
    }

    static async #detectMsvcRoot(msvcList, localMachine, targetMachine, rootPath) {
        try {
            let versionDir = await fs.opendir(path.join(rootPath, 'VC', 'Tools', 'MSVC'))
            for await (let versionItem of versionDir) {
                await this.#detectMsvcVersion(msvcList, localMachine, targetMachine, rootPath, versionItem.name)
            }
        } catch {
        }
    }

    static async #detectMsvcVersion(msvcList, localMachine, targetMachine, rootPath, version) {
        let msvcItem = {}
        msvcItem.version = version
        msvcItem.executeCL = path.join(rootPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'cl.exe')
        msvcItem.includeList = []
        msvcItem.libraryList = []
        await this.#detectMsvcInclude(msvcItem.includeList, rootPath, version)
        await this.#detectMsvcLibrary(msvcItem.libraryList, targetMachine, rootPath, version)
        msvcList.push(msvcItem)
    }

    static async #detectMsvcInclude(includeList, rootPath, version) {
        includeList.push(path.join(rootPath, 'VC', 'Tools', 'MSVC', version, 'include'))
        includeList.push(path.join(rootPath, 'VC', 'Auxiliary', 'VS', 'include'))
    }

    static async #detectMsvcLibrary(libraryList, targetMachine, rootPath, version) {
        libraryList.push(path.join(rootPath, 'VC', 'Tools', 'MSVC', version, 'lib', targetMachine))
    }
}
