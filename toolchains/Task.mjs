export class Task {
    #children = []
    #callback
    #promise

    constructor(callback) {
        this.#callback = callback
    }

    depends(child) {
        this.#children.push(child)
    }

    async execute() {
        if (!this.#promise) {
            this.#promise = this.executeReal()
        }
        return this.#promise
    }

    async executeReal() {
        if (this.#children.length > 0) {
            const promises = this.#children.map(child => child.execute())
            await Promise.all(promises)
        }
        return this.#callback()
    }
}
