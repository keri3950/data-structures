class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;

    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let current = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = current.prev;
      this.tail.next = null;
      current.prev = null;
    }

    this.length--;

    return current;
  }

  shift() {
    if (!this.head) return undefined;

    let current = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = current.next;
      this.head.prev = null;
      current.next = null;
    }

    this.length--;

    return current;
  }

  unshift(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }

    this.length++;

    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;

    const half = Math.floor(this.length / 2);
    let current;

    if (index <= half) {
      current = this.head;

      for (let i = 0; i < index; i++) {
        current = current.next;
      }

      return current;
    } else {
      current = this.tail;

      for (let i = this.length - 1; i > index; i--) {
        current = current.prev;
      }

      return current;
    }
  }

  set(index, val) {
    let foundNode = this.get(index);

    if (foundNode) {
      foundNode.val = val;
      return true;
    }

    return false;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return false;

    if (index === 0) return !!this.unshift(val);

    if (index === this.length) return !!this.push(val);

    const node = new Node(val);
    const prevNode = this.get(index - 1);
    const currentNode = prevNode.next;

    prevNode.next = node;
    currentNode.prev = node;

    node.next = currentNode;
    node.prev = prevNode;

    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;

    if (index === 0) return this.shift();

    if (index === this.length - 1) return this.pop();

    const removedNode = this.get(index);
    const prevNode = removedNode.prev;
    const nextNode = removedNode.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;

    removedNode.next = null;
    removedNode.prev = null;

    this.length--;

    return removedNode;
  }
}

export { DoublyLinkedList, Node };
