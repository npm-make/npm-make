import crypto from 'node:crypto'

console.time('md5')

let ret = []

for (let i = 0; i < 100000; i++) {
    let hash = crypto.createHash('md5')
    hash.update('啊哈哈哈哈')
    ret.push(hash.digest('hex'))

}


console.timeEnd('md5')
console.log(ret.length)
