import { Builder } from '../project/builder.mjs'
import { Source } from '../project/source.mjs'
import { Target } from '../project/target.mjs'
import { Toolchain } from './toolchain.mjs'

export class Clang extends Toolchain {
    async buildTarget(builder: Builder, target: Target) {
    }

    async compileSource(builder: Builder, target: Target, source: Source) {
    }
}
