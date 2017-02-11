/**
 * Write a stack using your preferred instantiation pattern.
 * Avoid using native array methods i.e., push, pop, and length.
 * Once you're done, implement a queue using two stacks.
 */

class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
  }
}

/**
  * Stack Class
  */
class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
  }
  // add an item to the top of the stack
  push(val) {
    if (!this.bottom) {
      this.bottom = new Node(val);
      this.top = this.bottom;
      this.top.prev = null;
    } else {
      const oldTop = this.top;
      this.top = new Node(val);
      this.top.prev = oldTop;
    }
  };

  // remove an item from the top of the stack
  pop() {
    const oldTop = this.top;
    if (this.bottom === this.top) {
      this.top = null;
      this.bottom = null;
    } else {
      this.top = this.top.prev;
    }
    return oldTop && oldTop.val;
  };

  // return the number of items in the stack
  size() {
    let count = 0;
    if (!this.top) return 0;
    if (this.top && this.top.prev === null) return 1;
    for (let node = this.top; node.prev !== null; node = node.prev, count++);
    return count + 1;
  };
};

/**
  * Queue Class
  */
class Queue {
  // Use two `stack` instances to implement your `queue` Class
  constructor() {
    this.inbox = new Stack();
    this.outbox = new Stack();
  }

  // called to add an item to the `queue`
  enqueue(val) {
    this.inbox.push(val);
  };
// 4 5 6
// 6 5 4
  // called to remove an item from the `queue`
  dequeue() {
    if (this.outbox.size() === 0) this._refillOutbox();
    return this.outbox.pop();
  };

  _refillOutbox() {
    for (let val = this.inbox.pop(); val !== null; val = this.inbox.pop()) {
      this.outbox.push(val);
    }
  }
  // should return the number of items in the queue
  size() {
    return this.inbox.size() + this.outbox.size();
  };
};

let deq = (a, b) => {if (typeof a === 'object' && typeof b === 'object') {for (let k in a) { if (!deepEquals(a[k], b[k])) return false; }return Object.keys(a).length === Object.keys(b).length;}return a === b;};
let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(deq(x,y))?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  const stack = new Stack();
  expect(stack.size(), 0);
  stack.push(1);
  stack.push(2);
  expect(stack.pop(), 2);
  expect(stack.pop(), 1);
  const q = new Queue();
  q.enqueue(0);
  q.enqueue(1);
  expect(q.size(), 2);
  expect(q.dequeue(), 0);
  q.enqueue(2);
  expect(q.size(), 2);
  expect(q.dequeue(), 1);
  q.enqueue(3);
  q.enqueue(4);
  expect(q.size(), 3);
  expect(q.dequeue(), 2);
  expect(q.dequeue(), 3);
  expect(q.dequeue(), 4);
  expect(q.size(), 0);
})();
