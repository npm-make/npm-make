export default class {
    static inputFeature(output, featureTable) {
        if ('DEBUG' in featureTable) {
            if (!'DEBUG_WITHOUT_RTC' in featureTable) {
                output.push('/RTC1')
            }
            if ('STATIC_RUNTIME' in featureTable) {
                output.push('/MTd')
            } else {
                output.push('/MDd')
            }
            output.push('/Od')
            output.push('/Zi')
        } else {
            if ('RELEASE_MIN_SIZE' in featureTable) {
                output.push('/O1')
            } else {
                output.push('/O2')
            }
            if ('RELEASE_WITH_DEBUG_INFO' in featureTable) {
                output.push('/Zi')
            }
            if ('STATIC_RUNTIME' in featureTable) {
                output.push('/MT')
            } else {
                output.push('/MD')
            }
        }
        if ('STANDARD_C' in featureTable) {
            switch (featureTable.STANDARD_C) {
                case '11':
                    output.push('/std:c11')
                    break
                case '17':
                    output.push('/std:c17')
                    break
            }
        }
        if ('STANDARD_CXX' in featureTable) {
            switch (featureTable.STANDARD_CXX) {
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
        }
        if ('__OBJECT_NAME' in featureTable) {
            output.push('/Fo' + featureTable.__OBJECT_NAME)
        }
        if ('__SOURCE_C' in featureTable) {
            output.push('/Tc' + featureTable.__SOURCE_C)
        }
        if ('__SOURCE_CXX' in featureTable) {
            output.push('/Tp' + featureTable.__SOURCE_CXX)
        }
        if ('__TARGET_NAME' in featureTable) {
            output.push('/Fd' + featureTable.__TARGET_NAME)
        }
        output.push('/c')
        output.push('/FS')
        output.push('/nologo')
        output.push('/utf-8')
    }

    static inputDefinition(output, definitionTable) {
        for (let name in definitionTable) {
            let value = definitionTable[name]
            if (typeof value === 'string' && value.length > 0) {
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
