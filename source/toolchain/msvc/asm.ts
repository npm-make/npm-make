import BuilderFeature from '../../project/builderFeature'
import Source from '../../project/source'
import Target from '../../project/target'
import msvc from './msvc'

export default class {
    static async build(builderFeature: BuilderFeature, target: Target, source: Source) {
        const flagList = Array.from(source.compileOptionList)
        switch (builderFeature.MACHINE) {
            case 'ARM':
            case 'ARM64': {
                if (builderFeature.WINDOWS_ARM64_CALL_X64) {
                    flagList.push('-machine')
                    flagList.push('ARM64EC')
                }
                if (target.includePathList.length > 0) {
                    flagList.push('-i')
                    flagList.push(target.includePathList.join(';'))
                }
                flagList.push('-nologo')
                //这些命令在末尾
                flagList.push(source.sourcePath)
                flagList.push(source.objectPrefix + '.obj')
                break
            }
            case 'X64':
            case 'X86': {
                for (const includePath of target.includePathList) {
                    flagList.push('/I' + includePath)
                }
                for (const definition of source.definitionList) {
                    flagList.push('/D' + definition)
                }
                flagList.push('/Fo' + source.objectPrefix + '.obj')
                flagList.push('/nologo')
                //这些命令在末尾
                flagList.push('/c')
                flagList.push(source.sourcePath)
                break
            }
        }
        return msvc.execute(builderFeature.OUTPUT_PATH, msvc.executeASM, ...flagList)
    }
}
