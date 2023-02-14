import path from 'node:path'
import fs from 'node:fs/promises'
import output from './output.mjs'
import Task from './task.mjs'
import Source from '../toolchain/source.mjs'
import Artifact from '../toolchain/artifact.mjs'
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
            //build artifact
            let artifact = new Artifact
            artifact.buildFeature = buildFeature
            artifact.libraryList = target.libraryList
            artifact.libraryPathList = []
            artifact.optionList = target.linkOptionList
            artifact.outputPath = outputPath
            artifact.sourceList = []
            artifact.targetFeature = target.featureMap
            artifact.targetPrefix = target.objectPath
            artifact.targetType = 'SHARED'
            for (let linkDirectory of target.linkDirectoryList) {
                artifact.libraryPathList.push(path.join(project.projectPath, linkDirectory))
            }
            //for each source
            let sourceTaskList = []
            for (let sourcePath of target.sourceList) {
                let extName = path.extname(sourcePath)
                let realPath = path.join(project.projectPath, sourcePath)
                let outputName = output.outputName(realPath)
                //build source
                let sourceObj = new Source
                artifact.sourceList.push(sourceObj)
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
                let result = await link.link(artifact)
                console.log(result.stdout, result.stderr)
            }, sourceTaskList))
        }
        return new Task(null, targetTaskList)
    }
}
