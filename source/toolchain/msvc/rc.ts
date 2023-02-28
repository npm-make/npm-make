import BuilderFeature from '../../project/builderFeature'
import Source from '../../project/source'
import Target from '../../project/target'
import msvc from './msvc'

export default class {
    static async build(builderFeature: BuilderFeature, target: Target, source: Source) {
        let flagList = Array.from(source.optionList)
        for (let definition of source.definitionList) {
            flagList.push('/d' + definition)
        }
        for (let includePath of source.includePathList) {
            flagList.push('/i' + includePath)
        }
        flagList.push('/fo' + source.objectPrefix + '.res')
        flagList.push('/nologo')
        //这些命令在末尾
        flagList.push(source.sourcePath)
        return msvc.execute(builderFeature.OUTPUT_PATH, msvc.executeRC, ...flagList)
    }
}
