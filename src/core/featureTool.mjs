export default class s {
    static parseFeature(output, feature) {
        let index = feature.indexOf('=')
        if (index >= 0) {
            let key = feature.substring(0, index)
            let value = feature.substring(index + 1)
            output.set(key, value)
        } else {
            output.set(feature, '')
        }
    }
}
