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
        if (featureTable.DEBUG) {
            if (!featureTable.DEBUG_WITHOUT_RTC) {
                output.push('/RTC1')
            }
            if (featureTable.STATIC_RUNTIME) {
                output.push('/MTd')
            } else {
                output.push('/MDd')
            }
            output.push('/Od')
            output.push('/Zi')
        } else {
            if (featureTable.RELEASE_MIN_SIZE) {
                output.push('/O1')
            } else {
                output.push('/O2')
            }
            if (featureTable.RELEASE_WITH_DEBUG_INFO) {
                output.push('/Zi')
            }
            if (featureTable.STATIC_RUNTIME) {
                output.push('/MT')
            } else {
                output.push('/MD')
            }
        }
        if (featureTable.STANDARD_C11) {
            output.push('/std:c11')
        }
        if (featureTable.STANDARD_C17) {
            output.push('/std:c17')
        }
        if (featureTable.STANDARD_CXX14) {
            output.push('/std:c++14')
        }
        if (featureTable.STANDARD_CXX17) {
            output.push('/std:c++17')
        }
        if (featureTable.STANDARD_CXX20) {
            output.push('/std:c++20')
        }
        if (featureTable.STANDARD_CXX23) {
            output.push('/std:c++latest')
        }
        output.push('/c')
        output.push('/FS')
        output.push('/nologo')
        output.push('/utf-8')
    }
}
