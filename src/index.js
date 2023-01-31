import Search from './core/search.js'
import child_process from 'node:child_process'
import string_decoder from 'node:string_decoder'
import iconv from 'iconv-lite'

iconv.skipDecodeWarning = true

// let a = new Search()
// await a.search('C:\\Project', '**/zlib/**/*.c')
//
// for (let file of a.result) {
//     console.log(file.path)
//     child_process.exec(
//         `"C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\x64\\cl.exe" "${file.path}"`,
//         (error, stdout, stderr) => {
//             console.log(error)
//         }
//     )
// }

child_process.exec('"C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\x64\\cl.exe" -utf-8 "C:\\Project\\npm-make\\zlib\\adler32.c"',
    (error, stdout, stderr) => {
        console.log(iconv.decode(stdout, 'gb2312'))
        console.log(iconv.decode(stderr, 'gb2312'))
    }
)
