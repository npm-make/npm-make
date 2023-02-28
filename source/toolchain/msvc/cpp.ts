import BuilderFeature from '../../project/builderFeature'
import Source from '../../project/source'
import Target from '../../project/target'
import msvc from './msvc'

export default class {
    static async build(builderFeature: BuilderFeature, target: Target, source: Source) {
        const flagList = Array.from(source.optionList)
        if (builderFeature.DEBUG) {
            if (!builderFeature.DEBUG_WITHOUT_RTC) {
                flagList.push('/RTC1')
            }
            if (builderFeature.STATIC_RUNTIME) {
                flagList.push('/MTd')
            } else {
                flagList.push('/MDd')
            }
            flagList.push('/Od')
            flagList.push('/Zi')
        } else {
            if (builderFeature.RELEASE_MIN_SIZE) {
                flagList.push('/O1')
            } else {
                flagList.push('/O2')
            }
            if (builderFeature.RELEASE_WITH_DEBUG_INFO) {
                flagList.push('/Zi')
            }
            if (builderFeature.STATIC_RUNTIME) {
                flagList.push('/MT')
            } else {
                flagList.push('/MD')
            }
        }
        if (source.sourceType === 'CXX') {
            switch (target.targetFeature.STANDARD_CXX) {
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
            switch (target.targetFeature.STANDARD_C) {
                case '11':
                    flagList.push('/std:c11')
                    break
                case '17':
                    flagList.push('/std:c17')
                    break
            }
            flagList.push('/Tc' + source.sourcePath)
        }
        for (const definition of source.definitionList) {
            flagList.push('/D' + definition)
        }
        for (const includePath of source.includePathList) {
            flagList.push('/I' + includePath)
        }
        flagList.push('/c')
        flagList.push('/Fd' + source.objectPrefix + '.pdb')
        flagList.push('/Fo' + source.objectPrefix + '.obj')
        flagList.push('/nologo')
        flagList.push('/utf-8')
        return msvc.execute(builderFeature.OUTPUT_PATH, msvc.executeCL, ...flagList)
    }
}
