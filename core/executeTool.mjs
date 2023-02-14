import child_process from 'node:child_process'
import process from 'node:process'

export default class Self {
    static #taskExecuting = 0
    static #taskLimit = 10
    static #taskQueue = []
    static {
        if (process.platform === 'win32') {
            child_process.execSync('chcp 65001')
        }
    }

    static async execute(cwd, file, ...args) {
        function invoke(resolve) {
            function thisTask() {
                function taskDone(error, stdout, stderr) {
                    resolve({ error, stdout, stderr })
                    let nextTask = Self.#taskQueue.shift()
                    if (nextTask) {
                        nextTask()
                    } else {
                        Self.#taskExecuting--
                    }
                }

                child_process.execFile(file, args, { cwd }, taskDone)
            }

            if (Self.#taskExecuting < Self.#taskLimit) {
                Self.#taskExecuting++
                thisTask()
            } else {
                Self.#taskQueue.push(thisTask)
            }
        }

        return new Promise(invoke)
    }
}
