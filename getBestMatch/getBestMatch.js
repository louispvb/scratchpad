// ALOGIRTHM
// Get largest substrings
   // Start searching for largest substrings
   // If found substr add to list `matchSubstr` as ms
   // Add to list as [pos of sub in orig string, substr length]
   // Remove substr from looped scanned substr
   // Try find smaller substr
// Find max in order substrs
   // let scores
   // For each substr `s` in `ms`
       // score = s length
       // For each substr `j` in `ms`.slice(s.idx)
         // score += j length if s idx < j idx (in order)
   // return max scores
var _ = require('lodash');

function scoreMatch(str1, str2) {
  let subStrs = getLargestSubstringsRemoved(str1, str2);
  let scores = _.map(subStrs, ([i, l], si) => {
    let score = l;
    _.each(subStrs.slice(si + 1), ([j, l2]) => {
      if (i < j) {
        score += l2;
      }
    });
    return score;
  });
  return _.max(scores);
}

function getLargestSubstringsRemoved(str1, str2) {
  let subStrs = [];
  let set = str1.slice();
  for (let len = str1.length; len > 0; len--) {
    for (let j = 0; j + (len - 1) < str1.length; j++) {
      let s = str1.slice(j, j + len);
      let setIdx = set.indexOf(s);
      if (setIdx !== -1) {
        let idx = str2.indexOf(s);
        if (idx !== -1) {
          subStrs.push([idx, len, j]);
          set = set.slice(0,setIdx) + set.slice(setIdx + len)
        }
      }
    }
  }
  return _.uniqBy(subStrs, ([i, l]) => i)
    .sort((a,b) => a[2] - b[2]);
}


function pickMostSimilar(str, options) {
  str = _.lowerCase(str);
  let optionScores = _.map(options, (opt, i) => {
    let optl = _.lowerCase(opt);
    return [i, scoreMatch(str, optl)];
  });
  let optionIdx = _.maxBy(optionScores, ([idx, score]) => score)[0];
  return options[optionIdx];
}

console.log(pickMostSimilar('iftheopea', ['finland','america','ethiopia','korea']));
