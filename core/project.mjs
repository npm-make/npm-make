import Target from './target.mjs'

/**
 * @namespace core
 */
export default class Project {
    static projectMap = new Map()
    featureTable

    addExecute(executeName, ...featureList) {
    }

    addImported(importedName, ...featureList) {
    }

    addSharedLibrary(libraryName, ...featureList) {
    }

    addStaticLibrary(libraryName, ...featureList) {
    }
}
