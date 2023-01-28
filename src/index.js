import search from './common/search.js'

let a1 = await search.search('C:\\Project', '**/zlib/**/*.c')
let a2 = await search.search('C:\\Project', '**/*.c')
console.log(a1)
console.log(a2)
