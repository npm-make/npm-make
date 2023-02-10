import argumentTool from './argumentTool.mjs'

/**
 * @namespace core
 */
export default class Target {
    static targetMap = new Map()
    compileOptionList = []
    definitionTable = {}
    dependencyList = []
    featureTable = {}
    includeDirectoryList = []
    libraryList = []
    linkDirectoryList = []
    linkOptionList = []
    sourceList = []
    sourcePatternList = []
    targetName
}
