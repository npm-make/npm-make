// import url from 'node:url'
// import searchTool from '../searchTool'
// import BuilderFeature from './builderFeature'
// import Project from './project'
// import Target from './target'
//
// export default class Builder {
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
