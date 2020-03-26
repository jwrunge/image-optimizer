import {createOptimizationFolders} from './main.js'

let args = process.argv.slice(2)
if(args) {
    createOptimizationFolders(args[0], args[1], args[2])
}