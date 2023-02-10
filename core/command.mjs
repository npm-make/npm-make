import process from 'node:process'
import loader from './loader.mjs'
import toolchain from '../toolchain/toolchain.mjs'
import projectTask from './projectTask.mjs'

export default class Self {
    static async build(beforeMethod, afterMethod) {
        let project = await loader.loadProject(process.cwd(), afterMethod)
        await toolchain.initToolchain('x64')
        let taskTree = await projectTask.generateTaskTree(project)
        await taskTree.runTask()
    }

    static async help() {
    }
}
