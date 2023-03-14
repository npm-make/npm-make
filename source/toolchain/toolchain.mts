import { Builder } from '../project/builder.mjs'
import { Source } from '../project/source.mjs'
import { Target } from '../project/target.mjs'
import { executeProcess } from '../executeTool.mjs'

export abstract class Toolchain {
    ENVIRONMENT: object

    abstract buildTarget(builder: Builder, target: Target): Promise<void>

    abstract compileSource(builder: Builder, target: Target, source: Source): Promise<void>

    async execute(cwd, file, ...args) {
        let result = null
        try {
            result = await executeProcess({ cwd, env: this.ENVIRONMENT }, file, ...args)
        } finally {
            console.log(cwd)
            console.log(file)
            console.log(args.join(' '))
            if (result) {
                console.log(result)
            }
        }
    }
}
