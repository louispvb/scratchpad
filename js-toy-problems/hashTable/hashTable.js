/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */

 // This is a "hashing function". You don't need to worry about it, just use it
 // to turn any string into an integer that is well-distributed between
 // 0 and max - 1
 var getIndexBelowMaxForKey = function(str, max){
   var hash = 0;
   for (var i = 0; i < str.length; i++) {
     hash = (hash<<5) + hash + str.charCodeAt(i);
     hash = hash & hash; // Convert to 32bit integer
     hash = Math.abs(hash);
   }
   return hash % max;
 };

var makeHashTable = function(){
  var result = {};
  var storage = [];
  var storageLimit = 1000;
  var getIdx = str => getIndexBelowMaxForKey(str, storageLimit);

  result.insert = function(key, value) {
    const idx = getIdx(key);
    storage[idx] = storage[idx] || [];
    const bucket = storage[idx];
    let updatedFlag = false;
    for (let i = 0; i < bucket.length; i++) {
      const ikey = bucket[i][0];
      if (ikey === key) {
        bucket[i] = [key, value];
        updatedFlag = true;
      }
    }
    !updatedFlag && bucket.push([key, value]);
  };
  result.retrieve = function(key){
    const bucket = storage[getIdx(key)];
    if (!bucket) return;
    const ret = bucket.filter(([k]) => k === key)[0];
    if (ret) return ret[1];
    else return;
  };

  result.remove = function(key){
    const bucket = storage[getIdx(key)];
    for (let i = 0; i < bucket.length; i++) {
      const ikey = bucket[i][0];
      if (ikey === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  return result;
};

let deq = (a, b) => {if (typeof a === 'object' && typeof b === 'object') {for (let k in a) { if (!deepEquals(a[k], b[k])) return false; }return Object.keys(a).length === Object.keys(b).length;}return a === b;};
let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(deq(x,y))?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  let hash = makeHashTable();
  hash.insert('apple', 3);
  hash.insert('banana', 1);
  hash.insert('cherry', 5);
  expect(hash.retrieve('banana'), 1);
  expect(hash.retrieve('apple'), 3);
  hash.remove('apple');
  hash.insert('banana', 2);
  expect(hash.retrieve('banana'), 2);
  // console.log(hash.retrieve('applefd'));
})();
