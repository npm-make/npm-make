export default class Option {
    definition: string = ''
    includeDirectory: string
    library: string
    linkDirectory: string
    option: string
    regex: RegExp
    scope: 'INTERFACE' | 'PRIVATE' | 'PUBLIC'
}
