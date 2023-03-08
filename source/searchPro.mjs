import fs from 'node:fs/promises'
import path from 'node:path'

export class Module {
    moduleName
    moduleVersion
    modulePath
}

export class ModuleLoader {
    moduleMap = new Map
    loadedPath = new Set


    async loadModuleDir(thisPath, loadingList) {
        const moduleDir = await fs.opendir(thisPath)
        for await (const moduleItem of moduleDir) {
            if (moduleItem.name.startsWith('@')) {
                const moduleDir2 = await fs.opendir(moduleDir.path + '/' + moduleItem.name)
                for await (const moduleItem2 of moduleDir2) {
                    loadingList.push(moduleDir2.path + '/' + moduleItem2.name)
                }
            } else {
                loadingList.push(moduleDir.path + '/' + moduleItem.name)
            }
        }
    }

    async loadPackage(modulePath, loadingList) {
        //
        const packageFile = await fs.readFile(modulePath + '/package.json')
        const packageJson = JSON.parse(packageFile.toString())

        //
        if (this.moduleMap.has(packageJson.name)) {
            return
        } else {
            const module = new Module()
            module.moduleName = packageJson.name
            module.moduleVersion = packageJson.version
            module.modulePath = modulePath
            this.moduleMap.set(packageJson.name, module)
        }

        //
        const realPath = await fs.realpath(modulePath)
        try {
            await this.loadModuleDir(realPath + '/node_modules', loadingList)
        } catch {
        }
        const t1 = path.dirname(realPath)
        const t2 = path.basename(t1)
        if (t2 === 'node_modules') {
            await this.loadModuleDir(t1, loadingList)
        } else if (t2.startsWith('@')) {
            const t3 = path.dirname(realPath)
            const t4 = path.basename(t3)
            if (t4 === 'node_modules') {
                await this.loadModuleDir(t3, loadingList)
            }
        }
    }

    async loadAll(loadingList) {
        const nextList = []
        for (const modulePath of loadingList) {
            try {
                await this.loadPackage(modulePath, nextList)
            } catch {
            }
        }
        if (nextList.length > 0) {
            await this.loadAll(nextList)
        }
    }
}

const a1 = new ModuleLoader()
await a1.loadAll(['C:\\Project\\demo1'])
const b = 0
