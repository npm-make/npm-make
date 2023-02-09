import process from 'node:process'
import command from './core/command.mjs'

let inputList = process.argv.slice(2)
let beforeMethod = []
let method = null
let afterMethod = []
for (let input of inputList) {
    if (method) {
        afterMethod.push(input)
    } else if (input in command) {
        method = input
    } else {
        beforeMethod.push(input)
    }
}
if (method) {
    await command[method](beforeMethod, afterMethod)
} else {
    await command.help()
}
