// import fs from 'node:fs/promises'
//
// export default class Self {
//     static #ignoreDir = /^node_modules$|^npm_make$|^\./i
//
//     static async searchProject(outputList: string[], basePath: string, thisPath: string): Promise<void> {
//         const directory = await fs.opendir(basePath + thisPath)
//         for await (const item of directory) {
//             if (item.isDirectory()) {
//                 if (!this.#ignoreDir.test(item.name)) {
//                     await this.searchProject(outputList, basePath, thisPath + '/' + item.name)
//                 }
//             } else {
//                 outputList.push(thisPath + '/' + item.name)
//             }
//         }
//     }
//
//     static async searchPackage(output: Map<string, string>, thisPath: string): Promise<void> {
//         const directory = await fs.opendir(thisPath)
//         for await (const item of directory) {
//             if (item.isDirectory()) {
//                 const link = await fs.stat(directory.path + '/' + item.name)
//                 console.log(link)
//                 // if (item.) {
//                 // } else {
//                 //     output.set(item.name, thisPath + '/' + item.name)
//                 // }
//             }
//         }
//     }
// }
//
// let a = new Map
// await Self.searchPackage(a, 'C:\\Project\\demo1')
// console.log(a)
//
