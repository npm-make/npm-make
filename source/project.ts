import ProjectFeature from './projectFeature'
import Target from './target'

export default class Project {
    dependencyProjectList: Project[]
    targetList: Target[]
    projectFeature: ProjectFeature
    projectFileList: string[]
    projectName: string
    projectPath: string
    projectStatus: 'WAIT' | 'SUCCESS'
}
