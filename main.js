const fs = require('fs')
const compare = require('./utils/compare')
const { directoryCompare } = require('./utils/helper')

if (process.argv.length === 4) { /** Compare two files */
    const [, , path1, path2] = process.argv
    const data1 = JSON.parse(fs.readFileSync(path1))
    const data2 = JSON.parse(fs.readFileSync(path2))
    const score = compare(data1, data2)
    console.log(score)
} else if (process.argv.length === 3) { /** Compare all the files in a directory */
    directoryCompare(process.argv[2])
} else console.log('Error: requires at least one argument.'
    + '\n\tmain.js[directory name]- directory analysis'
    + '\n\tmain.js[file path1][file path2] - file comparison')