import executeTool from '../../core/executeTool.mjs'
import msvc from '../windows/msvc.mjs'
import sdk from '../windows/sdk.mjs'

export default class {
    /**
     * @param {toolchain.Source} source
     */
    static async compile(source) {
        let flagList = Array.from(source.optionList)
        if (source.buildFeature.has('DEBUG')) {
            if (!source.buildFeature.has('DEBUG_WITHOUT_RTC')) {
                flagList.push('/RTC1')
            }
            if (source.buildFeature.has('STATIC_RUNTIME')) {
                flagList.push('/MTd')
            } else {
                flagList.push('/MDd')
            }
            flagList.push('/Od')
            flagList.push('/Zi')
        } else {
            if (source.buildFeature.has('RELEASE_MIN_SIZE')) {
                flagList.push('/O1')
            } else {
                flagList.push('/O2')
            }
            if (source.buildFeature.has('RELEASE_WITH_DEBUG_INFO')) {
                flagList.push('/Zi')
            }
            if (source.buildFeature.has('STATIC_RUNTIME')) {
                flagList.push('/MT')
            } else {
                flagList.push('/MD')
            }
        }
        if (source.sourceType === 'CXX') {
            flagList.push('/Tp' + source.sourcePath)
            switch (source.targetFeature.get('STANDARD_CXX')) {
                case '14':
                    flagList.push('/std:c++14')
                    break
                case '17':
                    flagList.push('/std:c++17')
                    break
                case '20':
                    flagList.push('/std:c++20')
                    break
                case '23':
                case 'latest':
                    flagList.push('/std:c++latest')
                    break
            }
        } else {
            flagList.push('/Tc' + source.sourcePath)
            switch (source.targetFeature.get('STANDARD_C')) {
                case '11':
                    flagList.push('/std:c11')
                    break
                case '17':
                    flagList.push('/std:c17')
                    break
            }
        }
        for (let definition of source.definitionList) {
            flagList.push('/D' + definition)
        }
        for (let includePath of source.includePathList) {
            flagList.push('/I' + includePath)
        }
        for (let includePath of msvc.includePathList) {
            flagList.push('/I' + includePath)
        }
        for (let includePath of sdk.includePathList) {
            flagList.push('/I' + includePath)
        }
        flagList.push('/c')
        flagList.push('/Fd' + source.objectPrefix + '.pdb')
        flagList.push('/Fo' + source.objectPrefix + '.obj')
        flagList.push('/FS')
        flagList.push('/nologo')
        flagList.push('/utf-8')
        return executeTool.execute(source.outputPath, msvc.executeCL, ...flagList)
    }
}
