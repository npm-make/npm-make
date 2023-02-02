import fs from 'node:fs/promises'
import path from 'node:path'

export default class {
    static async detect(env) {
        env.MSVC_CL = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\bin\\Hostx64\\x64\\cl.exe'
        env.MSVC_INCLUDE = [
            'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\include',
            'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Auxiliary\\VS\\include',
            'C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\ucrt',
            'C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\um',
            'C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\shared',
            'C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\winrt',
            'C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\cppwinrt'
        ]
        env.MSVC_LIB = [
            'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.34.31933\\lib\\x64',
            'C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\ucrt\\x64',
            'C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\um\\x64'
        ]

        // let instances = await fs.opendir('C:\\ProgramData\\Microsoft\\VisualStudio\\Packages\\_Instances')
        // for await (let instance of instances) {
        //     let statePath = path.resolve(instances.path, instance.name, 'state.json')
        //     let stateText = await fs.readFile(statePath, 'utf-8')
        //     let stateJson = JSON.parse(stateText)
        // }
    }
}
