import { Builder } from '../../project/builder.mjs'
import { Source, Target } from '../../project/target.mjs'
import { Msvc } from './msvc.mjs'

function baseCl(builder: Builder, source: Source) {
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
    for (const includePath of source._INCLUDE_PATH_LIST) {
        flagList.push('/I' + includePath)
    }
    for (const definition of source._DEFINITION_LIST) {
        flagList.push('/D' + definition)
    }
    flagList.push('/c')
    flagList.push('/Fd' + source._OBJECT_PREFIX + '.pdb')
    flagList.push('/Fo' + source._OBJECT_PREFIX + '.obj')
    flagList.push('/nologo')
    flagList.push('/utf-8')
    return flagList
}

export async function buildC(msvc: Msvc, builder: Builder, target: Target, source: Source) {
    const flagList = baseCl(builder, source)
    switch (target.STANDARD_C) {
        case '11':
            flagList.push('/std:c11')
            break
        case '17':
            flagList.push('/std:c17')
            break
    }
    flagList.push('/Tc' + source._SOURCE_PATH)
    return msvc.execute(target.OUTPUT_PATH, msvc.EXECUTE_CL, ...flagList)
}

export async function buildCPP(msvc: Msvc, builder: Builder, target: Target, source: Source) {
    const flagList = baseCl(builder, source)
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
    return msvc.execute(target.OUTPUT_PATH, msvc.EXECUTE_CL, ...flagList)
}
