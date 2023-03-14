import { Builder } from '../project/builder.mjs'
import { Source } from '../project/source.mjs'
import { Target } from '../project/target.mjs'
import { Toolchain } from './toolchain.mjs'

export class Gcc extends Toolchain {
    EXECUTE_AR: string
    EXECUTE_GCC: string
    EXECUTE_RL: string
    EXECUTE_WR: string

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
}
