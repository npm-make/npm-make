export default class ToolchainTarget {
    buildFeature
    buildSuccess
    libraryList
    libraryPathList
    optionList
    outputPath
    /**
     * @type {ToolchainSource[]} sourceList
     */
    sourceList
    targetFeature
    targetPrefix
    /**
     * @type {'EXECUTE'|'SHARED'|'STATIC'} targetType
     */
    targetType
}
