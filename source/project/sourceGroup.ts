import Source from './source'
import Target from './target'

export default class SourceGroup {
    sourceList: Source[]

    static fromPathList(target: Target, pathList: string[]) {
        return new SourceGroup
    }
}
