import { Builder } from '../../project/builder.mjs'
import { Source } from '../../project/source.mjs'
import { Target } from '../../project/target.mjs'
import { Msvc } from './msvc.mjs'

export async function buildRC(msvc: Msvc, builder: Builder, target: Target, source: Source) {
    const flagList = Array.from(source._COMPILE_OPTION_LIST)
    for (const definition of source._DEFINITION_LIST) {
        flagList.push('/D' + definition)
    }
    flagList.push('/Fo' + source._OBJECT_PREFIX + '.res')
    flagList.push('/nologo')
    //这些命令在末尾
    flagList.push(source._SOURCE_PATH)
    return msvc.execute(target.OUTPUT_PATH, msvc.EXECUTE_RC, ...flagList)
}
