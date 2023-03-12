import { Msvc } from './toolchain/msvc/msvc.mjs'
import { Builder } from './project/builder.mjs'
import { Source } from './project/source.mjs'
import { Target } from './project/target.mjs'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

const msvc = new Msvc()
msvc.ENVIRONMENT = {
    INCLUDE: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\include;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\ATLMFC\\include;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Auxiliary\\VS\\include;C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\ucrt;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22000.0\\\\um;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22000.0\\\\shared;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22000.0\\\\winrt;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22000.0\\\\cppwinrt',
    LIB: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\lib\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\ucrt\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\\\lib\\10.0.22000.0\\\\um\\x64',
    Path: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\HostX64\\x64;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\VC\\VCPackages;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\MSBuild\\Current\\bin\\Roslyn;C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.22000.0\\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\bin\\\\x64;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\\\MSBuild\\Current\\Bin\\amd64;C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\Tools\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\Users\\name\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\name\\OneDrive\\Apps\\mingw64;;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\VC\\Linux\\bin\\ConnectionManagerExe'
}
msvc.EXECUTE_ASM = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\Hostx64\\x64\\ml64.exe'
msvc.EXECUTE_CL = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\Hostx64\\x64\\cl.exe'
msvc.EXECUTE_LIB = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\Hostx64\\x64\\lib.exe'
msvc.EXECUTE_LINK = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\Hostx64\\x64\\link.exe'
msvc.EXECUTE_RC = 'C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.22000.0\\x64\\rc.exe'
const builder = new Builder()
builder.DEBUG = true
builder.MACHINE = 'X64'
builder.MSVC_VERSION = '14.34.31933'
builder.PLATFORM = 'WINDOWS'
builder.TOOLCHAIN = 'MSVC'

async function addTarget(outputPath, outputName, srcList) {
    const target = new Target()
    target.OUTPUT_PATH = outputPath
    target.OUTPUT_NAME = outputName
    target.STATIC = true
    for (const src of srcList) {
        const parse1 = path.parse(src)
        const source = new Source()
        source._DEFINITION_LIST = ['ZLIB_DLL']
        source._OBJECT_PREFIX = path.join('obj', parse1.name)
        source._SOURCE_PATH = src
        switch (parse1.ext.toLowerCase()) {
            case '.asm':
            case '.s':
                source._SOURCE_TYPE = 'ASM'
                break
            case '.c':
                source._SOURCE_TYPE = 'C'
                break
            case '.cc':
            case '.cpp':
            case '.cxx':
            case '.ixx':
                source._SOURCE_TYPE = 'CPP'
                break
            case '.def':
                source._SOURCE_TYPE = 'DEF'
                break
            case '.manifest':
                source._SOURCE_TYPE = 'MANIFEST'
                break
            case '.rc':
                source._SOURCE_TYPE = 'RC'
                break
        }
        target._SOURCE_LIST.push(source)
    }
    await fs.mkdir(outputPath + '/obj', { recursive: true })
    return target
}

const target1 = await addTarget(
    'C:\\Project\\npm-make\\zlib\\npm_make\\default\\zlib',
    'zlib1.dll',
    [
        'C:\\Project\\npm-make\\zlib\\adler32.c',
        'C:\\Project\\npm-make\\zlib\\compress.c',
        'C:\\Project\\npm-make\\zlib\\crc32.c',
        'C:\\Project\\npm-make\\zlib\\deflate.c',
        'C:\\Project\\npm-make\\zlib\\gzclose.c',
        'C:\\Project\\npm-make\\zlib\\gzlib.c',
        'C:\\Project\\npm-make\\zlib\\gzread.c',
        'C:\\Project\\npm-make\\zlib\\gzwrite.c',
        'C:\\Project\\npm-make\\zlib\\infback.c',
        'C:\\Project\\npm-make\\zlib\\inffast.c',
        'C:\\Project\\npm-make\\zlib\\inflate.c',
        'C:\\Project\\npm-make\\zlib\\inftrees.c',
        'C:\\Project\\npm-make\\zlib\\trees.c',
        'C:\\Project\\npm-make\\zlib\\uncompr.c',
        'C:\\Project\\npm-make\\zlib\\zutil.c',
        'C:\\Project\\npm-make\\zlib\\win32\\zlib.def',
        'C:\\Project\\npm-make\\zlib\\win32\\zlib1.rc'
    ]
)

msvc.buildTarget(builder, target1)
    .catch(error => {
        console.log(error)
    })
