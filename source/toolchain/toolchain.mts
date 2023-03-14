import { executeProcess } from '../executeTool.mjs'
import { Builder } from '../project/builder.mjs'
import { Source } from '../project/source.mjs'
import { Target } from '../project/target.mjs'

export abstract class Toolchain {
    ENVIRONMENT: object

    async compileSource(builder: Builder, target: Target, source: Source) {
        switch (source._SOURCE_TYPE) {
            case 'C':
                return this.compileC(builder, target, source)
            case 'CPP':
                return this.compileCPP(builder, target, source)
            case 'RC':
                return this.compileRC(builder, target, source)
        }
    }

    async buildTarget(builder: Builder, target: Target) {
        switch (target.TARGET_TYPE) {
            case 'EXECUTE':
                return this.buildExecute(builder, target)
            case 'SHARED':
                return this.buildShared(builder, target)
            case 'STATIC':
                return this.buildStatic(builder, target)
        }
    }

    async compileC(builder: Builder, target: Target, source: Source) {
    }

    async compileCPP(builder: Builder, target: Target, source: Source) {
    }

    async compileRC(builder: Builder, target: Target, source: Source) {
    }

    async buildExecute(builder: Builder, target: Target) {
    }

    async buildShared(builder: Builder, target: Target) {
    }

    async buildStatic(builder: Builder, target: Target) {
    }

    async execute(cwd: string, file: string, ...args: string[]) {
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
