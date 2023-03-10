import { execFile } from 'node:child_process'
import { platform } from 'node:process'

const taskQueue: Function[] = []
let taskRunning = 0
if (platform === 'win32') {
    await executeProcess(null, 'chcp', '65001')
}

export function executeTask(thisTask: Function) {
    if (thisTask) {
        if (taskRunning < 16) {
            taskRunning++
            thisTask()
        } else {
            taskQueue.push(thisTask)
        }
    } else {
        if (taskQueue.length > 0) {
            taskQueue.shift()()
        } else {
            taskRunning--
        }
    }
}

export async function executeProcess(options: any, file: string, ...args: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
        executeTask(() => {
            execFile(file, args, options, (error, message) => {
                if (error) {
                    reject(message)
                } else {
                    resolve(message)
                }
                executeTask(null)
            })
        })
    })
}
