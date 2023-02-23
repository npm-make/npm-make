import msvc from './msvc.mjs'

export default class {
    /**
     * @param {ToolchainTarget} target
     */
    static async build(target) {
        let flagList = Array.from(target.optionList)
        switch (target.buildFeature.MACHINE) {
            case 'ARM':
                flagList.push('/MACHINE:ARM')
                break
            case 'ARM64':
                flagList.push('/MACHINE:ARM64')
                break
            case 'ARM64EC':
                flagList.push('/MACHINE:ARM64EC')
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
            let result = await msvc.execute(target.outputPath, msvc.executeLIB, ...flagList)
            target.targetStatus = 'SUCCESS'
            return result
        } else {
            if (target.buildFeature.DEBUG) {
                flagList.push('/DEBUG')
            } else {
                if (target.buildFeature.RELEASE_WITH_DEBUG_INFO) {
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
            let result = await msvc.execute(target.outputPath, msvc.executeLINK, ...flagList)
            target.targetStatus = 'SUCCESS'
            return result
        }
    }
}
