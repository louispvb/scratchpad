/*
 * Make an array method that can return whether or not a context array is a
 * subset of an input array.  To simplify the problem, you can assume that neither
 * array will contain objects or arrays as elements within them.
 *
 *
 * var a = ['commit','push']
 * a.isSubsetOf(['commit','rebase','push','blame']) // true
 *
 * NOTE: You should disregard duplicates in the set.
 *
 * var b = ['merge','reset','reset']
 *
 * b.isSubsetOf(['reset','merge','add','commit']) // true
 *
 * See http://en.wikipedia.org/wiki/Subset for more on the definition of a
 * subset.
*/

/*
 * Extra credit: Make the method work for arrays that contain objects and/or arrays as elements.
*/

Array.prototype.isSubsetOf = function(superset) {
  return this.reduce((acc, subsetElem) =>
    !superset.includes(subsetElem) ? false : true, true);
};

let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(x===y)?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  var a = ['commit','push'];
  expect(a.isSubsetOf(['commit','rebase','push','blame']), true);
  var b = ['merge','reset','reset'];
  expect(b.isSubsetOf(['reset','merge','add','commit']), true);
  expect(a.isSubsetOf(['reset','merge','add','commit']), false);
  expect([].isSubsetOf([]), true);
  expect([].isSubsetOf([1]), true);
})();
