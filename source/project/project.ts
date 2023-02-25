import Target from './target'
import ProjectMake from './projectMake'

export default class Project {
    projectFeature: object
    projectFileList: string[]
    projectMake: ProjectMake
    projectName: string
    projectPath: string
    targetList: Target[]
}
