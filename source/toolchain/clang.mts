import { Builder } from '../project/builder.mjs'
import { Source } from '../project/source.mjs'
import { Target } from '../project/target.mjs'
import { Toolchain } from './toolchain.mjs'

export class Clang extends Toolchain {
    EXECUTE_AR: string
    EXECUTE_CLANG: string
    EXECUTE_LR: string
    EXECUTE_RL: string

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
