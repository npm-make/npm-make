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
