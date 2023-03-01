import crypto from 'node:crypto'

console.log(crypto.createHash('md5').update('ysss--1e+9').digest('base64'))
console.log(crypto.createHash('sha1').update('rsss-d-+9').digest('base64url'))
