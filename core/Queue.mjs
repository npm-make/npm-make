export class Queue {
    #queue = []
    #limit
    #running = 0

    constructor(limit) {
        this.#limit = limit
    }

    wrap(callback) {
        return async (...args) => {
            try {
                if (this.#running >= this.#limit) {
                    await new Promise(resolve => this.#queue.push(resolve))
                }
                this.#running++
                return await callback(...args)
            } finally {
                this.#running--
                if (this.#queue.length > 0) {
                    this.#queue.shift()()
                }
            }
        }
    }
}
