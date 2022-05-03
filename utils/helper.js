const fs = require('fs')
const path = require('path');

/**
 * Performs a deep equality of two objects, returning true if identical
 * @param {*} x the first object to be compared
 * @param {*} y the second object to be compared
 * @returns {boolean} true if the objects have identical content
 */
module.exports.equals = function equals(x, y) {
    return x && y && typeof x === 'object' && typeof x === typeof y ?
        Object.keys(x).length === Object.keys(y).length && Object.keys(x).every(key =>
            equals(x[key], y[key]))
        : x === y
}

/**
 * Performs a similarity score on all permutations of files in a specified directory
 * @param {*} directoryPath the path of the directory to be analyzed
 */
module.exports.analyzeDirectory = function (directoryPath) {
    const compare = require('./compare')

    fs.readdir(directoryPath, (error, files) => {
        if (error) return console.log('Failed to read directory: ' + error)
        const fileObjectMap = {}
        files.forEach(fileName => {
            const filePath = path.join(directoryPath, fileName)
            fileObjectMap[fileName] = JSON.parse(fs.readFileSync(filePath))
        })
        const keys = Object.keys(fileObjectMap)
        for (let i = 0; i < keys.length; i++) {
            for (let j = i; j < keys.length; j++) {
                const score = compare(fileObjectMap[keys[i]], fileObjectMap[keys[j]])
                const fileNames = `${keys[i]}-${keys[j]}`
                console.log(`${fileNames}: ${score}`)
            }
        }
    })
}