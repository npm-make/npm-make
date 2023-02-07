import child_process from 'node:child_process'

export default class Task {
    static concurrentLimit = 10
    static concurrentSet = new Set()
    dependencyList = []
    executeDictionary
    executeFile
    executeFlagList = []
    successPromise

    async runTask(callback) {
        if (this.dependencyList.length > 0) {
            let promiseList = []
            for (let dependency of this.dependencyList) {
                if (dependency instanceof Task) {
                    promiseList.push(dependency.runTask(callback))
                }
            }
            await Promise.all(promiseList)
        }
        if (!this.successPromise) {
            if (Task.concurrentSet.size >= Task.concurrentLimit) {
                await Promise.race(Task.concurrentSet)
            }
            this.successPromise = this.runTaskForce(callback)
        }
        return this.successPromise
    }

    async runTaskForce(callback) {
        let result = new Promise((resolve, reject) => {
            child_process.execFile(
                this.executeFile,
                this.executeFlagList,
                {
                    cwd: this.executeDictionary,
                    encoding: 'buffer',
                },
                (error, stdout, stderr) => {
                    Task.concurrentSet.delete(result)
                    let success = callback(this, error, stdout, stderr)
                    if (success) {
                        resolve()
                    } else {
                        reject()
                    }
                }
            )
        })
        Task.concurrentSet.add(result)
        return result
    }
}
