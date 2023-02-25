import ToolchainSource from '../../project/toolchainSource'
import msvc from './msvc'

export default class {
    static async build(source: ToolchainSource) {
        let flagList = Array.from(source.optionList)
        if (source.buildFeature.MACHINE === 'X86' || source.buildFeature.MACHINE === 'X64') {
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
        } else if (source.buildFeature.MACHINE === 'ARM' || source.buildFeature.MACHINE === 'ARM64') {
            if (source.includePathList.length > 0) {
                flagList.push('-i')
                flagList.push(source.includePathList.join(';'))
            }
            if (source.buildFeature.WINDOWS_ARM64_CALL_X64) {
                flagList.push('-machine')
                flagList.push('ARM64EC')
            }
            flagList.push('-nologo')
            //这些命令在末尾
            flagList.push(source.sourcePath)
            flagList.push(source.objectPrefix + '.obj')
        }
        let result = await msvc.execute(source.outputPath, msvc.executeASM, ...flagList)
        source.sourceStatus = 'SUCCESS'
        return result
    }
}
