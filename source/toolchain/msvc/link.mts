import { Builder } from '../../project/builder.mjs'
import { Source, Target } from '../../project/target.mjs'

function msvcLib(builder: Builder, target: Target, source: Source) {
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
    flagList.push('/NOLOGO')
    flagList.push('/OUT:' + target.OUTPUT_NAME)
    return flagList
}

function msvcLink(builder: Builder, target: Target, source: Source) {
    const flagList = msvcLib(builder, target, source)
    if (builder.DEBUG) {
        flagList.push('/DEBUG')
    } else {
        if (builder.RELEASE_WITH_DEBUG_INFO) {
            flagList.push('/DEBUG')
        }
        flagList.push('/INCREMENTAL:NO')
    }
    flagList.push('/MANIFEST:EMBED')
    return flagList
}

export async function msvcLinkExecute(builder: Builder, target: Target, source: Source) {
    const flagList = msvcLink(builder, target, source)
}

export async function msvcLinkShared(builder: Builder, target: Target, source: Source) {
    const flagList = msvcLink(builder, target, source)
    flagList.push('/DLL')
}

export async function msvcLinkStatic(builder: Builder, target: Target, source: Source) {
    const flagList = msvcLib(builder, target, source)
    flagList.push('/DEF')
}
