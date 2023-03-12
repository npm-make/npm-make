import { Builder } from './builder.mjs'
import { Target } from './target.mjs'

export interface ProjectModule {
    generate(builder: Builder, project: Project, config: object): void | Promise<void>
}

export class Project {
    OUTPUT_PATH: string
    PROJECT_NAME: string
    PROJECT_PATH: string
    PROJECT_VERSION: string
    _PROJECT_FILE_LIST: string[]
    _PROJECT_MODULE: ProjectModule
    _TARGET_LIST: Target[]

    constructor() {
        this._PROJECT_FILE_LIST = []
        this._TARGET_LIST = []
    }

    createTarget(targetName: string, options?: object): Target {
        const target = new Target(this.OUTPUT_PATH, this.PROJECT_PATH, targetName)
        this._TARGET_LIST.push(target)
        return Object.assign(target, options)
    }
}
