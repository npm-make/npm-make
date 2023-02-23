import child_process from 'node:child_process'
import process from 'node:process'

let taskLimit = 10
let taskRunning = 0
const waitingQueue = []
export default class Self {
    static {
        if (process.platform === 'win32') {
            child_process.execSync('chcp 65001')
        }
    }

    static async execute(options, file, ...args) {
        function invoke(resolve) {
            function thisTask() {
                function taskDone(error, stdout, stderr) {
                    resolve({error, stdout, stderr})
                    let nextTask = waitingQueue.shift()
                    if (nextTask) {
                        nextTask()
                    } else {
                        taskRunning--
                    }
                }

                child_process.execFile(file, args, options, taskDone)
            }

            if (taskRunning < taskLimit) {
                taskRunning++
                thisTask()
            } else {
                waitingQueue.push(thisTask)
            }
        }

        return new Promise(invoke)
    }
}
