import Target from './target'

export default class Project {
    dependencyProjectList: Project[]
    targetList: Target[]
    projectFeature: any
    projectFileList: string[]
    projectName: string
    projectPath: string
    projectStatus: 'WAIT' | 'SUCCESS'
}
// import Target from './target.ts'
//
// /**
//  * @namespace core
//  */
// export default class Project {
//     featureMap = new Map
//     /**
//      * @type {core.Target[]}
//      */
//     targetList = []
//     projectFileList = []
//     projectPath
//
//     addTarget(targetName, ...featureList) {
//         let target = new Target
//         target.targetName = targetName
//         target.addFeature(...featureList)
//         this.targetList.push(target)
//         return target
//     }
// }
