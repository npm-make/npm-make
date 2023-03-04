import { MachineType } from '../type.mjs'

export interface DetectItem {
    executeASM?: string
    executeCL?: string
    executeLIB?: string
    executeLINK?: string
    executePath?: string
    executeRC?: string
    includePath?: string
    library?: string
    libraryPath?: string
    localMachine?: MachineType
    targetMachine?: MachineType
    version?: string
}

export class Detect {
    itemList: DetectItem[]

    constructor() {
        this.itemList = []
    }

    push(item: DetectItem) {
        this.itemList.push(item)
    }
}
