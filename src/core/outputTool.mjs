import path from 'node:path'

export default class {
    static hashCode(input) {
        let result = 0
        for (let index = 0; index < input.length; index++) {
            result = result * 131 + input.charCodeAt(index)
            result |= 0
        }
        return result.toString(36)
    }

    static outputName(input) {
        let parsed = path.parse(input)
        return parsed.name + '.' + this.hashCode(parsed.dir)
    }
}
