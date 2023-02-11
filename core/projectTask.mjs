import path from 'node:path'
import fs from 'node:fs/promises'
import cpp from '../toolchain/msvc/cpp.mjs'
import link from '../toolchain/msvc/link.mjs'
import output from './output.mjs'
import msvc from '../toolchain/windows/msvc.mjs'
import sdk from '../toolchain/windows/sdk.mjs'
import Task from './task.mjs'
import executeTool from './executeTool.mjs'

export default class {
    /**
     * @param {core.Project} project
     * @param outputPath
     */
    static async generateTaskTree(project, outputPath) {
        let targetTaskList = []
        for (let target of project.targetList) {
            target.objectPath = path.join(outputPath, target.targetName)
            await fs.mkdir(target.objectPath, { recursive: true })
            let targetPrefix = path.join(outputPath, target.targetName)
            let sourceTaskList = []
            let linkFlag = []
            for (let sourcePath of target.sourceList) {
                let extName = path.extname(sourcePath)
                let realPath = path.join(project.projectPath, sourcePath)
                let outputName = output.outputName(realPath)
                let objectPrefix = path.join(target.objectPath, outputName)
                let compileFlag = []
                cpp.inputFeature(compileFlag, target.featureMap)
                cpp.inputDefinition(compileFlag, target.definitionMap)
                cpp.inputOption(compileFlag, target.compileOptionList)
                if (extName === '.c') {
                    cpp.inputSourceC(compileFlag, realPath)
                }
                if (extName === '.cpp') {
                    cpp.inputSourceCXX(compileFlag, realPath)
                }
                if (extName === '.def') {
                    link.inputDef(linkFlag, realPath)
                    continue
                }
                cpp.outputObject(compileFlag, objectPrefix)
                cpp.outputDebug(compileFlag, targetPrefix)
                cpp.inputInclude(compileFlag, target.includeDirectoryList)
                cpp.inputInclude(compileFlag, msvc.selected.includeList)
                cpp.inputInclude(compileFlag, sdk.selected.includeList)
                sourceTaskList.push(new Task(async () => {
                    let result = await executeTool.execute(outputPath, msvc.selected.executeCL, ...compileFlag)
                    console.log(result.stdout, result.stderr)
                }))
                link.inputObject(linkFlag, objectPrefix)
            }
            link.inputFeature(linkFlag, target.featureMap)
            link.outputTarget(linkFlag, target.featureMap, targetPrefix)
            link.inputSearch(linkFlag, msvc.selected.libraryList)
            link.inputSearch(linkFlag, sdk.selected.libraryList)
            link.inputLibrary(linkFlag, sdk.defaultLink)
            link.inputLibrary(linkFlag, target.libraryList)
            targetTaskList.push(new Task(async () => {
                let result = await executeTool.execute(outputPath, msvc.selected.executeLINK, ...linkFlag)
                console.log(result.stdout, result.stderr)
            }, sourceTaskList))
        }
        return new Task(null, targetTaskList)
    }
}
