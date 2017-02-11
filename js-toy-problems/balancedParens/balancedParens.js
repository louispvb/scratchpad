/*
 * write a function that takes a string of text and returns true if
 * the parentheses are balanced and false otherwise.
 *
 * Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens('[(]{)}'); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *
 */

var balancedParens = function(input) {
  let parenType = {'(': 0, ')': 0, '[': 1, ']': 1, '{': 2, '}': 2};
  let parens = input.split('').reduce((acc, c) => {
    if (acc.counts.filter(x => x < 0).length !== 0) return acc;
    let parenNo = parenType[c];
    if ('([{'.includes(c)) {
      acc.counts[parenNo]++;
    } else if (')]}'.includes(c)) {
      if (acc.lastParenNo !== null
          && acc.counts[acc.lastParenNo] !== 0
          && acc.lastParenNo !== parenNo) {
        console.log(acc, parenNo, c);
        return acc;
      }
      acc.counts[parenNo]--;
    }
    parenNo !== undefined && (acc.lastParenNo = parenNo);
    return acc;
  }, {counts: [0, 0, 0], lastParenNo: null });
  if (parens.counts.filter(x => x !== 0).length !== 0) return false;
  return true;
};

let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(x===y)?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  expect(balancedParens('('), false);
  expect(balancedParens('()'), true);
  expect(balancedParens(')('), false);
  expect(balancedParens('(())'), true);
  expect(balancedParens('[](){}'), true);
  expect(balancedParens('[({})]'), true);
  expect(balancedParens('[(]{)}'), false);
  expect(balancedParens('return { name: "Bertrand Russell", birthday: getBirthday({who:self}) };'), true);
  // expect(balancedParens(' var wow  = { yo: thisIsAwesome() }'), true);
})();
