import msvc from './msvc'
import Source from '../../project/source'

export default class {
    static async build(source: Source) {
        let flagList = Array.from(source.optionList)
        for (let definition of source.definitionList) {
            flagList.push('/D' + definition)
        }
        for (let includePath of source.includePathList) {
            flagList.push('/I' + includePath)
        }
        flagList.push('/Fo' + source.objectPrefix + '.res')
        flagList.push('/nologo')
        //这些命令在末尾
        flagList.push(source.sourcePath)
        let result = await msvc.execute(source.outputPath, msvc.executeRC, ...flagList)
        source.sourceStatus = 'SUCCESS'
        return result
    }
}
