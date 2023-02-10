export default class {
    static inputFeature(output, featureMap) {
        if (featureMap.has('DEBUG')) {
            if (!featureMap.has('DEBUG_WITHOUT_RTC')) {
                output.push('/RTC1')
            }
            if (featureMap.has('STATIC_RUNTIME')) {
                output.push('/MTd')
            } else {
                output.push('/MDd')
            }
            output.push('/Od')
            output.push('/Zi')
        } else {
            if (featureMap.has('RELEASE_MIN_SIZE')) {
                output.push('/O1')
            } else {
                output.push('/O2')
            }
            if (featureMap.has('RELEASE_WITH_DEBUG_INFO')) {
                output.push('/Zi')
            }
            if (featureMap.has('STATIC_RUNTIME')) {
                output.push('/MT')
            } else {
                output.push('/MD')
            }
        }
        switch (featureMap.get('STANDARD_C')) {
            case '11':
                output.push('/std:c11')
                break
            case '17':
                output.push('/std:c17')
                break
        }
        switch (featureMap.get('STANDARD_CXX')) {
            case '14':
                output.push('/std:c++14')
                break
            case '17':
                output.push('/std:c++17')
                break
            case '20':
                output.push('/std:c++20')
                break
            case '23':
            case 'latest':
                output.push('/std:c++latest')
                break
        }
        if (featureMap.has('__OBJECT_NAME')) {
            output.push('/Fo' + featureMap.get('__OBJECT_NAME'))
        }
        if (featureMap.has('__SOURCE_C')) {
            output.push('/Tc' + featureMap.get('__SOURCE_C'))
        }
        if (featureMap.has('__SOURCE_CXX')) {
            output.push('/Tp' + featureMap.get('__SOURCE_CXX'))
        }
        if (featureMap.has('__TARGET_NAME')) {
            output.push('/Fd' + featureMap.get('__TARGET_NAME'))
        }
        output.push('/c')
        output.push('/FS')
        output.push('/nologo')
        output.push('/utf-8')
    }

    static inputDefinition(output, definitionMap) {
        for (let [name, value] of definitionMap) {
            if (value !== '') {
                output.push('/D' + name + '#' + value)
            } else {
                output.push('/D' + name)
            }
        }
    }

    static inputOption(output, optionList) {
        output.push(...optionList)
    }
}
