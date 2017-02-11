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
function getLargestSubstringsRemoved(str) {
  return _.map(str, (c, i) => [c, i]);
}

function scoreMatch(str1, str2) {
  if (str1.includes(str2)) return 9001;


}
function pickMostSimilar(options, str) {
  _.map(options, opt => {
    // make both lowercase
  })
}

console.log(getLargestSubstringsRemoved('ethiopa'));
