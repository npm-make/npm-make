import search from './core/search.js'
import child_process from 'node:child_process'

let decoder = new TextDecoder('gbk')
let fileList = []
await search.search(fileList, 'C:\\Project\\npm-make\\zlib', '**/*.c')

for (let file of fileList) {
    console.log(file)

    // child_process.execFile('C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx86\\x86\\cl.exe',
    //     [],
    //     {
    //         cwd: 'C:\\Project\\npm-make\\npm-make\\npm_make',
    //         encoding: 'buffer'
    //     },
    //     (error, stdout, stderr) => {
    //         console.log(decoder.decode(stdout.buffer))
    //         console.log(decoder.decode(stderr.buffer))
    //     }
    // )
}

/*
[1/17]
C:\PROGRA~2\MICROS~3\2022\BUILDT~1\VC\Tools\MSVC\1434~1.319\bin\Hostx86\x86\cl.exe
/nologo
-DNO_FSEEKO
-DZLIB_DLL
-D_CRT_NONSTDC_NO_DEPRECATE
-D_CRT_SECURE_NO_DEPRECATE
-IC:\Project\npm-make\zlib
-IC:\Project\npm-make\zlib\cmake-build-debug
/DWIN32
/D_WINDOWS
/W3
/MDd
/Zi
/Ob0
/Od
/RTC1
/showIncludes
/FoCMakeFiles\zlib.dir\compress.obj
/FdCMakeFiles\zlib.dir\
/FS
-c
C:\Project\npm-make\zlib\compress.c

 */
