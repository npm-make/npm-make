import { Msvc } from './toolchain/msvc.mjs'
import { Builder } from './project/builder.mjs'
import { Source } from './project/source.mjs'
import { Target } from './project/target.mjs'
import { Project } from './project/project.mjs'
import { join, parse } from 'node:path'
import { pathToFileURL } from 'node:url'
import { opendir, mkdir, readFile, realpath } from 'node:fs/promises'

const msvc = new Msvc()
msvc.ENVIRONMENT = {
    INCLUDE: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\include;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\ATLMFC\\include;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Auxiliary\\VS\\include;C:\\Program Files (x86)\\Windows Kits\\10\\include\\10.0.22000.0\\ucrt;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22000.0\\\\um;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22000.0\\\\shared;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22000.0\\\\winrt;C:\\Program Files (x86)\\Windows Kits\\10\\\\include\\10.0.22000.0\\\\cppwinrt',
    LIB: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\lib\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\lib\\10.0.22000.0\\ucrt\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\\\lib\\10.0.22000.0\\\\um\\x64',
    Path: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\HostX64\\x64;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\VC\\VCPackages;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\MSBuild\\Current\\bin\\Roslyn;C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.22000.0\\\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\bin\\\\x64;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\\\MSBuild\\Current\\Bin\\amd64;C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\Tools\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\Users\\name\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\name\\OneDrive\\Apps\\mingw64;;C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\Common7\\IDE\\VC\\Linux\\bin\\ConnectionManagerExe'
}
msvc.EXECUTE_ASM = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\Hostx64\\x64\\ml64.exe'
msvc.EXECUTE_CL = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\Hostx64\\x64\\cl.exe'
msvc.EXECUTE_LIB = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\Hostx64\\x64\\lib.exe'
msvc.EXECUTE_LINK = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.35.32215\\bin\\Hostx64\\x64\\link.exe'
msvc.EXECUTE_RC = 'C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.22000.0\\x64\\rc.exe'
const builder = new Builder()
builder.CONFIG_NAME = 'default'
builder.DEBUG = true
builder.MACHINE = 'X64'
builder.MSVC_VERSION = '14.35.32215'
builder.PLATFORM = 'WINDOWS'
builder.TOOLCHAIN = 'MSVC'
const config = {}
const projectMap = new Map<string, Project>()
const targetMap = new Map<string, Target>()
let outputPath

async function loadMain(mainProjectPath) {
    outputPath = join(mainProjectPath, 'npm_make', builder.CONFIG_NAME)
    const mainProject = await loadProject(mainProjectPath)
    await loadDependencyProject([mainProject])
    for (const target of targetMap.values()) {
        for (const dependency of target._DEPENDENCY_LIST) {
            if (targetMap.has(dependency)) {
                target._DEPENDENCY_TARGET_LIST.push(targetMap.get(dependency))
            } else {
                throw new Error('需要target:' + dependency)
            }
        }
    }
    return mainProject
}

async function loadDependencyProject(projectList: Project[]) {
    const resultList = []
    for (const project of projectList) {
        for (const dependency of project._DEPENDENCY_LIST) {
            if (!projectMap.has(dependency)) {
                let project2
                project.PROJECT_PATH = await realpath(project.PROJECT_PATH)
                try {
                    project2 = await loadProject(join(project.PROJECT_PATH, 'node_modules', dependency))
                } catch (cause) {
                    try {
                        if (project.PROJECT_NAME.startsWith('@')) {
                            project2 = await loadProject(join(project.PROJECT_PATH, '..', '..', dependency))
                        } else {
                            project2 = await loadProject(join(project.PROJECT_PATH, '..', dependency))
                        }
                    } catch (cause2) {
                        console.log(cause)
                        console.log(cause2)
                        throw new Error('没有找到' + dependency)
                    }
                }
                resultList.push(project2)
                projectMap.set(project2.PROJECT_NAME, project2)
            }
        }
    }
    if (resultList.length > 0) {
        await loadDependencyProject(resultList)
    }
}

