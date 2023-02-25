import Target from './target'
import ProjectMake from './projectMake'

export default class Project {
    dependencyProjectList: Project[]
    projectFeature: object
    projectFileList: string[]
    projectMake: ProjectMake
    projectName: string
    projectPath: string
    projectStatus: 'WAIT' | 'SUCCESS'
    targetList: Target[]
}
