import process from 'node:process'
import command from './source/command.mjs'
import argumentTool from './source/argumentTool.ts'

let inputList = process.argv.slice(2)
let beforeMethod = new Map
let method = null
let afterMethod = new Map
for (let input of inputList) {
    if (method) {
        argumentTool.parse(afterMethod, input)
    } else if (input in command) {
        method = input
    } else {
        argumentTool.parse(beforeMethod, input)
    }
}
if (method) {
    await command[method](beforeMethod, afterMethod)
} else {
    await command.help()
}
