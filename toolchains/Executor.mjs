import { execFile } from 'node:child_process'

export class Executor {
    cwd
    env
    encoding = 'utf-8'
    shell = false
    windowsHide = true

    async executeReal(file, ...args) {
        return new Promise((resolve, reject) => {
            execFile(file, args, this, (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stdout, stderr })
                } else {
                    resolve({ error, stdout, stderr })
                }
            })
        })
    }
}
