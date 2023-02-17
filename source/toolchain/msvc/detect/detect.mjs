import process from 'node:process'
import detectWindows from './windows.mjs'
import msvc from '../msvc.mjs'

export default class {

    static async detect(targetMachine, expectMsvc, expectSdk) {
        this.executeASM = ''
        this.executeCL = ''
        this.executeLIB = ''
        this.executeLINK = ''
        this.executePathList = []
        this.executeRC = ''
        this.includePathList = []
        this.libraryList = []
        this.libraryPathList = []
        this.versionMsvc = ''
        this.versionSdk = ''
        switch (process.platform) {
            case 'win32':
                await detectWindows.detect(targetMachine, expectMsvc, expectSdk)
                break
        }
        this.environment = {}
        this.environment.INCLUDE = this.includePathList.join(';')
        this.environment.LIB = this.libraryPathList.join(';')
        this.environment.PATH = this.executePathList.join(';')
    }

    static async detect(targetMachine, expectMsvc, expectSdk) {
        msvc.libraryList.push('advapi32.lib')
        msvc.libraryList.push('comdlg32.lib')
        msvc.libraryList.push('gdi32.lib')
        msvc.libraryList.push('kernel32.lib')
        msvc.libraryList.push('ole32.lib')
        msvc.libraryList.push('oleaut32.lib')
        msvc.libraryList.push('shell32.lib')
        msvc.libraryList.push('user32.lib')
        msvc.libraryList.push('uuid.lib')
        msvc.libraryList.push('winspool.lib')
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


}
