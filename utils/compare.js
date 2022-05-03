const { equals } = require('./helper')

/**
 * Compares the contents of two JSON derived objects irrespective of order or reference,
 * to grade the similarities on a 0 - 1 scale
 *
 * @param {Object} obj1 the first object to be compared
 * @param {Object} obj2 the second object to be compared
 * @param {boolean} log optional to display log information
 * @return {number} the floating point grade of similarities between the given objects
 */
module.exports = function (obj1, obj2, log = false) {
    if (!obj1 || !obj2) return 0
    if (equals(obj1, obj2)) return 1.0
    else {
        const total = Math.max(Object.keys(obj1).length, Object.keys(obj2).length)
        let score = 0
        const scoreSimilarity = (x, y, oldTotal, points = 1) => {
            const calcPoints = newTotal => points * (1 / newTotal)
            if (typeof x !== 'object') {
                if (x === y) {
                    if (log) console.log(`points: ${points.toFixed(4)}\t✅ ${x}`)
                    score += points
                }
            } else {
                const currTotal = (x && y) ? Math.max(Object.keys(x).length, Object.keys(y).length) : 0
                for (const key in x)
                    if (x && y)
                        scoreSimilarity(x[key], y[key], currTotal, calcPoints(oldTotal))
            }
        }
        for (const key in obj1)
            scoreSimilarity(obj1[key], obj2[key], total, undefined)
        if (log) console.log(`score: [${score.toFixed(4)} of ${total}] =>`, score / total)
        return score / total
    }
}