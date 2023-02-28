export default class {
    static parse(output: object, argument: string) {
        const index = argument.indexOf('=')
        if (index >= 0) {
            const key = argument.substring(0, index)
            output[key] = argument.substring(index + 1)
        } else {
            output[argument] = ''
        }
    }
}
