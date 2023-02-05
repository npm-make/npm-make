export default class {
    static compileC(output, sourcePath, outputPrefix, debugPrefix) {
        output.push('/Fd' + debugPrefix + '.pdb')
        output.push('/Fo' + outputPrefix + '.obj')
        output.push('/Tc' + sourcePath)
    }

    static compileCXX(output, sourcePath, outputPrefix, debugPrefix) {
        output.push('/Fd' + debugPrefix + '.pdb')
        output.push('/Fo' + outputPrefix + '.obj')
        output.push('/Tp' + sourcePath)
    }

    static compileFlag(output, featureMap) {
        if (!featureMap.has('ANSI')) {
            output.push('/utf-8')
        }
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
        if (featureMap.has('STANDARD_C11')) {
            output.push('/std:c11')
        }
        if (featureMap.has('STANDARD_C17')) {
            output.push('/std:c17')
        }
        if (featureMap.has('STANDARD_CXX14')) {
            output.push('/std:c++14')
        }
        if (featureMap.has('STANDARD_CXX17')) {
            output.push('/std:c++17')
        }
        if (featureMap.has('STANDARD_CXX20')) {
            output.push('/std:c++20')
        }
        if (featureMap.has('STANDARD_CXX23')) {
            output.push('/std:c++latest')
        }
        output.push('/c')
        output.push('/FS')
        output.push('/nologo')
    }
}
