import fs from 'node:fs/promises'

interface DetectItem {
    product: string
    version: string
    machine: string
    itemType: string
    itemValue: string
}

export class Detect {
    itemList: DetectItem[]

    constructor() {
        this.itemList = []
    }

    add(product: string, version: string, machine: string, itemType: string, itemValue: string) {
        this.itemList.push({product, version, machine, itemType, itemValue})
    }

    async tryAdd(product: string, version: string, machine: string, itemType: string, itemValue: string) {
        try {
            await fs.access(itemValue)
            this.itemList.push({product, version, machine, itemType, itemValue})
        } catch {
        }
    }
}
