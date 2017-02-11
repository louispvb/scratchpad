/**
 * Write a function `f(a, b)` which takes two strings as arguments and returns a
 * string containing the characters found in both strings (without duplication), in the
 * order that they appeared in `a`. Remember to skip spaces and characters you
 * have already encountered!
 *
 * Example: commonCharacters('acexivou', 'aegihobu')
 * Returns: 'aeiou'
 *
 * Extra credit: Extend your function to handle more than two input strings.
 */



var commonCharacters = function(string1, string2) {
  return Array.prototype.slice.call(arguments).reduce((acc, s) => {
    let scanned = [];
    return acc.split('').filter(c => {
      let pass = s.includes(c) && !scanned.includes(c);
      scanned.push(c);
      return pass;
    }).join('');
  });
};

let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(x===y)?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  expect(commonCharacters('acexivou', 'aegihobu'), 'aeiou');
  expect(commonCharacters('acexivou', 'aegihobu', 'aeou'), 'aeou');
  //appears in order of first arg
  expect(commonCharacters('acexivou', 'ubohigea'), 'aeiou');
  expect(commonCharacters('', 'where is waldo'), '');
  expect(commonCharacters('all mimsy were the borogroves', ''), '');
  //no duplicates
  expect(commonCharacters('aaa', 'aa'), 'a');
})();
