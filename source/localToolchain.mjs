import fs from 'node:fs/promises'

const toolchain = {
    type: 'MSVC',
    name: 'x64 Native Tools Command Prompt for VS 2022',
    targetMachine: 'X64',
    msvcVersion: '14.34.31933',
    sdkVersion: '10.0.22621.0',
    environment: {
        INCLUDE: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\include;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Auxiliary\\VS\\include;C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22621.0\\ucrt;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22621.0\\\\um;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22621.0\\\\shared;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22621.0\\\\winrt;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22621.0\\\\cppwinrt',
        LIB: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\lib\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22621.0\\ucrt\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\\\lib\\10.0.22621.0\\\\um\\x64',
        Path: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\HostX64\\x64;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\VC\\VCPackages;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\MSBuild\\Current\\bin\\Roslyn;C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.22621.0\\\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\bin\\\\x64;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\\\MSBuild\\Current\\Bin\\amd64;C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\Tools\\;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;;C:\\Tool\\wxapp\\dll;C:\\Users\\name\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\name\\OneDrive\\Apps\\mingw64;;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\CommonExtensions\\Microsoft\\CMake\\CMake\\bin;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\CommonExtensions\\Microsoft\\CMake\\Ninja;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\VC\\Linux\\bin\\ConnectionManagerExe',
    },
    executeASM: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\\x64\\ml64.exe',
    executeCL: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\\x64\\cl.exe',
    executeLIB: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\\x64\\lib.exe',
    executeLINK: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\\x64\\link.exe',
    executeRC: 'C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.22621.0\\x64\\rc.exe',
}

await fs.writeFile('C:\\Project\\npm-make\\zlib\\npm_make\\toolchain.json', JSON.stringify(toolchain, null, 2))
