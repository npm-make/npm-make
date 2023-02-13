import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

//noinspection JSUnresolvedVariable
export default class Self {
    static executeCL
    static executeLIB
    static executeLINK
    static includePathList
    static libraryPathList
    static version

    static async detectMsvc(targetMachine, expectVersion) {
        this.executeCL = ''
        this.executeLINK = ''
        this.includePathList = []
        this.libraryPathList = []
        this.version = ''
        switch (process.arch) {
            case 'ia32':
                return this.#detectMsvc('C:\\Program Files', 'x86', targetMachine, expectVersion)
            case 'x64':
                return this.#detectMsvc('C:\\Program Files (x86)', 'x64', targetMachine, expectVersion)
        }
    }

    static async #detectMsvc(programRoot, localMachine, targetMachine, expectVersion) {
        let installList = await this.#detectMsvc14Install()
        for (let installPath of installList) {
            let version = await this.#detectMsvc14Version(installPath, expectVersion)
            if (version) {
                await this.#detectMsvc14Real(localMachine, targetMachine, installPath, version)
                break
            }
        }
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

    static async #detectMsvc14Version(installPath, expectVersion) {
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

    static async #detectMsvc14Real(localMachine, targetMachine, installPath, version) {
        this.version = version
        this.executeCL = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'cl.exe')
        this.executeLIB = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'lib.exe')
        this.executeLINK = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'link.exe')
        this.includePathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'include'))
        this.includePathList.push(path.join(installPath, 'VC', 'Auxiliary', 'VS', 'include'))
        this.libraryPathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'lib', targetMachine))
        try {
            await fs.access(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc'))
            this.includePathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc', 'include'))
            this.libraryPathList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc', 'lib', targetMachine))
        } catch {
        }
    }
}
