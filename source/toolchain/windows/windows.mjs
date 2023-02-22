import executeTool from '../../executeTool.mjs'

export default class {
    static executeRC

    static async execute(cwd, file, ...args) {
        let result = await executeTool.execute({ cwd }, file, ...args)
        console.log(result.stdout)
        if (result.error) {
            throw new Error(result.stdout)
        }
    }
}
