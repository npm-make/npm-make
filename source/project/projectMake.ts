import BuildFeature from './buildFeature'
import Project from './project'

export default interface ProjectMake {
    generate(project: Project, projectFeature: object, buildFeature: BuildFeature): void | Promise<void>
}
