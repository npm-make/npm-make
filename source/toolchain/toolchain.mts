import { Builder } from '../project/builder.mjs'
import { Source } from '../project/source.mjs'
import { Target } from '../project/target.mjs'

export interface Toolchain {
    compileSource(builder: Builder, target: Target, source: Source): Promise<void>

    buildTarget(builder: Builder, target: Target): Promise<void>
}
