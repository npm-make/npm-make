// import child_process from 'node:child_process'
// import querystring from 'node:querystring'
//
// child_process.execSync('chcp 65001')
//
//
// //初始化环境
// const a1 = child_process.execFileSync('echo set | "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Visual Studio 2022\\Visual Studio Tools\\VC\\x64 Native Tools Command Prompt for VS 2022.lnk"',
//     { shell: true })
// const a2 = a1.toString('utf8')
// const a3 = querystring.parse(a2, '\r\n')
// console.log(a3)
// console.log('includePath=' + a3.INCLUDE)
// console.log('libraryPath=' + a3.LIB)
// console.log('executePath=' + a3.Path)
// console.log('toolchainType=MSVC')
// console.log('machineType=' + a3.VSCMD_ARG_TGT_ARCH)
//
// //查找cl
// const c1 = child_process.execSync('where cl', { env: { PATH: String(a3.Path) }, encoding: 'utf8' })
// console.log(c1)
// const c2 = child_process.execFileSync(c1.trim(), { env: { PATH: String(a3.Path) }, encoding: 'utf8' })
// console.log(c2)
//
