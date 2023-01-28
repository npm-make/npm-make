import search from './common/search.js'

try {
    let a1 = await search.search('C:\\Project', '**/zlib/**/*.c')
    console.log(a1)

} catch (e) {
    console.log(e)
}
