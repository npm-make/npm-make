import { Buffer } from 'node:buffer'
import { execFile } from 'node:child_process'

const taskQueue: (() => void)[] = []
let taskLimit = 10
let taskRunning = 0

export function executeTask(thisTask: () => void) {
    if (thisTask) {
        if (taskRunning < taskLimit) {
            taskRunning++
            thisTask()
        } else {
            taskQueue.push(thisTask)
        }
    } else {
        if (taskQueue.length > 0) {
            const queuedTask = taskQueue.shift()
            queuedTask()
        } else {
            taskRunning--
        }
    }
}

export async function executeProcess(options: any, file: string, ...args: string[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        executeTask(() => {
            execFile(file, args, options, (error, message, errorMessage) => {
                if (error) {
                    reject(errorMessage)
                } else {
                    resolve(message)
                }
                executeTask(null)
            })
        })
    })
}
