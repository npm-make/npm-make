import child_process from 'node:child_process'
import process from 'node:process'
import loader from './loader.mjs'
import toolchain from '../toolchain/toolchain.mjs'
import projectTask from './projectTask.mjs'

export default class Self {
    static {
        if (process.platform === 'win32') {
            child_process.execSync('chcp 65001')
        }
    }

    static async build(beforeMethod, afterMethod) {
        let project = await loader.loadProject(process.cwd(), afterMethod)
        await toolchain.initToolchain('x64')
        let taskTree = await projectTask.generateTaskTree(project)
        await taskTree.runTask()
    }

    static async help() {
    }
}
