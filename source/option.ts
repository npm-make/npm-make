export default interface Option {
    compileOption?: string[]
    definition?: string[]
    includeDirectory?: string[]
    library?: string[]
    linkDirectory?: string[]
    linkOption?: string[]
    regex?: RegExp
    scope?: 'INTERFACE' | 'PRIVATE' | 'PUBLIC'
}
