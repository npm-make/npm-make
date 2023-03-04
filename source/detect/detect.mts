import fs from 'node:fs/promises'

interface DetectItem {
    itemType: string
    itemValue: string
    machine: string
    product: string
    version: string
}

export class Detect {
    itemList: DetectItem[]

    constructor() {
        this.itemList = []
    }

    add(machine: string, product: string, version: string, itemType: string, itemValue: string) {
        this.itemList.push({itemType, itemValue, machine, product, version})
    }

    async tryAdd(machine: string, product: string, version: string, itemType: string, itemValue: string) {
        try {
            await fs.access(itemValue)
            this.itemList.push({itemType, itemValue, machine, product, version})
        } catch {
        }
    }
}
