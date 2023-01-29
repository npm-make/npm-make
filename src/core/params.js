export default class {
    * parseParams(...params) {
        let scope = 'PRIVATE'
        for (let param of params) {
            if (param === 'PRIVATE' || param === 'PUBLIC' || param === 'INTERFACE') {
                scope = param
                continue
            }
            yield { scope, param }
        }
    }
}
