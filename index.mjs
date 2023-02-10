import process from 'node:process'
import command from './core/command.mjs'
import argumentTool from './core/argumentTool.mjs'

let inputList = process.argv.slice(2)
let beforeMethod = new Map
let method = null
let afterMethod = new Map
for (let input of inputList) {
    if (method) {
        argumentTool.parseArgument(afterMethod, input)
    } else if (input in command) {
        method = input
    } else {
        argumentTool.parseArgument(beforeMethod, input)
    }
}
if (method) {
    await command[method](beforeMethod, afterMethod)
} else {
    await command.help()
}
