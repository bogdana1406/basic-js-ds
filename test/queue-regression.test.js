const assert = require('node:assert/strict');
const { Queue } = require('../src/queue.js');

describe('Queue underlying list structure', () => {
  it('returns plain linked nodes after enqueue', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    assert.deepStrictEqual(queue.getUnderlyingList(), {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: null
        }
      }
    });
  });

  it('returns plain linked nodes after dequeue', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    assert.strictEqual(queue.dequeue(), 1);

    assert.deepStrictEqual(queue.getUnderlyingList(), {
      value: 2,
      next: {
        value: 3,
        next: null
      }
    });
  });
});
