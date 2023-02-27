export default class {
    static parse(output: object, argument: string) {
        let index = argument.indexOf('=')
        if (index >= 0) {
            let key = argument.substring(0, index)
            output[key] = argument.substring(index + 1)
        } else {
            output[argument] = ''
        }
    }
}
