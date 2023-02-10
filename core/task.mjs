import child_process from 'node:child_process'

export default class Task {
    static concurrentLimit = 10
    static concurrentSet = new Set
    dependencyList = []
    executeDictionary
    executeFile
    executeFlagList = []
    successPromise

    async runTask() {
        if (this.dependencyList.length > 0) {
            let promiseList = []
            for (let dependency of this.dependencyList) {
                if (dependency instanceof Task) {
                    promiseList.push(dependency.runTask())
                }
            }
            await Promise.all(promiseList)
        }
        if (!this.successPromise) {
            while (Task.concurrentSet.size >= Task.concurrentLimit) {
                await Promise.race(Task.concurrentSet)
            }
            this.successPromise = this.runTaskForce()
        }
        return this.successPromise
    }

    async runTaskForce() {
        let result = new Promise((resolve, reject) => {
            child_process.execFile(
                this.executeFile,
                this.executeFlagList,
                {
                    cwd: this.executeDictionary,
                    encoding: 'utf-8',
                },
                (error, stdout, stderr) => {
                    Task.concurrentSet.delete(result)
                    if (error) {
                        console.log(stdout)
                        resolve()
                    } else {
                        console.log(stderr)
                        reject()
                    }
                }
            )
        })
        Task.concurrentSet.add(result)
        return result
    }
}
