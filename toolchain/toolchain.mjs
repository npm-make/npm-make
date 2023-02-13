import msvc from './msvc/msvc.mjs'

export default class {
    static async initToolchain(targetMachine) {
        await msvc.detect(targetMachine)
    }
}
