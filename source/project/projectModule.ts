import BuilderFeature from './builderFeature'
import Project from './project'

export default interface ProjectModule {
    generate(project: Project, projectFeature: object, builderFeature: BuilderFeature): void | Promise<void>
}
