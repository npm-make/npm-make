export default interface BuilderFeature {
    DEBUG?: boolean
    DEBUG_WITHOUT_RTC?: boolean
    MACHINE?: 'ARM' | 'ARM64' | 'X64' | 'X86'
    OUTPUT_PATH?: string
    PLATFORM?: 'DARWIN' | 'LINUX' | 'WINDOWS'
    RELEASE_WITH_DEBUG_INFO?: boolean
    RELEASE_MIN_SIZE?: boolean
    STATIC_RUNTIME?: boolean
    TOOLCHAIN?: 'CLANG' | 'GCC' | 'MSVC'
    WINDOWS_ARM64_CALL_X64?: boolean
}
