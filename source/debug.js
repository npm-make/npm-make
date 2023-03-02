import fs from 'node:fs/promises'

async function searchPackage(output, thisPath) {
    const directory = await fs.opendir(thisPath)
    for await (const item of directory) {
        if (item.isDirectory()) {
            await searchPackage(output, directory.path + '/' + item.name)
        } else if (item.isFile()) {
            if (item.name === 'package.json') {
                output.push(directory.path)
            }
        }
    }
}


let a = []
await searchPackage(a, 'C:\\Project\\demo1')
console.log(a)

