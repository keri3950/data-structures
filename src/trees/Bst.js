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

  bfs() {
    let node = this.root,
      result = [],
      queue = [];

    if (!this.root) {
      return result;
    }

    queue.push(node);

    while (queue.length > 0) {
      node = queue.shift();
      result.push(node.value);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    return result;
  }

  dfsPreOrder() {
    let result = [];

    function traverse(node) {
      if (node === null) {
        return;
      }

      result.push(node.value);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);

    return result;
  }

  dfsPostOrder() {
    let result = [];

    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);
      traverse(node.right);
      result.push(node.value);
    }

    traverse(this.root);

    return result;
  }

  dfsInOrder() {
    let result = [];

    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    }

    traverse(this.root);

    return result;
  }
}

export { Node, BinarySearchTree };
