/**
  * Write a function that, given two objects, returns whether or not the two
  * are deeply equivalent--meaning the structure of the two objects is the
  * same, and so is the structure of each of their corresponding descendants.
  *
  * Examples:
  *
  * deepEquals({a:1, b: {c:3}},{a:1, b: {c:3}}); // true
  * deepEquals({a:1, b: {c:5}},{a:1, b: {c:6}}); // false
  *
  * don't worry about handling cyclical object structures.
  *
  */
var deepEquals = function(apple, orange) {
  if (typeof apple === 'object' && typeof orange === 'object') {
    let ret = true;
    for (let k in apple) { if (!deepEquals(apple[k], orange[k])) ret = false; }
    for (let k in orange) { if (!deepEquals(apple[k], orange[k])) ret = false; }
    return ret;
  }
  return apple === orange;
};


let deq = (a, b) => {if (typeof a === 'object' && typeof b === 'object') {for (let k in a) { if (!deepEquals(a[k], b[k])) return false; }return Object.keys(a).length === Object.keys(b).length;}return a === b;};
let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(deq(x,y))?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  expect(deepEquals({a:1, b: {c:3}},{a:1, b: {c:3}}), true); // true
  expect(deepEquals({a:1, b: {c:5}},{a:1, b: {c:6}}), false); // false
  expect(deepEquals({a:1, b: {c:3, b:5}},{a:1, b: {c:3}}), false);
  expect(deepEquals({a:1, b: 2},{a:1, b: {c:3}}), false);
  expect(deepEquals({},{a:1, b: {c:3}}), false);
  expect(deepEquals({a:1, b: {c:3, d: {e: {}}}},{a:1, b: {c:3, d: {e: {}}}}), true);
  expect(deepEquals({a:1, b: {c:3}},{a:1, b: {c:3}, d: 5}), false);
})();

// let deq = (a, b) => {if (typeof a === 'object' && typeof b === 'object') {for (let k in a) { if (!deepEquals(a[k], b[k])) return false; }return Object.keys(a).length === Object.keys(b).length;}return a === b;};
// let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
// let expect=(x,y)=>!assert(deq(x,y))?console.log(`   ${x} === ${y}\n`):null;
//
// (()=>{
//   expect(,);
// })();
