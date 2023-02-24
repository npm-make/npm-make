import path from 'node:path'
import fs from 'node:fs/promises'
import output from './output.mjs'
import msvc from '../toolchain/msvc/msvc.ts'

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
            let toolchainTarget = {}
            toolchainTarget.buildFeature = buildFeature
            toolchainTarget.buildSuccess = false
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
            for (let sourcePath of target.sourceList) {
                let extName = path.extname(sourcePath)
                let realPath = path.join(project.projectPath, sourcePath)
                let outputName = output.outputName(realPath)
                //build source
                let toolchainSource = {}
                toolchainSource.buildFeature = buildFeature
                toolchainSource.definitionList = target.definitionList
                toolchainSource.includePathList = []
                toolchainSource.objectPrefix = path.join(target.objectPath, outputName)
                toolchainSource.optionList = target.compileOptionList
                toolchainSource.outputPath = target.objectPath
                toolchainSource.sourcePath = realPath
                toolchainSource.targetFeature = target.featureMap
                for (let includeDirectory of target.includeDirectoryList) {
                    toolchainSource.includePathList.push(path.join(project.projectPath, includeDirectory))
                }
                switch (extName) {
                    case '.c':
                        toolchainSource.sourceType = 'C'
                        break
                    case '.cpp':
                        toolchainSource.sourceType = 'CXX'
                        break
                    case '.def':
                        toolchainSource.sourceType = 'DEF'
                        break
                    case '.manifest':
                        toolchainSource.sourceType = 'MANIFEST'
                        break
                    case '.rc':
                        toolchainSource.sourceType = 'RC'
                        break
                }
                toolchainTarget.sourceList.push(toolchainSource)
            }
            targetTaskList.push(msvc.build(toolchainTarget))
        }
        return Promise.all(targetTaskList)
    }
}
