export default class {
    static path(pattern: string): RegExp {
        const pattern1 = pattern.replace(/[.+^$|(){}\[\]\\]/g, '\\$&')
        const pattern2 = pattern1.replace(/\*/g, '.*')
        const pattern3 = pattern2.replace(/\?/g, '[^/]*')
        return new RegExp('^/' + pattern3 + '$')
    }
}
