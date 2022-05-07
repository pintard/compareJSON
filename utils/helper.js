const fs = require('fs')
const path = require('path');

/**
 * Returns the largest length of two supplied objects
 * @param {*} obj1 the first object length to compare
 * @param {*} obj2 the second object length to compare
 * @returns the max object length
 */
module.exports.maxObjectLength = (x, y) => Math.max(Object.keys(x).length, Object.keys(y).length)

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
module.exports.directoryCompare = function (directoryPath) {
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
                const fileNames = `[${keys[i]}]\tAND [${keys[j]}]`
                if (i !== j) console.log(`${fileNames}: ${score}`)
            }
        }
    })
}

/**
 * Compares two files supplied by the file paths
 * @param {*} path1 the file path of the first file to compare
 * @param {*} path2 the file path of the second file to compare
 */
module.exports.fileCompare = function (path1, path2) {
    const compare = require('./compare')

    if (path1.includes('.json') && path2.includes('.json')) {
        try {
            const data1 = JSON.parse(fs.readFileSync(path1))
            const data2 = JSON.parse(fs.readFileSync(path2))
            console.log(compare(data1, data2))
        } catch (error) { console.error('File not found:', error.path) }
    } else console.error('Must supply two json file paths')
}