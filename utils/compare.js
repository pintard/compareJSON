const { equals, maxObjectLength: max } = require('./helper')

/**
 * Compares the contents of two JSON derived objects irrespective of order or reference,
 * to GRADE the similarities on a 0 - 1 scale
 *
 * @param {Object} obj1 the first object to be compared
 * @param {Object} obj2 the second object to be compared
 * @param {boolean} log optional to display log information
 * @return {number} the floating point GRADE of similarities between the given objects
 */
module.exports = function (obj1, obj2, log = false) {
    if (!obj1 || !obj2) return 0
    if (equals(obj1, obj2)) return 1.0
    else {
        const total = max(obj1, obj2)
        let score = 0

        const calcScore = (x, y, oldTotal, points = 1) => {
            if (typeof x !== 'object') {
                if (x === y) {
                    log && console.log(`✅ [${points.toFixed(4)} points]: ${x}`)
                    score += points
                }
            } else {
                const currPoints = points * (1 / oldTotal)
                const currTotal = (x && y) ? max(x, y) : 0
                for (const key in x) if (x && y) calcScore(x[key], y[key], currTotal, currPoints)
            }
        }

        for (const key in obj1) calcScore(obj1[key], obj2[key], total)

        const GRADE = score / total
        log && console.log(`[${score} of ${total}] =>`, GRADE)
        return GRADE
    }
}