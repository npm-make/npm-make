import loader from './core/loader.mjs'

let ret = await loader.loadProject('C:\\Project\\npm-make\\zlib', [])

console.log(ret)
