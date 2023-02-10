import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

//noinspection JSUnresolvedVariable,SpellCheckingInspection
export default class Self {
    static selected

    static async selectMsvc(targetMachine, expectVersion) {
        switch (process.arch) {
            case 'ia32':
                return this.#selectMsvc('C:\\Program Files', 'x86', targetMachine, expectVersion)
            case 'x64':
                return this.#selectMsvc('C:\\Program Files (x86)', 'x64', targetMachine, expectVersion)
        }
    }

    static async #selectMsvc(programRoot, localMachine, targetMachine, expectVersion) {
        if (expectVersion === '140xp') {
            this.selected = await this.#detectMsvc140xp(programRoot, localMachine, targetMachine)
        } else {
            let installList = await this.#detectMsvcInstall()
            for (let installPath of installList) {
                let version = await this.#detectMsvcVersion(installPath, expectVersion)
                if (version) {
                    this.selected = await this.#detectMsvc(localMachine, targetMachine, installPath, version)
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
        msvcItem.includeList = []
        msvcItem.libraryList = []
        msvcItem.executeCL = path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'bin', 'Host' + localMachine, targetMachine, 'cl.exe')
        msvcItem.includeList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'include'))
        msvcItem.includeList.push(path.join(installPath, 'VC', 'Auxiliary', 'VS', 'include'))
        msvcItem.libraryList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'lib', targetMachine))
        try {
            await fs.access(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc'))
            msvcItem.includeList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc', 'include'))
            msvcItem.libraryList.push(path.join(installPath, 'VC', 'Tools', 'MSVC', version, 'atlmfc', 'lib', targetMachine))
        } catch {
        }
        return msvcItem
    }

    static async #detectMsvc140xp(programRoot, localMachine, targetMachine) {
        let msvcItem = {}
        msvcItem.version = '140xp'
        msvcItem.includeList = []
        msvcItem.libraryList = []
        msvcItem.includeList.push(path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'include'))
        if (targetMachine === 'x86') {
            msvcItem.libraryList.push(path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'lib'))
            if (localMachine === 'x86') {
                msvcItem.executeCL = path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'bin', 'cl.exe')
            } else {
                msvcItem.executeCL = path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'bin', 'amd64_x86', 'cl.exe')
            }
        } else if (targetMachine === 'x64') {
            msvcItem.libraryList.push(path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'lib', 'amd64'))
            if (localMachine === 'x86') {
                msvcItem.executeCL = path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'bin', 'x86_amd64', 'cl.exe')
            } else {
                msvcItem.executeCL = path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'bin', 'amd64', 'cl.exe')
            }
        } else if (targetMachine === 'arm') {
            msvcItem.libraryList.push(path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'lib', 'arm'))
            if (localMachine === 'x86') {
                msvcItem.executeCL = path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'bin', 'x86_arm', 'cl.exe')
            } else {
                msvcItem.executeCL = path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'bin', 'amd64_arm', 'cl.exe')
            }
        } else {
            return undefined
        }
        try {
            await fs.access(path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'atlmfc'))
            msvcItem.includeList.push(path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'atlmfc', 'include'))
            if (targetMachine === 'x86') {
                msvcItem.libraryList.push(path.join(programRoot, 'Microsoft Visual Studio 14.0', 'atlmfc', 'VC', 'lib'))
            } else if (targetMachine === 'x64') {
                msvcItem.libraryList.push(path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'atlmfc', 'lib', 'amd64'))
            } else if (targetMachine === 'arm') {
                msvcItem.libraryList.push(path.join(programRoot, 'Microsoft Visual Studio 14.0', 'VC', 'atlmfc', 'lib', 'arm'))
            }
        } catch {
        }
        return msvcItem
    }
}
