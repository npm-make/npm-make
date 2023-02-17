export default class Self {
    static parse(output, argument) {
        let index = argument.indexOf('=')
        if (index >= 0) {
            let key = argument.substring(0, index)
            output[key] = argument.substring(index + 1)
        } else {
            output[argument] = ''
        }
    }
}
