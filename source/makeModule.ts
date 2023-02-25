import BuildFeature from './buildFeature'
import Project from './project'
import ProjectFeature from './projectFeature'

export default interface MakeModule {
    generate(project: Project, projectFeature: ProjectFeature, buildFeature: BuildFeature): void | Promise<void>
}
