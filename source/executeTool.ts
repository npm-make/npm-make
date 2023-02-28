import child_process from 'node:child_process'
import process from 'node:process'

export default class Self {
    private static queue = []
    private static limit = 10
    private static running = 0
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
                    const nextTask = Self.queue.shift()
                    if (nextTask) {
                        nextTask()
                    } else {
                        Self.running--
                    }
                }

                child_process.execFile(file, args, options, taskDone)
            }

            if (Self.running < Self.limit) {
                Self.running++
                thisTask()
            } else {
                Self.queue.push(thisTask)
            }
        }

        return new Promise(invoke)
    }
}
