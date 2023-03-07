import fs from 'node:fs/promises'

async function searchNodeModules(result, nodeModulesPath) {
    const nodeDir = await fs.opendir(nodeModulesPath)
    for await (const nodeItem of nodeDir) {
        if (nodeItem.isDirectory()) {
            try {
                const packageData = await fs.readFile(nodeDir.path + '/' + nodeItem.name + '/package.json', { encoding: 'utf-8' })
                const packageObj = JSON.parse(packageData)
                if (!result[packageObj.name]) {
                    result[packageObj.name] = {}
                }
                if (!result[packageObj.name][packageObj.version]) {
                    result[packageObj.name][packageObj.version] = {}
                    result[packageObj.name][packageObj.version].path = nodeDir.path + '/' + nodeItem.name
                    const fileList = []
                    await searchPackage(result, fileList, nodeDir.path + '/' + nodeItem.name, '')
                    result[packageObj.name][packageObj.version].files = fileList
                }
            } catch {
                await searchNodeModules(result, nodeDir.path + '/' + nodeItem.name)
            }
        }
    }
}

async function searchPackage(result, fileList, packagePath, last) {
    const pckDir = await fs.opendir(packagePath + last)
    for await (const pckItem of pckDir) {
        if (pckItem.isDirectory()) {
            if (pckItem.name === 'node_modules') {
                await searchNodeModules(result, pckDir.path + '/' + pckItem.name)
            } else {
                await searchPackage(result, fileList, packagePath, last + '/' + pckItem.name)
            }
        } else {
            fileList.push(last + '/' + pckItem.name)
        }
    }
}


console.time('pnpm')
const result1 = {}
await searchNodeModules(result1, 'C:\\Project\\demo1\\node_modules')
await fs.writeFile('C:\\Users\\name\\Downloads\\1.json', JSON.stringify(result1, null, 2))
console.timeEnd('pnpm')
