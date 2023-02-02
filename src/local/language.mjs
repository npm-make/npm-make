export default class {
    static #decoder = new TextDecoder('utf-8')

    static decode(buffer) {
        return this.#decoder.decode(buffer)
    }

    static setEncoding(encoding) {
        this.#decoder = new TextDecoder(encoding)
    }
}
