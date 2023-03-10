import { Builder } from '../../project/builder.mjs'
import { Source, Target } from '../../project/target.mjs'
import { Msvc } from './msvc.mjs'

export async function buildRC(msvc: Msvc, builder: Builder, target: Target, source: Source) {
    const flagList = Array.from(source._COMPILE_OPTION_LIST)
    for (const includePath of source._INCLUDE_PATH_LIST) {
        flagList.push('/i' + includePath)
    }
    for (const definition of source._DEFINITION_LIST) {
        flagList.push('/d' + definition)
    }
    flagList.push('/fo' + source._OBJECT_PREFIX + '.res')
    flagList.push('/nologo')
    //这些命令在末尾
    flagList.push(source._SOURCE_PATH)
    return msvc.execute(target.OUTPUT_PATH, msvc.EXECUTE_RC, ...flagList)
}
