// import url from 'node:url'
// import searchTool from '../searchTool'
// import BuilderFeature from './builderFeature'
// import Project from './project'
// import Target from './target'
//
export class Builder {
    CLANG_VERSION: string
    DEBUG: boolean
    DEBUG_WITHOUT_RTC: boolean
    GCC_VERSION: string
    MACHINE: 'ARM' | 'ARM64' | 'X64' | 'X86'
    MSVC_STATIC_RUNTIME: boolean
    MSVC_VERSION: string
    PLATFORM: 'DARWIN' | 'LINUX' | 'WINDOWS'
    RELEASE_WITH_DEBUG_INFO: boolean
    RELEASE_MIN_SIZE: boolean
    TOOLCHAIN: 'CLANG' | 'GCC' | 'MSVC'


//     builderFeature: BuilderFeature
//     projectMap: Map<string, Project>
//     targetMap: Map<string, Target>
//
//     constructor(builderFeature: BuilderFeature) {
//         this.builderFeature = builderFeature
//         this.projectMap = new Map()
//         this.targetMap = new Map()
//     }
//
//     // async loadProject(project: Project, projectPath: string) {
//     //     const moduleImport = await import(url.pathToFileURL(projectPath + '/make.mjs').href)
//     //     project.projectPath = projectPath
//     //     project.projectModule = moduleImport.default
//     //     await searchTool.search(project.projectFileList, projectPath, '')
//     //
//     //     return project.projectModule.generate(project, project.projectFeature, this.builderFeature)
//     // }
// }
//
// import { MachineType, PlatformType, ToolchainType } from '../type'
//
// export interface BuilderFeature {
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
