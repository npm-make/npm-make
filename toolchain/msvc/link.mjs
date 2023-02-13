import executeTool from '../../core/executeTool.mjs'
import msvc from '../windows/msvc.mjs'
import sdk from '../windows/sdk.mjs'

export default class {
    /**
     * @param {toolchain.Artifact} artifact
     */
    static async link(artifact) {
        let flagList = Array.from(artifact.optionList)
        if (artifact.buildFeature.has('DEBUG')) {
            flagList.push('/DEBUG')
        } else {
            if (artifact.buildFeature.has('RELEASE_WITH_DEBUG_INFO')) {
                flagList.push('/DEBUG')
            }
            flagList.push('/INCREMENTAL:NO')
        }
        switch (artifact.buildFeature.get('MACHINE')) {
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
        if (artifact.targetFeature.has('SHARED')) {
            flagList.push('/DLL')
            flagList.push('/OUT:' + artifact.targetPrefix + '.dll')
        } else {
            flagList.push('/OUT:' + artifact.targetPrefix + '.exe')
        }
        if (artifact.targetFeature.has('WIN32_MAIN')) {
            flagList.push('/SUBSYSTEM:WINDOWS')
        }
        for (let libraryPath of artifact.libraryPathList) {
            flagList.push('/LIBPATH:' + libraryPath)
        }
        for (let libraryPath of msvc.libraryPathList) {
            flagList.push('/LIBPATH:' + libraryPath)
        }
        for (let libraryPath of sdk.libraryPathList) {
            flagList.push('/LIBPATH:' + libraryPath)
        }
        for (let source of artifact.sourceList) {
            switch (source.sourceType) {
                case 'C':
                case 'CXX':
                    flagList.push(source.objectPrefix + '.obj')
                    break
                case 'DEF':
                    flagList.push('/DEF:' + source.sourcePath)
                    break
            }
        }
        for (let library of artifact.libraryList) {
            flagList.push(library)
        }
        for (let library of sdk.libraryList) {
            flagList.push(library)
        }
        flagList.push('/NOLOGO')
        return executeTool.execute(artifact.outputPath, msvc.executeLINK, ...flagList)
    }
}
