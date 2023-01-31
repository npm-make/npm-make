import Search from './core/search.js'

let t1 = Date.now()

let a = new Search()
await a.search('C:\\Project', '**/zlib/**/*.c')

let t2 = Date.now()

console.log(a)
console.log(t2 - t1)