async function loadProject(projectPath: string) {
    const packageData = await readFile(join(projectPath, 'package.json'), { encoding: 'utf-8' })
    const packageJson = JSON.parse(packageData)
    const project = new Project()
    project.OUTPUT_PATH = outputPath
    project.PROJECT_NAME = packageJson.name
    project.PROJECT_VERSION = packageJson.version
    project.PROJECT_PATH = projectPath
    project._PROJECT_MODULE = (await import(pathToFileURL(join(projectPath, 'make.mjs')).href)).default
    const result = project._PROJECT_MODULE.generate(builder, project, config)
    if (result instanceof Promise) {
        await result
    }
    await searchDirectory(project._PROJECT_FILE_LIST, project.PROJECT_PATH, '')
    for (const target of project._TARGET_LIST) {
        for (const sourceGroup of target._SOURCE_GROUP_LIST) {
            if (sourceGroup._SOURCE_PATTERN_LIST.length > 0) {
                const regex = searchRegex(sourceGroup._SOURCE_PATTERN_LIST)
                const compileOptionList = sourceGroup._COMPILE_OPTION_LIST.concat(target._COMPILE_OPTION_LIST)
                const definitionList = sourceGroup._DEFINITION_LIST.concat(target._DEFINITION_LIST)
                for (const projectFile of project._PROJECT_FILE_LIST) {
                    if (regex.test(projectFile)) {
                        const parse1 = parse(projectFile)
                        const source = new Source()
                        source._COMPILE_OPTION_LIST = compileOptionList
                        source._DEFINITION_LIST = definitionList
                        source._OBJECT_PREFIX = join('obj', (parse1.dir + '/' + parse1.name).replaceAll('/', '_'))
                        source._SOURCE_PATH = join(projectPath, projectFile)
                        switch (parse1.ext.toLowerCase()) {
                            case '.asm':
                            case '.s':
                                source._SOURCE_TYPE = 'ASM'
                                break
                            case '.c':
                                source._SOURCE_TYPE = 'C'
                                break
                            case '.cc':
                            case '.cpp':
                            case '.cxx':
                            case '.ixx':
                                source._SOURCE_TYPE = 'CPP'
                                break
                            case '.def':
                                source._SOURCE_TYPE = 'DEF'
                                break
                            case '.manifest':
                                source._SOURCE_TYPE = 'MANIFEST'
                                break
                            case '.map':
                                source._SOURCE_TYPE = 'MAP'
                                break
                            case '.rc':
                                source._SOURCE_TYPE = 'RC'
                                break
                        }
                        target._SOURCE_LIST.push(source)
                    }
                }
            }
        }
        if (!target.OUTPUT_NAME) {
            if (builder.PLATFORM === 'WINDOWS') {
                if (target.LIBRARY) {
                    target.OUTPUT_NAME = target.TARGET_NAME + '.lib'
                } else if (target.SHARED) {
                    target.OUTPUT_NAME = target.TARGET_NAME + '.dll'
                } else {
                    target.OUTPUT_NAME = target.TARGET_NAME + '.exe'
                }
            } else {
                if (target.LIBRARY) {
                    target.OUTPUT_NAME = target.TARGET_NAME + '.a'
                } else if (target.SHARED) {
                    target.OUTPUT_NAME = target.TARGET_NAME + '.so'
                } else {
                    target.OUTPUT_NAME = target.TARGET_NAME + '.o'
                }
            }
        }
        if (!targetMap.has(target.TARGET_NAME)) {
            targetMap.set(target.TARGET_NAME, target)
        } else {
            throw Error('重复的target:' + target.TARGET_NAME)
        }
    }
    return project
}

async function searchDirectory(outputList: string[], basePath: string, thisPath: string) {
    const directory = await opendir(basePath + thisPath)
    for await (const item of directory) {
        if (item.isDirectory()) {
            if (!/^node_modules$|^npm_make$|^\./.test(item.name)) {
                await searchDirectory(outputList, basePath, thisPath + '/' + item.name)
            }
        } else {
            outputList.push(thisPath + '/' + item.name)
        }
    }
}

function searchRegex(patternList: string[]): RegExp {
    const resultList = []
    for (const pattern of patternList) {
        const pattern1 = pattern.replace(/[.+^$|(){}\[\]\\]/g, '\\$&')
        const pattern2 = pattern1.replace(/\*/g, '.*')
        const pattern3 = pattern2.replace(/\?/g, '[^/]*')
        resultList.push('^/(' + pattern3 + ')$')
    }
    return new RegExp(resultList.join('|'))
}

async function buildTargetList(targetList: Target[]) {
    if (targetList.length > 0) {
        const waitingList = []
        for (const dependency of targetList) {
            waitingList.push(buildTarget(dependency))
        }
        await Promise.all(waitingList)
    }
}

async function buildTarget(target: Target) {
    if (!target._PROMISE) {
        target._PROMISE = buildTargetReal(target)
    }
    await target._PROMISE
}

async function buildTargetReal(target: Target) {
    await buildTargetList(target._DEPENDENCY_TARGET_LIST)
    await mkdir(target.OUTPUT_PATH + '/obj', { recursive: true })
    for (const source1 of target._SOURCE_LIST) {
        await msvc.compileSource(builder, target, source1)
    }
    await msvc.buildTarget(builder, target)
}

try {
    const mainProj = await loadMain('C:\\Project\\npm-make\\npm-make\\debug')
    await buildTargetList(mainProj._TARGET_LIST)
} catch (error) {
    console.log(error)
}
