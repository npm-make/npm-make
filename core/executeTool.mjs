import child_process from 'node:child_process'
import process from 'node:process'

export default class Self {
    static {
        if (process.platform === 'win32') {
            child_process.execSync('chcp 65001')
        }
    }

    static async execute(cwd, file, ...args) {
        return new Promise(resolve => {
            child_process.execFile(file, args, { cwd }, (error, stdout, stderr) => {
                resolve({ error, stdout, stderr })
            })
        })
    }
}
