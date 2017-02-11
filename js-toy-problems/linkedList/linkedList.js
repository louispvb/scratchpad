/*
 * Implement a linked list using the pseudoclassical instantiation pattern.
 *
 * Your linked list should have methods called "addToTail", "removeHead", and "contains."
 *
 */

// EXAMPLE USAGE:
// var list = new LinkedList();
// list.tail;         //yields 'null'
// list.addToTail(4);
// list.addToTail(5);
// list.head.value;   //yields '4';
// list.contains(5);  //yields 'true';
// list.contains(6);  //yields 'false';
// list.removeHead(); //yields '4'
// list.tail.value;   //yields '5';

var Node = function(value) {
  this.value = value;
  this.next = null;
}

var LinkedList = function() {
  this.tail = this.head = null;
};

//write methods here!

LinkedList.prototype.addToTail = function(value) {
  const newNode = new Node(value);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
};

LinkedList.prototype.removeHead = function() {
  let oldHead = this.head;
  if (this.head === this.tail) {
    this.head = this.tail = null;
  } else {
    this.head = this.head.next;
  }
  return oldHead.value;
};

LinkedList.prototype.contains = function(value) {
  for (let node = this.head; node !== null; node = node.next) {
    if (node.value === value) return true;
  }
  return false;
};

LinkedList.prototype.makeNode = function(value) {
  return new Node(value);
};

let deq = (a, b) => {if (typeof a === 'object' && typeof b === 'object') {for (let k in a) { if (!deepEquals(a[k], b[k])) return false; }return Object.keys(a).length === Object.keys(b).length;}return a === b;};
let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(deq(x,y))?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  var list = new LinkedList();
  // console.log(list.tail)        //yields 'null'
  list.addToTail(4);
  list.addToTail(5);
  expect(list.head.value, 4);   //yields '4');
  expect(list.contains(5), true);  //yields 'true');
  expect(list.contains(6), false);  //yields 'false');
  expect(list.removeHead(), 4); //yields '4'
  expect(list.tail.value, 5);   //yields '5';
  var list = new LinkedList();
  list.addToTail(4);
  list.addToTail(5);
  expect(list.contains(4), true);
  expect(list.contains(5), true);
  expect(list.contains(6), false);
})();
