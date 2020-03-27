module.exports.rounder = (numberToRound) => {
    return Math.round(numberToRound * 10000) / 10000
}