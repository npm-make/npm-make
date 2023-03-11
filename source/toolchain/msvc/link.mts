import { Target } from '../../project/target.mjs'
import { Builder } from '../../project/builder.mjs'
import { Msvc } from './msvc.mjs'

function baseLib(target: Target) {
    const flagList = Array.from(target._LINK_OPTION_LIST)
    if (target.WIN32_MAIN) {
        flagList.push('/SUBSYSTEM:WINDOWS')
    }
    for (const libraryPath of target._LIBRARY_PATH_LIST) {
        flagList.push('/LIBPATH:' + libraryPath)
    }
    for (const library of target._LIBRARY_LIST) {
        flagList.push(library)
    }
    for (const source of target._SOURCE_LIST) {
        switch (source._SOURCE_TYPE) {
            case 'ASM':
            case 'C':
            case 'CPP':
                flagList.push(source._OBJECT_PREFIX + '.obj')
                break
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
    flagList.push('/NOLOGO')
    flagList.push('/OUT:' + target.OUTPUT_NAME)
    return flagList
}

function baseLink(builder: Builder, target: Target) {
    const flagList = baseLib(target)
    if (builder.DEBUG) {
        flagList.push('/DEBUG')
    } else {
        if (builder.RELEASE_WITH_DEBUG_INFO) {
            flagList.push('/DEBUG')
        }
        flagList.push('/INCREMENTAL:NO')
    }
    if (!builder.MSVC_WITHOUT_CORE_LIBRARY) {
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
    flagList.push('/MANIFEST:EMBED')
    return flagList
}

export async function buildLink(msvc: Msvc, builder: Builder, target: Target) {
    if (target.STATIC) {
        const flagList = baseLib(target)
        flagList.push('/DEF')
        return msvc.execute(target.OUTPUT_PATH, msvc.EXECUTE_LIB, ...flagList)
    } else {
        const flagList = baseLink(builder, target)
        if (target.SHARED) {
            flagList.push('/DLL')
        }
        return msvc.execute(target.OUTPUT_PATH, msvc.EXECUTE_LINK, ...flagList)
    }
}
