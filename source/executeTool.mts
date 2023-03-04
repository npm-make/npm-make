import child_process from 'node:child_process'
import process from 'node:process'

// noinspection SpellCheckingInspection
export default class Self {
    static #queue = []
    static #limit = 10
    static #running = 0
    static {
        if (process.platform === 'win32') {
            child_process.execSync('chcp 65001')
        }
    }

    static async execute(options: any, file: string, ...args: string[]): Promise<string> {
        function invoke(resolve, reject) {
            function thisTask() {
                function taskDone(error, message, errorMessage) {
                    if (error) {
                        reject(errorMessage)
                    } else {
                        resolve(message)
                    }
                    if (Self.#queue.length > 0) {
                        const queuedTask = Self.#queue.shift()
                        queuedTask()
                    } else {
                        Self.#running--
                    }
                }

                child_process.execFile(file, args, options, taskDone)
            }

            if (Self.#running < Self.#limit) {
                Self.#running++
                thisTask()
            } else {
                Self.#queue.push(thisTask)
            }
        }

        return new Promise(invoke)
    }

    static async queryRegister(path: string, key: string): Promise<string> {
        let result = await this.execute(null, 'reg', 'QUERY', path, '/v', key)
        const match = /REG_\w+\s+(.*)/.exec(result)
        if (match) {
            return match.at(1)
        }
    }
}
