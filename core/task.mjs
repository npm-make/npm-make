import child_process from 'node:child_process'

export default class Task {
    static concurrentLimit = 10
    static concurrentSet = new Set
    dependencyList = []
    successPromise
    callback

    constructor(callback, beforeList) {
        this.callback = callback
        if (beforeList) {
            this.dependencyList = beforeList
        }
    }

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
            if (this.callback) {
                this.successPromise = this.callback()
            } else {
                this.successPromise = Promise.resolve()
            }
        }
        return this.successPromise
    }
}
