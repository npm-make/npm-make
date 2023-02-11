import process from 'node:process'
import loader from './loader.mjs'
import toolchain from '../toolchain/toolchain.mjs'
import projectTask from './projectTask.mjs'
import path from 'node:path'

export default class Self {
    static async build(beforeMethod, afterMethod) {
        let cwd = process.cwd()
        let outputPath = path.join(cwd, 'npm_make', 'Debug')
        let project = await loader.loadProject(cwd, afterMethod)
        await toolchain.initToolchain('x64')
        let taskTree = await projectTask.generateTaskTree(project, outputPath)
        await taskTree.runTask()
    }

    static async help() {
    }
}
