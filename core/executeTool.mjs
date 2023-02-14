import child_process from 'node:child_process'
import process from 'node:process'

export default class Self {
    static #executing = 0
    static #limit = 10
    static #queue = []
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
                    let nextTask = Self.#queue.shift()
                    if (nextTask) {
                        nextTask()
                    } else {
                        Self.#executing--
                    }
                }

                child_process.execFile(file, args, { cwd }, taskDone)
            }

            if (Self.#executing < Self.#limit) {
                Self.#executing++
                thisTask()
            } else {
                Self.#queue.push(thisTask)
            }
        }

        return new Promise(invoke)
    }
}
