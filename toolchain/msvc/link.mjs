import msvc from './msvc.mjs'

export default class {
    /**
     * @param {ToolchainTarget} target
     */
    static async build(target) {
        let flagList = Array.from(target.optionList)
        switch (target.buildFeature.get('MACHINE')) {
            case 'arm':
                flagList.push('/MACHINE:ARM')
                break
            case 'arm64':
                flagList.push('/MACHINE:ARM64')
                break
            case 'arm64ec':
                flagList.push('/MACHINE:ARM64EC')
                break
            case 'x64':
                flagList.push('/MACHINE:X64')
                break
            case 'x86':
                flagList.push('/MACHINE:X86')
                break
        }
        if (target.targetFeature.has('WIN32_MAIN')) {
            flagList.push('/SUBSYSTEM:WINDOWS')
        }
        for (let libraryPath of target.libraryPathList) {
            flagList.push('/LIBPATH:' + libraryPath)
        }
        for (let libraryPath of msvc.libraryPathList) {
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
            return msvc.execute(target.outputPath, msvc.executeLIB, ...flagList)
        } else {
            if (target.buildFeature.has('DEBUG')) {
                flagList.push('/DEBUG')
            } else {
                if (target.buildFeature.has('RELEASE_WITH_DEBUG_INFO')) {
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
            return msvc.execute(target.outputPath, msvc.executeLINK, ...flagList)
        }
    }
}
