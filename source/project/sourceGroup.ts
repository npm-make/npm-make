// import regexTool from '../regexTool'
// import Source from './source'
//
// export default class SourceGroup {
//     compileOptionList: string[]
//     definitionList: string[]
//     projectFileList: string[]
//     projectPath: string
//     sourceList: Source[]
//     targetName: string
//
//     constructor(projectPath: string, projectFileList: string[], targetName: string) {
//         this.compileOptionList = []
//         this.definitionList = []
//         this.projectFileList = projectFileList
//         this.projectPath = projectPath
//         this.sourceList = []
//         this.targetName = targetName
//     }
//
//     addCompileOption(...optionList: string[]): SourceGroup {
//         this.compileOptionList.push(...optionList)
//         return this
//     }
//
//     addDefinition(...definitionList: string[]): SourceGroup {
//         this.definitionList.push(...definitionList)
//         return this
//     }
//
//     addSource(...inputList: string[]): SourceGroup {
//         for (const input of inputList) {
//             this.sourceList.push(new Source(this.projectPath, this.targetName, input))
//         }
//         return this
//     }
//
//     addSourcePattern(...patternList: string[]): SourceGroup {
//         for (const pattern of patternList) {
//             const regex = regexTool.path(pattern)
//             for (const projectFile of this.projectFileList) {
//                 if (regex.test(projectFile)) {
//                     this.sourceList.push(new Source(this.projectPath, this.targetName, projectFile))
//                 }
//             }
//         }
//         return this
//     }
// }
