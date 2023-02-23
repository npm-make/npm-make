export default class Option {
    compileOption: string
    definition: string
    includeDirectory: string
    library: string
    linkDirectory: string
    linkOption: string
    regex: RegExp
    scope: 'INTERFACE' | 'PRIVATE' | 'PUBLIC'

    static append(outputList, inputList, column) {
        let regex = null
        let scope: any = 'PRIVATE'
        for (let input of inputList) {
            if (input === 'INTERFACE' || input === 'PRIVATE' || input === 'PUBLIC') {
                scope = input
            } else if (input instanceof RegExp) {
                regex = input
            } else {
                let option = new Option()
                option.regex = regex
                option.scope = scope
                option[column] = input
                outputList.push(option)
            }
        }
    }
}
