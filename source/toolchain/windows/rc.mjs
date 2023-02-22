import windows from './windows.mjs'

export default class {
    /**
     * @param {ToolchainSource} source
     */
    static async build(source) {
        let flagList = Array.from(source.optionList)
        for (let definition of source.definitionList) {
            flagList.push('/D' + definition)
        }
        for (let includePath of source.includePathList) {
            flagList.push('/I' + includePath)
        }
        flagList.push('/Fo' + source.objectPrefix + '.res')
        flagList.push('/nologo')
        flagList.push(source.sourcePath)
        let result = await windows.execute(source.outputPath, windows.executeRC, ...flagList)
        source.buildSuccess = true
        return result
    }
}
