import process from 'node:process'
import msvcWindows from './system/windows.mjs'

export default class Self {
    static executeCL
    static executeLIB
    static executeLINK
    static executeRC
    static includePathList
    static libraryList
    static libraryPathList
    static versionMsvc
    static versionSdk

    static async detect(targetMachine, expectMsvc, expectSdk) {
        this.executeCL = ''
        this.executeLIB = ''
        this.executeLINK = ''
        this.executeRC = ''
        this.includePathList = []
        this.libraryList = []
        this.libraryPathList = []
        this.versionMsvc = ''
        this.versionSdk = ''
        switch (process.platform) {
            case 'win32':
                await msvcWindows.detect(targetMachine, expectMsvc, expectSdk)
                break
        }
    }
}
