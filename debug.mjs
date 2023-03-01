import url from 'node:url'
import querystring from 'node:querystring'

console.log(url.parse('zlib shared win32Main'))
console.log(querystring.parse('name=' + ' zlib=3 SHARED WIN32_MAIN', ' '))
