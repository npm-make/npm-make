import msvc from './msvc'
import BuildFeature from '../../project/buildFeature'
import Source from '../../project/source'
import Target from '../../project/target'

export default class {
    static async build(buildFeature: BuildFeature, target: Target, source: Source) {
        let flagList = Array.from(source.optionList)
        for (let definition of source.definitionList) {
            flagList.push('/d' + definition)
        }
        for (let definition of target.definitionList) {
            flagList.push('/d' + definition)
        }
        for (let includePath of source.includePathList) {
            flagList.push('/i' + includePath)
        }
        for (let includePath of target.includePathList) {
            flagList.push('/i' + includePath)
        }
        flagList.push('/fo' + source.objectPrefix + '.res')
        flagList.push('/nologo')
        //这些命令在末尾
        flagList.push(source.sourcePath)
        let result = await msvc.execute(source.outputPath, msvc.executeRC, ...flagList)
        source.sourceStatus = 'SUCCESS'
        return result
    }
}
