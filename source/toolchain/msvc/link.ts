import BuilderFeature from '../../project/builderFeature'
import Target from '../../project/target'
import msvc from './msvc'

export default class {
    static async build(builderFeature: BuilderFeature, target: Target) {
        let flagList = Array.from(target.linkOptionList)
        switch (builderFeature.MACHINE) {
            case 'ARM':
                flagList.push('/MACHINE:ARM')
                break
            case 'ARM64':
                if (builderFeature.WINDOWS_ARM64_CALL_X64) {
                    flagList.push('/MACHINE:ARM64EC')
                } else {
                    flagList.push('/MACHINE:ARM64')
                }
                break
            case 'X64':
                flagList.push('/MACHINE:X64')
                break
            case 'X86':
                flagList.push('/MACHINE:X86')
                break
        }
        if (target.targetFeature.WIN32_MAIN) {
            flagList.push('/SUBSYSTEM:WINDOWS')
        }
        for (let libraryPath of target.libraryPathList) {
            flagList.push('/LIBPATH:' + libraryPath)
        }
        for (let library of target.libraryList) {
            flagList.push(library)
        }
        for (let library of msvc.libraryList) {
            flagList.push(library)
        }
        for (let source of target.sourceList) {
            switch (source.sourceType) {
                case 'ASM':
                case 'C':
                case 'CXX':
                    flagList.push(source.objectPrefix + '.obj')
                    break
                case 'DEF':
                    flagList.push('/DEF:' + source.sourcePath)
                    break
                case 'MANIFEST':
                    flagList.push('/MANIFESTINPUT:' + source.sourcePath)
                    break
                case 'RC':
                    flagList.push(source.objectPrefix + '.res')
                    break
            }
        }
        flagList.push('/NOLOGO')
        if (target.targetType === 'STATIC') {
            flagList.push('/DEF')
            flagList.push('/OUT:' + target.targetPrefix + '.lib')
            return msvc.execute(builderFeature.OUTPUT_PATH, msvc.executeLIB, ...flagList)
        } else {
            if (builderFeature.DEBUG) {
                flagList.push('/DEBUG')
            } else {
                if (builderFeature.RELEASE_WITH_DEBUG_INFO) {
                    flagList.push('/DEBUG')
                }
                flagList.push('/INCREMENTAL:NO')
            }
            if (target.targetType === 'SHARED') {
                flagList.push('/DLL')
                flagList.push('/OUT:' + target.targetPrefix + '.dll')
            } else {
                flagList.push('/OUT:' + target.targetPrefix + '.exe')
            }
            flagList.push('/MANIFEST:EMBED')
            return msvc.execute(builderFeature.OUTPUT_PATH, msvc.executeLINK, ...flagList)
        }
    }
}
