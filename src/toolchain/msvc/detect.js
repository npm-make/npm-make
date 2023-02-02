export default class {
    static async startup(env) {
        env.MSVC_CL = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\\x64\\cl.exe'
        env.MSVC_INCLUDE = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\include;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Auxiliary\\VS\\include;C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\ucrt;C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\um;C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\shared;C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\winrt;C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\cppwinrt'
        env.MSVC_LIB = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\lib\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\ucrt\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\um\\x64'
        env.MSVC_LIBPATH = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\lib\\x64;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\lib\\x86\\store\\references;C:\\Program Files (x86)\\Windows Kits\\10\\UnionMetadata\\10.0.22000.0;C:\\Program Files (x86)\\Windows Kits\\10\\References\\10.0.22000.0;C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319'
    }
}
