// import url from 'node:url'
// import searchTool from '../searchTool'
// import BuilderFeature from './builderFeature'
// import Project from './project'
// import Target from './target'
//
export class Builder {
    //通用
    DEBUG: boolean
    DEBUG_WITHOUT_RTC: boolean
    MACHINE: 'ARM' | 'ARM64' | 'X64' | 'X86'
    PLATFORM: 'DARWIN' | 'LINUX' | 'WINDOWS'
    RELEASE_WITH_DEBUG_INFO: boolean
    RELEASE_MIN_SIZE: boolean
    TOOLCHAIN: 'CLANG' | 'GCC' | 'MSVC'
    //clang
    CLANG_VERSION: string
    //gcc
    GCC_VERSION: string
    //msvc
    MSVC_ARM64_EC: boolean
    MSVC_STATIC_RUNTIME: boolean
    MSVC_VERSION: string


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
