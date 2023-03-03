export type MachineType = 'ARM' | 'ARM64' | 'X64' | 'X86'
export type PlatformType = 'DARWIN' | 'LINUX' | 'WINDOWS'
export type SourceType = 'ASM' | 'C' | 'CXX' | 'DEF' | 'MANIFEST' | 'RC'
export type ToolchainType = 'CLANG' | 'GCC' | 'MSVC'

export interface BuilderFeature {
    DEBUG?: boolean
    DEBUG_WITHOUT_RTC?: boolean
    MACHINE?: MachineType
    OUTPUT_PATH?: string
    PLATFORM?: PlatformType
    RELEASE_WITH_DEBUG_INFO?: boolean
    RELEASE_MIN_SIZE?: boolean
    STATIC_RUNTIME?: boolean
    TOOLCHAIN?: ToolchainType
    WINDOWS_ARM64_CALL_X64?: boolean
}

export interface TargetFeature {
    SHARED?: boolean
    STANDARD_C?: string
    STANDARD_CXX?: string
    STATIC?: boolean
    WIN32_MAIN?: boolean
}
