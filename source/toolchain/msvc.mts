import { Builder } from '../project/builder.mjs'
import { Source } from '../project/source.mjs'
import { Target } from '../project/target.mjs'
import { Toolchain } from './toolchain.mjs'

export class Msvc extends Toolchain {
    EXECUTE_ASM: string
    EXECUTE_CL: string
    EXECUTE_LIB: string
    EXECUTE_LINK: string
    EXECUTE_RC: string

    async compileC(builder: Builder, target: Target, source: Source) {
        const flagList = this.prepareCl(builder, target, source)
        switch (target.STANDARD_C) {
            case 'c11':
                flagList.push('/std:c11')
                break
            case 'c17':
                flagList.push('/std:c17')
                break
        }
        flagList.push('/Tc' + source._SOURCE_PATH)
        return this.execute(target.OUTPUT_PATH, this.EXECUTE_CL, ...flagList)
    }

    async compileCPP(builder: Builder, target: Target, source: Source) {
        const flagList = this.prepareCl(builder, target, source)
        switch (target.STANDARD_CPP) {
            case 'c++14':
                flagList.push('/std:c++14')
                break
            case 'c++17':
                flagList.push('/std:c++17')
                break
            case 'c++20':
                flagList.push('/std:c++20')
                break
            case 'c++latest':
                flagList.push('/std:c++latest')
                break
        }
        flagList.push('/Tp' + source._SOURCE_PATH)
        return this.execute(target.OUTPUT_PATH, this.EXECUTE_CL, ...flagList)
    }

    async compileRC(builder: Builder, target: Target, source: Source) {
        const flagList = Array.from(source._COMPILE_OPTION_LIST)
        for (const definition of source._DEFINITION_LIST) {
            flagList.push('/D' + definition)
        }
        flagList.push('/Fo' + source._OBJECT_PREFIX + '.res')
        flagList.push('/nologo')
        //这些命令在末尾
        flagList.push(source._SOURCE_PATH)
        return this.execute(target.OUTPUT_PATH, this.EXECUTE_RC, ...flagList)
    }

    async buildExecute(builder: Builder, target: Target) {
        const flagList = this.prepareLink(builder, target)
        flagList.push('/OUT:' + target.OUTPUT_NAME)
        flagList.push('/IMPLIB:' + target._LINK_NAME)
        return this.execute(target.OUTPUT_PATH, this.EXECUTE_LINK, ...flagList)
    }

    async buildShared(builder: Builder, target: Target) {
        const flagList = this.prepareLink(builder, target)
        flagList.push('/DLL')
        flagList.push('/OUT:' + target.OUTPUT_NAME)
        flagList.push('/IMPLIB:' + target._LINK_NAME)
        return this.execute(target.OUTPUT_PATH, this.EXECUTE_LINK, ...flagList)
    }

    async buildStatic(builder: Builder, target: Target) {
        const flagList = this.prepareLib(builder, target)
        flagList.push('/OUT:' + target._LINK_NAME)
        return this.execute(target.OUTPUT_PATH, this.EXECUTE_LIB, ...flagList)
    }

    prepareCl(builder: Builder, target: Target, source: Source) {
        const flagList = Array.from(source._COMPILE_OPTION_LIST)
        if (builder.DEBUG) {
            if (!builder.DEBUG_WITHOUT_RTC) {
                flagList.push('/RTC1')
            }
            if (builder.MSVC_STATIC_RUNTIME) {
                flagList.push('/MTd')
            } else {
                flagList.push('/MDd')
            }
            flagList.push('/Od')
            flagList.push('/Zi')
        } else {
            if (builder.RELEASE_MIN_SIZE) {
                flagList.push('/O1')
            } else {
                flagList.push('/GL')
                flagList.push('/O2')
            }
            if (builder.RELEASE_WITH_DEBUG_INFO) {
                flagList.push('/Zi')
            }
            if (builder.MSVC_STATIC_RUNTIME) {
                flagList.push('/MT')
            } else {
                flagList.push('/MD')
            }
        }
        for (const definition of source._DEFINITION_LIST) {
            flagList.push('/D' + definition)
        }
        for (const includePath of target._INCLUDE_PATH_LIST) {
            flagList.push('/I' + includePath)
        }
        for (const dependency of target._DEPENDENCY_TARGET_LIST) {
            for (const includePath of dependency._EXPORT_INCLUDE_PATH_LIST) {
                flagList.push('/I' + includePath)
            }
        }
        flagList.push('/c')
        flagList.push('/Fd' + source._OBJECT_PREFIX + '.pdb')
        flagList.push('/Fo' + source._OBJECT_PREFIX + '.obj')
        flagList.push('/nologo')
        flagList.push('/utf-8')
        return flagList
    }

    prepareLib(builder: Builder, target: Target) {
        const flagList = Array.from(target._LINK_OPTION_LIST)
        for (const source of target._SOURCE_LIST) {
            switch (source._SOURCE_TYPE) {
                case 'ASM':
                case 'C':
                case 'CPP':
                    flagList.push(source._OBJECT_PREFIX + '.obj')
                    break
            }
        }
        for (const dependency of target._DEPENDENCY_TARGET_LIST) {
            flagList.push(dependency._LINK_NAME)
        }
        flagList.push('/NOLOGO')
        return flagList
    }

    prepareLink(builder: Builder, target: Target) {
        const flagList = this.prepareLib(builder, target)
        if (builder.DEBUG) {
            flagList.push('/DEBUG')
        } else {
            if (builder.RELEASE_WITH_DEBUG_INFO) {
                flagList.push('/DEBUG')
            }
            flagList.push('/INCREMENTAL:NO')
        }
        if (target.WIN32_MAIN) {
            flagList.push('/SUBSYSTEM:WINDOWS')
        }
        if (target.WIN32_REQUIRED_ADMIN) {
            flagList.push('/MANIFESTUAC:level=\'requireAdministrator\'')
        }
        if (!target.WIN32_WITHOUT_CORE_LIBRARY) {
            flagList.push('advapi32.lib')
            flagList.push('comdlg32.lib')
            flagList.push('gdi32.lib')
            flagList.push('kernel32.lib')
            flagList.push('ole32.lib')
            flagList.push('oleaut32.lib')
            flagList.push('shell32.lib')
            flagList.push('user32.lib')
            flagList.push('uuid.lib')
            flagList.push('winspool.lib')
        }
        for (const libraryPath of target._LIBRARY_PATH_LIST) {
            flagList.push('/LIBPATH:' + libraryPath)
        }
        for (const library of target._LIBRARY_LIST) {
            flagList.push(library)
        }
        for (const source of target._SOURCE_LIST) {
            switch (source._SOURCE_TYPE) {
                case 'DEF':
                    flagList.push('/DEF:' + source._SOURCE_PATH)
                    break
                case 'MANIFEST':
                    flagList.push('/MANIFESTINPUT:' + source._SOURCE_PATH)
                    break
                case 'RC':
                    flagList.push(source._OBJECT_PREFIX + '.res')
                    break
            }
        }
        flagList.push('/MANIFEST:EMBED')
        return flagList
    }
}
