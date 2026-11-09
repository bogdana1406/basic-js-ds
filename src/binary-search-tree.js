const { Node } = require('../extensions/list-tree.js');

/** A binary search tree whose nodes use the provided Node class. */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (this._root === null) {
      this._root = new Node(data);
      return;
    }

    let current = this._root;
    while (current !== null) {
      if (data === current.data) return;

      const side = data < current.data ? 'left' : 'right';
      if (current[side] === null) {
        current[side] = new Node(data);
        return;
      }
      current = current[side];
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this._root;
    while (current !== null) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    let parent = null;
    let current = this._root;

    while (current !== null && current.data !== data) {
      parent = current;
      current = data < current.data ? current.left : current.right;
    }
    if (current === null) return;

    let replacement;
    if (current.left !== null && current.right !== null) {
      let successorParent = current;
      let successor = current.right;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }
      if (successorParent !== current) {
        successorParent.left = successor.right;
        successor.right = current.right;
      }
      successor.left = current.left;
      replacement = successor;
    } else {
      replacement = current.left !== null ? current.left : current.right;
    }

    if (parent === null) {
      this._root = replacement;
    } else if (parent.left === current) {
      parent.left = replacement;
    } else {
      parent.right = replacement;
    }
  }

  min() {
    let current = this._root;
    if (current === null) return null;
    while (current.left !== null) current = current.left;
    return current.data;
  }

  max() {
    let current = this._root;
    if (current === null) return null;
    while (current.right !== null) current = current.right;
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};
