class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  #values = [];

  enqueue(val, priority) {
    let node = new Node(val, priority);
    this.#values.push(node);
    this.#bubbleUp();
    return this;
  }

  #bubbleUp() {
    let index = this.#values.length - 1;
    const element = this.#values[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.#values[parentIndex];

      if (element.priority >= parent.priority) {
        break;
      }

      [this.#values[parentIndex], this.#values[index]] = [
        this.#values[index],
        this.#values[parentIndex],
      ];

      index = parentIndex;
    }
  }

  dequeue() {
    const min = this.#values[0];
    const end = this.#values.pop();

    if (this.#values.length > 0) {
      this.#values[0] = end;
      this.#sinkDown();
    }

    return min;
  }

  #sinkDown() {
    let index = 0;
    const length = this.#values.length;
    const element = this.#values[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swapIndex = null;

      if (leftChildIndex < length) {
        leftChild = this.#values[leftChildIndex];

        if (leftChild.priority < element.priority) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.#values[rightChildIndex];

        if (
          (swapIndex === null && rightChild.priority < element.priority) ||
          (swapIndex !== null && rightChild.priority < leftChild.priority)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;

      [this.#values[index], this.#values[swapIndex]] = [
        this.#values[swapIndex],
        this.#values[index],
      ];

      index = swapIndex;
    }
  }

  get values() {
    return [...this.#values];
  }
}

export { PriorityQueue };
