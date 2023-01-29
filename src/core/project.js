export default class {
    addExecutable(name, ...params) {

    }

    addLibrary(name, ...params) {
        let starting = true
        let scope = 1
        for (let item of params) {
            if (starting) {
                if (item === '') {

                }
            }
            starting = false
            if (item === 'PRIVATE') {
                scope = 1
                continue
            }
            if (item === 'PUBLIC') {
                scope = 2
                continue
            }
            if (item === 'INTERFACE') {
                scope = 3
                continue
            }
        }
    }

    useDependency(name, ...params) {

    }
}
