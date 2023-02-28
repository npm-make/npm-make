import BuilderFeature from './builderFeature'
import Project from './project'
import Target from './target'

export default class Builder {
    builderFeature: BuilderFeature
    projectMap: Map<string, Project>
    targetMap: Map<string, Target>

    constructor(builderFeature: BuilderFeature) {
        this.builderFeature = builderFeature
        this.projectMap = new Map()
        this.targetMap = new Map()
    }

    async addProject(projectName: string, projectPath: string) {
        return Project.new(this, projectName, projectPath)
    }
}
