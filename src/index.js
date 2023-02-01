import search from './core/search.js'
import child_process from 'node:child_process'
import process from 'node:process'

// process.chdir('C:\\Project\\npm-make\\npm-make\\npm_make')
// let decoder = new TextDecoder('gbk')
//
// let fileList = []
// await search.search(fileList, 'C:\\Project\\npm-make\\zlib', '*.c')
// for (let file of fileList) {
//     child_process.execFile('C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\\x64\\cl.exe',
//         [
//             '/nologo',
//             '-c',
//             '/D_WIN32',
//             '/MDd',
//             '@C:\\Project\\npm-make\\npm-make\\env.cl',
//             file.path,
//         ],
//         {
//             cwd: 'C:\\Project\\npm-make\\npm-make\\npm_make',
//             encoding: 'buffer',
//             env: {
//                 LIB: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\lib\\x64;' +
//                     'C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\ucrt\\x64;' +
//                     'C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\um\\x64'
//             }
//         },
//         (error, stdout, stderr) => {
//             console.log(file.path + ':\n' + decoder.decode(stdout.buffer))
//         }
//     )
// }

// let fileList2 = []
// await search.search(fileList2, 'C:\\Project\\npm-make\\npm-make\\npm_make', '*.obj')
// let fileList3 = fileList2.map(input => input.path)
//
// child_process.execFile('C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\\x64\\cl.exe',
//     [
//         '/nologo',
//         ...fileList3,
//         '/link',
//         '/DLL',
//         '/DEF:C:\\Project\\npm-make\\zlib\\win32\\zlib.def'
//     ],
//     {
//         cwd: 'C:\\Project\\npm-make\\npm-make\\npm_make',
//         encoding: 'buffer',
//         env: {
//             LIB: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\lib\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\ucrt\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\um\\x64'
//         }
//     },
//     (error, stdout, stderr) => {
//         console.log(decoder.decode(stdout.buffer))
//     }
// )


let fileList3 = await search.search('C:\\Project\\npm-make', ['.*\\.c'])
console.log(fileList3)
