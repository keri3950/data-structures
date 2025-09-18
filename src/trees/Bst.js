class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let node = new Node(value);
    let current = this.root;

    if (this.root === null) {
      this.root = node;
      return this;
    }

    while (true) {
      if (value === current.value) {
        return undefined;
      }

      if (value < current.value) {
        if (current.left === null) {
          current.left = node;
          return this;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          return this;
        }

        current = current.right;
      }
    }
  }

  find(value) {
    if (this.root === null) {
      return null;
    }

    let current = this.root;

    while (current !== null) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return current;
      }
    }

    return null;
  }

  contains(value) {
    if (this.root === null) {
      return false;
    }

    let current = this.root;

    while (current !== null) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return true;
      }
    }

    return false;
  }
}

export { Node, BinarySearchTree };
