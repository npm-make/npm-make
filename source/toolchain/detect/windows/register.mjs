import executeTool from '../../../executeTool.mjs'

export default class {
    async query(path, key) {
        let result = executeTool.execute(null, 'reg', path, key)

    }
}
