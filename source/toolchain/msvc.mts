import { executeProcess } from '../executeTool.mjs'
import { Builder } from '../project/builder.mjs'
import { Source } from '../project/source.mjs'
import { Target } from '../project/target.mjs'
import { Toolchain } from './toolchain.mjs'

export class Msvc implements Toolchain {
    ENVIRONMENT: object
    EXECUTE_ASM: string
    EXECUTE_CL: string
    EXECUTE_LIB: string
    EXECUTE_LINK: string
    EXECUTE_RC: string

    async compileSource(builder: Builder, target: Target, source: Source) {
        switch (source._SOURCE_TYPE) {
            case 'ASM':
                return this.compileASM(builder, target, source)
            case 'C':
                return this.compileC(builder, target, source)
            case 'CPP':
                return this.compileCPP(builder, target, source)
            case 'RC':
                return this.compileRC(builder, target, source)
        }
    }

    async buildTarget(builder: Builder, target: Target) {
        if (target.LIBRARY) {
            if (target.SHARED) {
                const flagList = this.prepareLink(builder, target)
                flagList.push('/DLL')
                return this.execute(target.OUTPUT_PATH, this.EXECUTE_LINK, ...flagList)
            } else {
                const flagList = this.prepareLib(builder, target)
                return this.execute(target.OUTPUT_PATH, this.EXECUTE_LIB, ...flagList)
            }
        } else {
            const flagList = this.prepareLink(builder, target)
            return this.execute(target.OUTPUT_PATH, this.EXECUTE_LINK, ...flagList)
        }
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
            for (const includePath of target._EXPORT_INCLUDE_PATH_LIST) {
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
        flagList.push('/NOLOGO')
        flagList.push('/OUT:' + target.OUTPUT_NAME)
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

    async compileASM(builder: Builder, target: Target, source: Source) {
//         const flagList = Array.from(source.compileOptionList)
//         switch (builderFeature.MACHINE) {
//             case 'ARM':
//             case 'ARM64': {
//                 if (builderFeature.WINDOWS_ARM64_CALL_X64) {
//                     flagList.push('-machine')
//                     flagList.push('ARM64EC')
//                 }
//                 if (target.includePathList.length > 0) {
//                     flagList.push('-i')
//                     flagList.push(target.includePathList.join(';'))
//                 }
//                 flagList.push('-nologo')
//                 //这些命令在末尾
//                 flagList.push(source.sourcePath)
//                 flagList.push(source.objectPrefix + '.obj')
//                 break
//             }
//             case 'X64':
//             case 'X86': {
//                 for (const includePath of target.includePathList) {
//                     flagList.push('/I' + includePath)
//                 }
//                 for (const definition of source.definitionList) {
//                     flagList.push('/D' + definition)
//                 }
//                 flagList.push('/Fo' + source.objectPrefix + '.obj')
//                 flagList.push('/nologo')
//                 //这些命令在末尾
//                 flagList.push('/c')
//                 flagList.push(source.sourcePath)
//                 break
//             }
//         }
//         return msvc.execute(builderFeature.OUTPUT_PATH, msvc.executeASM, ...flagList)
    }

    async compileC(builder: Builder, target: Target, source: Source) {
        const flagList = this.prepareCl(builder, target, source)
        switch (target.STANDARD_C) {
            case '11':
                flagList.push('/std:c11')
                break
            case '17':
                flagList.push('/std:c17')
                break
        }
        flagList.push('/Tc' + source._SOURCE_PATH)
        return this.execute(target.OUTPUT_PATH, this.EXECUTE_CL, ...flagList)
    }

    async compileCPP(builder: Builder, target: Target, source: Source) {
        const flagList = this.prepareCl(builder, target, source)
        switch (target.STANDARD_CPP) {
            case '14':
                flagList.push('/std:c++14')
                break
            case '17':
                flagList.push('/std:c++17')
                break
            case '20':
                flagList.push('/std:c++20')
                break
            case 'latest':
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

    async execute(cwd, file, ...args) {
        const result = await executeProcess({ cwd, env: this.ENVIRONMENT }, file, ...args)
        console.log(file, args.join(' '), result)
    }
}
