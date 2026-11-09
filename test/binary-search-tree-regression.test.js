const { assert } = require('chai');
const { BinarySearchTree } = require('../src/binary-search-tree.js');

describe('Binary search tree node removal', () => {
  it('replaces a removed root without losing the successor subtree', () => {
    const tree = new BinarySearchTree();
    [10, 5, 15, 12, 13, 20].forEach(value => tree.add(value));
    const removedRoot = tree.root();
    const successor = tree.find(12);

    tree.remove(10);

    assert.strictEqual(tree.root(), successor);
    assert.notStrictEqual(tree.root(), removedRoot);
    assert.strictEqual(tree.root().left.data, 5);
    assert.strictEqual(tree.root().right.left.data, 13);
    assert.strictEqual(tree.root().right.right.data, 20);
    assert.isFalse(tree.has(10));
  });

  it('removes an internal node with two children', () => {
    const tree = new BinarySearchTree();
    [20, 10, 30, 5, 15, 12, 17].forEach(value => tree.add(value));
    const removedNode = tree.find(10);
    const successor = tree.find(12);

    tree.remove(10);

    assert.strictEqual(tree.root().left, successor);
    assert.notStrictEqual(tree.root().left, removedNode);
    assert.deepEqual([tree.min(), tree.max()], [5, 30]);
    assert.isFalse(tree.has(10));
  });
});
