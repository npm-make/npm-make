import { BuilderFeature, MachineType } from '../type'

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
    localMachine: MachineType
    targetMachine: MachineType
    version: string
    versionNumber: bigint
}

export class Detect {
    resultList: DetectItem[]
}
