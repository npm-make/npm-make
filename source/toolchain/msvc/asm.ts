import BuildFeature from '../../project/buildFeature'
import Source from '../../project/source'
import Target from '../../project/target'
import msvc from './msvc'

export default class {
    static async build(buildFeature: BuildFeature, target: Target, source: Source) {
        let flagList = Array.from(source.optionList)
        switch (buildFeature.MACHINE) {
            case 'ARM':
            case 'ARM64': {
                if (source.includePathList.length > 0) {
                    flagList.push('-i')
                    flagList.push(source.includePathList.join(';'))
                }
                if (buildFeature.WINDOWS_ARM64_CALL_X64) {
                    flagList.push('-machine')
                    flagList.push('ARM64EC')
                }
                flagList.push('-nologo')
                //这些命令在末尾
                flagList.push(source.sourcePath)
                flagList.push(source.objectPrefix + '.obj')
                break
            }
            case 'X64':
            case 'X86': {
                for (let definition of source.definitionList) {
                    flagList.push('/D' + definition)
                }
                for (let includePath of source.includePathList) {
                    flagList.push('/I' + includePath)
                }
                flagList.push('/Fo' + source.objectPrefix + '.obj')
                flagList.push('/nologo')
                //这些命令在末尾
                flagList.push('/c')
                flagList.push(source.sourcePath)
                break
            }
        }
        return msvc.execute(buildFeature.OUTPUT_PATH, msvc.executeASM, ...flagList)
    }
}
