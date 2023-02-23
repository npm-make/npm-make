import msvc from './msvc'
import ToolchainSource from '../source'

export default class {
    static async build(source: ToolchainSource) {
        let flagList = Array.from(source.optionList)
        for (let definition of source.definitionList) {
            flagList.push('/D' + definition)
        }
        for (let includePath of source.includePathList) {
            flagList.push('/I' + includePath)
        }
        flagList.push('/Fo' + source.objectPrefix + '.res')
        flagList.push('/nologo')
        flagList.push(source.sourcePath)
        let result = await msvc.execute(source.outputPath, msvc.executeRC, ...flagList)
        source.sourceStatus = 'SUCCESS'
        return result
    }
}
