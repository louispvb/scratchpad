/**
 * Given an arbitrary input string, return the first nonrepeated character in
 * the string. For example:
 *
 *   firstNonRepeatedCharacter('ABA'); // => 'B'
 *   firstNonRepeatedCharacter('AACBDB'); // => 'C'
 */

var firstNonRepeatedCharacter = function(string) {
  let characterCounts = {};
  for (let char of string) {
    characterCounts[char] = characterCounts[char] === undefined ? 0 : characterCounts[char]+1;
  }
  for (let char of string) {
    if (characterCounts[char] === 0) return char;
  }
  return;
};

let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(x===y)?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  expect(firstNonRepeatedCharacter('aaabcc'), 'b');
  expect(firstNonRepeatedCharacter(''), undefined);
  expect(firstNonRepeatedCharacter('abbcccd'), 'a');
  expect(firstNonRepeatedCharacter('abc'), 'a');
  expect(firstNonRepeatedCharacter('aabbc'), 'c');
})();
