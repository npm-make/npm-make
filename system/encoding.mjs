import child_process from 'node:child_process'
import process from 'node:process'

export default class Self {
    static changeEncoding() {
        if (process.platform === 'win32') {
            //noinspection SpellCheckingInspection
            child_process.execSync('chcp 65001')
        }
    }
}
