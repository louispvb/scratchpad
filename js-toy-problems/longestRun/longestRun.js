/**
 * Write a function that, given a string, Finds the longest run of identical
 * characters and returns an array containing the start and end indices of
 * that run. If there are two runs of equal length, return the first one.
 * For example:
 *
 *   longestRun("abbbcc") // [1, 3]
 *   longestRun("aabbc")  // [0, 1]
 *   longestRun("abcd")   // [0, 0]
 *   longestRun("")       // [0, 0]
 *
 * Try your function with long, random strings to make sure it handles large
 * inputs well.
 */

var longestRun = function (string) {
  let charsMap = string.split('').reduce((acc, c, i) => {
    if (acc[c] === undefined) {
      acc[c] = [i, 0];
    } else if (acc.lastChar === c) {
      acc[c][1]++;
    }
    acc.lastChar = c;
    return acc;
  }, {lastChar: ''});
  let results = [];
  for (let c in charsMap) {
    Array.isArray(charsMap[c]) && results.push(charsMap[c]);
  }
  let first = results.sort((a, b) => b[1] - a[1])[0];
  return first ? [first[0], first[0] + first[1]] : null;
};

// If you need a random string generator, use this!
// (you wont need this function for your solution but it may help with testing)
var randomString = function (len) {
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
