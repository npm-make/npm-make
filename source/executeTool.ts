import child_process from 'node:child_process'
import process from 'node:process'

let taskLimit = 10
let taskRunning = 0
const taskQueue = []
if (process.platform === 'win32') {
    child_process.execSync('chcp 65001')
}
export default class {
    static async execute(options, file, ...args) {
        function invoke(resolve) {
            function thisTask() {
                function taskDone(error, stdout, stderr) {
                    resolve({error, stdout, stderr})
                    let nextTask = taskQueue.shift()
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
                taskQueue.push(thisTask)
            }
        }

        return new Promise(invoke)
    }
}
