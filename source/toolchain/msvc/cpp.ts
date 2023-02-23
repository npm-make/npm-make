import msvc from './msvc'
import ToolchainSource from '../source'

export default class {
    static async build(source: ToolchainSource) {
        let flagList = Array.from(source.optionList)
        if (source.buildFeature.DEBUG) {
            if (!source.buildFeature.DEBUG_WITHOUT_RTC) {
                flagList.push('/RTC1')
            }
            if (source.buildFeature.STATIC_RUNTIME) {
                flagList.push('/MTd')
            } else {
                flagList.push('/MDd')
            }
            flagList.push('/Od')
            flagList.push('/Zi')
        } else {
            if (source.buildFeature.RELEASE_MIN_SIZE) {
                flagList.push('/O1')
            } else {
                flagList.push('/O2')
            }
            if (source.buildFeature.RELEASE_WITH_DEBUG_INFO) {
                flagList.push('/Zi')
            }
            if (source.buildFeature.STATIC_RUNTIME) {
                flagList.push('/MT')
            } else {
                flagList.push('/MD')
            }
        }
        if (source.sourceType === 'CXX') {
            switch (source.targetFeature.STANDARD_CXX) {
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
            flagList.push('/Tp' + source.sourcePath)
        } else {
            switch (source.targetFeature.STANDARD_C) {
                case '11':
                    flagList.push('/std:c11')
                    break
                case '17':
                    flagList.push('/std:c17')
                    break
            }
            flagList.push('/Tc' + source.sourcePath)
        }
        for (let definition of source.definitionList) {
            flagList.push('/D' + definition)
        }
        for (let includePath of source.includePathList) {
            flagList.push('/I' + includePath)
        }
        flagList.push('/c')
        flagList.push('/Fd' + source.objectPrefix + '.pdb')
        flagList.push('/Fo' + source.objectPrefix + '.obj')
        flagList.push('/nologo')
        flagList.push('/utf-8')
        let result = await msvc.execute(source.outputPath, msvc.executeCL, ...flagList)
        source.sourceStatus = 'SUCCESS'
        return result
    }
}
