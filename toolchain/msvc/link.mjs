export default class {
    static inputFeature(output, featureMap) {
        if (featureMap.has('DEBUG')) {
            output.push('/DEBUG')
        } else {
            if (featureMap.has('RELEASE_WITH_DEBUG_INFO')) {
                output.push('/DEBUG')
            }
            output.push('/INCREMENTAL:NO')
        }
        switch (featureMap.get('MACHINE')) {
            case 'AMD64':
            case 'X64':
                output.push('/MACHINE:X64')
                break
            case 'ARM32':
                output.push('/MACHINE:ARM')
                break
            case 'ARM64':
                output.push('/MACHINE:ARM64')
                break
            case 'X86':
                output.push('/MACHINE:X86')
                break
        }
        if (featureMap.has('SHARED')) {
            output.push('/DLL')
        }
        if (featureMap.has('WIN32_MAIN')) {
            output.push('/SUBSYSTEM:WINDOWS')
        }
        output.push('/NOLOGO')
    }

    static inputDef(output, sourcePath) {
        output.push('/DEF:' + sourcePath)
    }

    static inputLibrary(output, libraryList) {
        output.push(...libraryList)
    }

    static inputObject(output, objectPrefix) {
        output.push(objectPrefix + '.obj')
    }

    static inputSearch(output, searchList) {
        for (let search of searchList) {
            output.push('/LIBPATH:' + search)
        }
    }

    static outputTarget(output, featureMap, targetPrefix) {
        if (featureMap.has('SHARED')) {
            output.push('/OUT:' + targetPrefix + '.dll')
        } else {
            output.push('/OUT:' + targetPrefix + '.exe')
        }
        output.push('/IMPLIB:' + targetPrefix + '.lib')
        output.push('/PDB:' + targetPrefix + '.pdb')
    }
}
