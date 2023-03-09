// import ProjectModule from './projectModule'
// import Target from './target'
// import TargetFeature from './targetFeature'
// import * as fs from 'node:fs/promises'

export class Project {
    NAME: string
    VERSION: string

    // dependencyList: string[]
    // packageList: string[]
    //projectFileList: string[]
    // projectModule: ProjectModule
    // projectName: string
    //projectPath: string
    // targetList: Target[]
    //
    // constructor(projectName: string, packageList: string[]) {
    //     this.dependencyList = []
    //     this.packageList = packageList
    //     this.projectFileList = []
    //     this.projectName = projectName
    //     this.targetList = []
    // }
    //
    // addTarget(targetName: string, targetFeature?: TargetFeature): Target {
    //     const target = new Target(this.projectPath, this.projectFileList, targetName, targetFeature)
    //     this.targetList.push(target)
    //     return target
    // }
    //
    // hasProject(projectName: string): boolean {
    //     return this.packageList.includes(projectName)
    // }
    //
    // useProject(projectName: string): void {
    //     this.dependencyList.push(projectName)
    // }
}

//
// export class ProjectExplorer {
//
// }
//
// async function searchNodeModules(result, nodeModulesPath) {
//     const nodeDir = await fs.opendir(nodeModulesPath)
//     for await (const nodeItem of nodeDir) {
//         if (nodeItem.isDirectory()) {
//             try {
//                 const packageData = await fs.readFile(nodeDir.path + '/' + nodeItem.name + '/package.json', {encoding: 'utf-8'})
//                 const packageObj = JSON.parse(packageData)
//                 if (!result[packageObj.name]) {
//                     result[packageObj.name] = {}
//                 }
//                 if (!result[packageObj.name][packageObj.version]) {
//                     result[packageObj.name][packageObj.version] = {}
//                     result[packageObj.name][packageObj.version].path = nodeDir.path + '/' + nodeItem.name
//                     const fileList = []
//                     await searchPackage(result, fileList, nodeDir.path + '/' + nodeItem.name, '')
//                     result[packageObj.name][packageObj.version].files = fileList
//                 }
//             } catch {
//                 await searchNodeModules(result, nodeDir.path + '/' + nodeItem.name)
//             }
//         }
//     }
// }
//
// async function searchProject(explorer: ProjectExplorer, project: Project, thisPath: string) {
//     const thisDir = await fs.opendir(project.projectPath + thisPath)
//     for await (const thisItem of thisDir) {
//         if (!thisItem.name.startsWith('.')) {
//             if (thisItem.isDirectory()) {
//                 if (thisItem.name === 'node_modules') {
//
//                 } else {
//                     await searchProject(explorer, project, thisPath + '/' + thisItem.name)
//                 }
//             } else {
//                 project.projectFileList.push(thisPath + '/' + thisItem.name)
//             }
//         }
//     }
// }
//
//
// console.time('pnpm')
// const result1 = {}
// await searchNodeModules(result1, 'C:\\Project\\demo1\\node_modules')
// await fs.writeFile('C:\\Users\\name\\Downloads\\1.json', JSON.stringify(result1, null, 2))
// console.timeEnd('pnpm')
