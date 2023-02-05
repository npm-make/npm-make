// import loader from './core/loader.mjs'
//
// let ret = await loader.loadProject('C:\\Project\\npm-make\\zlib', [])
//
// console.log(ret)

import searchTool from './core/search.mjs'
import Target from './core/target.mjs'
import path from 'node:path'
import cpp from './toolchain/msvc/cpp.mjs'
import detect from './system/windows/msvc.mjs'
import outputTool from './core/output.mjs'
import child_process from 'node:child_process'
import language from './core/language.mjs'

let projectFileList = []
await searchTool.searchDir(projectFileList, 'C:\\Project\\npm-make\\zlib', '')

let target = new Target()
target.addSources('\\w+\\.c')
target.__afterSearch(projectFileList)
target.addFeatures('DEBUG')
target.targetName = 'zlib'

let taskList = []
let globalFlags = []
cpp.compileFlag(globalFlags, target.featureMap)
globalFlags.push('-DNO_FSEEKO')
globalFlags.push('-DZLIB_DLL')
globalFlags.push('-D_CRT_NONSTDC_NO_DEPRECATE')
globalFlags.push('-D_CRT_SECURE_NO_DEPRECATE')

for (let temp of target.sourceList) {
    let temp2 = path.join('C:\\Project\\npm-make\\zlib', temp)
    taskList.push({ absolutePath: temp2, flags: Array.from(globalFlags) })
}

for (let task of taskList) {
    task.outputName = outputTool.outputName(task.absolutePath)
    cpp.compileC(task.flags, task.absolutePath, task.outputName, target.targetName)
}

let env = {}
await detect.detect(env)
language.setEncoding('gbk')

for (let task of taskList) {
    child_process.execFile(
        env.MSVC_CL,
        task.flags,
        {
            cwd: 'C:\\Users\\name\\Downloads',
            env: {
                INCLUDE: env.MSVC_INCLUDE.join(';')
            },
            encoding: 'buffer'
        },
        (error, stdout, stderr) => {
            if (error) {
                console.log(language.decode(stderr))
            } else {
                console.log(language.decode(stdout))
            }
        }
    )
}
