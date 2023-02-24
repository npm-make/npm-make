import executeTool from '../../executeTool.ts'

export default class Self {
    static async query(path, key) {
        let result = await executeTool.execute(null, 'reg', 'QUERY', path, '/v', key)
        if (!result.error) {
            return /(?<type>REG_\w+)\s+(?<value>.*)/.exec(result.stdout)
        }
    }
}
