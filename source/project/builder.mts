import { Target } from './target.mjs'
import { SourceGroup } from './sourceGroup.mjs'
import { Toolchain } from '../toolchain/toolchain.mjs'

export class Builder {
    CLANG_VERSION: string
    CONFIG_NAME: string
    DEBUG: boolean
    DEBUG_WITHOUT_RTC: boolean
    GCC_VERSION: string
    MACHINE: 'ARM' | 'ARM64' | 'X64' | 'X86'
    MSVC_STATIC_RUNTIME: boolean
    MSVC_VERSION: string
    PLATFORM: 'DARWIN' | 'LINUX' | 'WINDOWS'
    RELEASE_WITH_DEBUG_INFO: boolean
    RELEASE_MIN_SIZE: boolean
    TOOLCHAIN: 'CLANG' | 'GCC' | 'MSVC'
    _TOOLCHAIN_IMPL: Toolchain

    async tryCompile(code: string, target: Target, group?: SourceGroup, suffix?: string): Promise<boolean> {
        return true
    }
}
