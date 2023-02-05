export default class {
    static parseArgument(output, argument) {
        let index = argument.indexOf('=')
        if (index >= 0) {
            let key = argument.substring(0, index)
            let value = argument.substring(index + 1)
            output.set(key, value)
        } else {
            output.set(argument, '')
        }
    }
}
