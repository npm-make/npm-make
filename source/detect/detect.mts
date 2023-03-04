import { MachineType } from '../type.mjs'

enum DetectItemType {
    executeASM,
    executeC,
    executeLIB,
    executeLINK,
    executePath,
    executeRC,
    library,
    libraryPath,
}

class DetectItem {
    itemType: DetectItemType
    itemValue: string
    targetMachine: MachineType
    version: string

    constructor(itemType: DetectItemType, itemValue: string, targetMachine: MachineType, version: string) {
    }
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
