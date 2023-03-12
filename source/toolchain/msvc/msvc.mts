import { executeProcess } from '../../executeTool.mjs'
import { Builder } from '../../project/builder.mjs'
import { Source } from '../../project/source.mjs'
import { Target } from '../../project/target.mjs'
import { buildC, buildCPP } from './cpp.mjs'
import { buildLink } from './link.mjs'
import { buildRC } from './rc.mjs'

export class Msvc {
    ENVIRONMENT: object
    EXECUTE_ASM: string
    EXECUTE_CL: string
    EXECUTE_LIB: string
    EXECUTE_LINK: string
    EXECUTE_RC: string

    async execute(cwd, file, ...args) {
        const result = await executeProcess({ cwd, env: this.ENVIRONMENT }, file, ...args)
        console.log(file, args.join(' '), result)
    }

    async buildSource(builder: Builder, target: Target, source: Source) {
        switch (source._SOURCE_TYPE) {
            case 'C':
                return buildC(this, builder, target, source)
            case 'CPP':
                return buildCPP(this, builder, target, source)
            case 'RC':
                return buildRC(this, builder, target, source)
        }
    }

    async buildTarget(builder: Builder, target: Target) {
        if (target._SOURCE_LIST.length > 0) {
            const waitingList = []
            for (const source of target._SOURCE_LIST) {
                waitingList.push(this.buildSource(builder, target, source))
            }
            await Promise.all(waitingList)
        }
        return buildLink(this, builder, target)
    }
}
