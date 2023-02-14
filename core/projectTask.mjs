import path from 'node:path'
import fs from 'node:fs/promises'
import output from './output.mjs'
import Task from './task.mjs'
import Source from '../toolchain/source.mjs'
import Target from '../toolchain/target.mjs'
import cpp from '../toolchain/msvc/cpp.mjs'
import link from '../toolchain/msvc/link.mjs'

export default class {
    /**
     * @param {core.Project} project
     * @param outputPath
     */
    static async generateTaskTree(project, outputPath) {
        let buildFeature = new Map([['DEBUG', '']])
        let targetTaskList = []
        for (let target of project.targetList) {
            target.objectPath = path.join(outputPath, target.targetName)
            await fs.mkdir(target.objectPath, { recursive: true })
            //build toolchainTarget
            let toolchainTarget = new Target
            toolchainTarget.buildFeature = buildFeature
            toolchainTarget.libraryList = target.libraryList
            toolchainTarget.libraryPathList = []
            toolchainTarget.optionList = target.linkOptionList
            toolchainTarget.outputPath = outputPath
            toolchainTarget.sourceList = []
            toolchainTarget.targetFeature = target.featureMap
            toolchainTarget.targetPrefix = target.objectPath
            toolchainTarget.targetType = 'SHARED'
            for (let linkDirectory of target.linkDirectoryList) {
                toolchainTarget.libraryPathList.push(path.join(project.projectPath, linkDirectory))
            }
            //for each source
            let sourceTaskList = []
            for (let sourcePath of target.sourceList) {
                let extName = path.extname(sourcePath)
                let realPath = path.join(project.projectPath, sourcePath)
                let outputName = output.outputName(realPath)
                //build source
                let sourceObj = new Source
                toolchainTarget.sourceList.push(sourceObj)
                sourceObj.buildFeature = buildFeature
                sourceObj.definitionList = target.definitionList
                sourceObj.includePathList = []
                sourceObj.objectPrefix = path.join(target.objectPath, outputName)
                sourceObj.optionList = target.compileOptionList
                sourceObj.outputPath = target.objectPath
                sourceObj.sourcePath = realPath
                sourceObj.targetFeature = target.featureMap
                for (let includeDirectory of target.includeDirectoryList) {
                    sourceObj.includePathList.push(path.join(project.projectPath, includeDirectory))
                }
                switch (extName) {
                    case '.c':
                        sourceObj.sourceType = 'C'
                        break
                    case '.cpp':
                        sourceObj.sourceType = 'CXX'
                        break
                    case '.def':
                        sourceObj.sourceType = 'DEF'
                        continue
                }
                sourceTaskList.push(new Task(async () => {
                    let result = await cpp.compile(sourceObj)
                    console.log(result.stdout, result.stderr)
                }))
            }
            targetTaskList.push(new Task(async () => {
                let result = await link.link(toolchainTarget)
                console.log(result.stdout, result.stderr)
            }, sourceTaskList))
        }
        return new Task(null, targetTaskList)
    }
}
