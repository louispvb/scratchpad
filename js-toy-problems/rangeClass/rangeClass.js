/**
 * Build a class to represent a range of numbers that takes:
 *   - a beginning index,
 *   - an end index (optional)
 *     If there is no end index, the range should include only the passed-in start value.
 *   - a 'step' (optional)
 *     The step is the interval at which elements are included.
 *     For instance, a step of 1 includes every element in the range,
 *     while a step of 2 includes every other element.
 *
 * The range should have a constructor that accepts these arguments in that order.
 *
 * It should also support the following utility functions:
 *   - size(): return the number of items represented by the range
 *   - each(callback(index)): iterate over the range, passing each value to a callback function
 *   - includes(index): return whether or not the range includes the passed value
 *
 * You should also be aware of the following caveats:
 *   - You should allow a negative value for 'step' to count backwards.
 *   - If no step is provided, it should default to 1.
 *   - If the start value is greater than the end value, assume we're counting backwards.
 *   - Should return null if we are given no 'start' value.
 *
 * Range should use constant space, even during the `each` method. i.e. you should *not*
 * use an Array as backing storage. Any given range could potentially be thousands of numbers long,
 * so find a way to represent the range without actually storing each element.
 *
 * USAGE EXAMPLES:
 * var myRange = new Range(0,10); // a new range representing the numbers between 0 and 10 (inclusively)
 *
 * var evenNumbers = new Range(2,8,2); // A range with the even numbers 2, 4, 6, and 8.
 * evenNumbers.each(function(val){
 *   console.log(val+"!");
 * });
 * console.log("Who do we appreciate!?");
 *
 * evenNumbers.size() should be 4
 * evenNumbers.includes(2) should be true, evenNumbers.includes(3) should be false
 */


var Range = function(start, end, step) {
  this.start = start;
  this.end = end === undefined ? start : end;
  this.span = Math.abs(start - end);
  this.step = step;
  if (step === undefined) {
    if (start > end) this.step = -1;
    else if (start < end) this.step = 1;
  }
  this.noSpan = step === 0 || (step > 0 && start > end) || (step < 0 && start < end);
};

Range.prototype.size = function () {
  return this.step === undefined ? 1 : Math.ceil((this.span + 1) / this.step);
};

Range.prototype.each = function (callback) {
  if (this.noSpan) return;
  let check = this.end > this.start ? (x => x <= this.end) : (x => x >= this.end);
  for (let i = this.start; check(i); i += this.step) { callback(i); }
};

Range.prototype.includes = function (val) {
  let math = (val - this.start) % this.step;
  return Number.isNaN(math) ? this.start === val : math === 0;
};

var range = new Range(1);

let deq = (a, b) => {if (typeof a === 'object' && typeof b === 'object') {for (let k in a) { if (!deq(a[k], b[k])) return false; } return Object.keys(a).length === Object.keys(b).length; } return a === b; };
let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(deq(x,y))?console.log(`   ${JSON.stringify(x)} === ${JSON.stringify(y)}\n`):null;

(()=>{
  var evenNumbers = new Range(2,8,2); // A range with the even numbers 2, 4, 6, and 8.
  expect(evenNumbers.size(), 4);
  expect(new Range(0,10).size(), 11);
  expect(new Range(1).size(), 1);
  expect(new Range(1).includes(1), true);
  expect(new Range(3,10).size(), 8);
  expect(new Range(-10,-3).size(), 8);
  expect(evenNumbers.includes(2), true);
  expect(evenNumbers.includes(3), false);
  expect(new Range(1,11).includes(3), true);
  expect(new Range(0,0).includes(1), false);
  let res = [];
  expect(res.length, 0);
  res = [];
  new Range(1,10,0).each(i => res.push(i));
  expect(res, []);
})();
