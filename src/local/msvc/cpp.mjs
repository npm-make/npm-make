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

    static compileFlag(output, featureTable) {
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
        if ('STANDARD_C11' in featureTable) {
            output.push('/std:c11')
        }
        if ('STANDARD_C17' in featureTable) {
            output.push('/std:c17')
        }
        if ('STANDARD_CXX14' in featureTable) {
            output.push('/std:c++14')
        }
        if ('STANDARD_CXX17' in featureTable) {
            output.push('/std:c++17')
        }
        if ('STANDARD_CXX20' in featureTable) {
            output.push('/std:c++20')
        }
        if ('STANDARD_CXX23' in featureTable) {
            output.push('/std:c++latest')
        }
        output.push('/c')
        output.push('/FS')
        output.push('/nologo')
        output.push('/utf-8')
    }
}
