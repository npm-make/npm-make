export class Task {
    children
    callback
    promise

    constructor(callback) {
        if (callback) {
            this.callback = callback
            this.children = []
        } else {
            throw new Error('Task callback cannot be null')
        }
    }

    addChild(child) {
        this.children.push(child)
    }

    async execute() {
        if (!this.promise) {
            this.promise = this.executeReal()
        }
        return this.promise
    }

    async executeReal() {
        const promises = []
        for (const child of this.children) {
            const promise = child.execute()
            promises.push(promise)
        }
        await Promise.all(promises)
        return this.callback()
    }
}
