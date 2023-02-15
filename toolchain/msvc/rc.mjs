import msvc from './msvc.mjs'

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
        return msvc.execute(source.outputPath, msvc.executeRC, ...flagList)
    }
}
