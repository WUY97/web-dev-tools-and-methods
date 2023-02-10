// game = {
//     id: str;
//     username: str;
//     effective: boolean -> default to be true, when start a new game current one turns false
//     secret: str -> determined when starting a new game
//     candidates: [str1, str2, str3] -> in the beginning all the words are filled in
//     previous: [str1, str2, str3] -> from left to right least to most recent
// }

// games = [
//     username: {
//         currentGame: game,
//         previousGame: [game1, game2, game3, ...],
//     }
// ]

// game = [
//     secret: str,
//     candidates: [str1, str2, str3, ...]
//     previous: [str1, str2, str3, ...] all incorrent valid guess goes here
// ]

// games[username].currentGAME = {}
// games[username].previousGame = [{}, {}, {}]

const games = {};

module.exports = games;