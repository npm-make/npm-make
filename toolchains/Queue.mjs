export class Queue {
    #queue = []
    #limit
    #running = 0

    constructor(limit) {
        this.#limit = limit
    }

    async execute(callback) {
        try {
            if (this.#running >= this.#limit) {
                await new Promise(resolve => this.#queue.push(resolve))
            }
            this.#running++
            return await callback()
        } finally {
            this.#running--
            if (this.#queue.length > 0) {
                this.#queue.shift()()
            }
        }
    }
}
