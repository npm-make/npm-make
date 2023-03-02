import BuilderFeature from './builderFeature'
import Project from './project'

export default interface ProjectModule {
    generate(project: Project, globalFeature: object, builderFeature: BuilderFeature): void | Promise<void>
}
