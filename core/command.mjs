import child_process from 'node:child_process'
import process from 'node:process'

//noinspection all
export default class Self {
    static {
        if (process.platform === 'win32') {
            child_process.execSync('chcp 65001')
        }
    }

    static async build() {
    }

    static async help() {
    }
}
