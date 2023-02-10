import argumentTool from './argumentTool.mjs'

/**
 * @namespace core
 */
export default class Target {
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
