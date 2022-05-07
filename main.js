const { directoryCompare, fileCompare } = require('./utils/helper')

const [, , ...args] = process.argv

if (process.argv.length === 4) fileCompare(args[0], args[1])
else if (process.argv.length === 3) directoryCompare(args[0])
else console.error('Error: requires at least one argument.'
    + '\n\tmain.js[directory name] - directory analysis'
    + '\n\tmain.js[file path1][file path2] - file comparison')
