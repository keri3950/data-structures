import { PriorityQueue } from "../src/priority-queue/PriorityQueue.js";

describe("PriorityQueue", () => {
  let priorityQueue;

  beforeEach(() => {
    priorityQueue = new PriorityQueue();
  });

  describe("initial state", () => {
    test("starts with an empty values array", () => {
      expect(priorityQueue.values).toEqual([]);
    });
  });

  describe("enqueue", () => {
    test("adds a new node to an empty queue", () => {
      priorityQueue.enqueue("task one", 1);
      expect(priorityQueue.values.length).toBe(1);
      expect(priorityQueue.values[0].val).toBe("task one");
      expect(priorityQueue.values[0].priority).toBe(1);
    });

    test("maintains the min-heap property by bubbling up the item with the lowest priority", () => {
      priorityQueue.enqueue("high priority", 5);
      priorityQueue.enqueue("medium priority", 3);
      priorityQueue.enqueue("low priority", 1); // This should be at the root

      expect(priorityQueue.values[0].val).toBe("low priority");
      expect(priorityQueue.values[0].priority).toBe(1);
    });

    test("handles items with the same priority", () => {
      priorityQueue.enqueue("task A", 3);
      priorityQueue.enqueue("task B", 1);
      priorityQueue.enqueue("task C", 3);

      expect(priorityQueue.values[0].priority).toBe(1);
    });
  });

  describe("dequeue", () => {
    test("returns undefined if the queue is empty", () => {
      expect(priorityQueue.dequeue()).toBeUndefined();
    });

    test("removes and returns the node with the lowest priority", () => {
      priorityQueue.enqueue("high", 5);
      priorityQueue.enqueue("low", 1);
      priorityQueue.enqueue("medium", 3);

      const removedNode = priorityQueue.dequeue();
      expect(removedNode.val).toBe("low");
      expect(removedNode.priority).toBe(1);
    });

    test("correctly sinks down the new root to maintain the heap property", () => {
      priorityQueue.enqueue("A", 1);
      priorityQueue.enqueue("B", 2);
      priorityQueue.enqueue("C", 3);
      priorityQueue.enqueue("D", 4);
      priorityQueue.enqueue("E", 5);

      expect(priorityQueue.values[0].val).toBe("A");

      priorityQueue.dequeue();

      expect(priorityQueue.values[0].val).toBe("B");
      expect(priorityQueue.values[0].priority).toBe(2);
    });

    test("handles dequeuing the last element", () => {
      priorityQueue.enqueue("lonely task", 10);
      const removedNode = priorityQueue.dequeue();

      expect(removedNode.val).toBe("lonely task");
      expect(priorityQueue.values).toEqual([]);
    });

    test("returns all nodes in ascending order of priority when called repeatedly", () => {
      priorityQueue.enqueue("walk dog", 5);
      priorityQueue.enqueue("pay bills", 2);
      priorityQueue.enqueue("file taxes", 1);
      priorityQueue.enqueue("do laundry", 4);
      priorityQueue.enqueue("make dinner", 3);

      const resultOrder = [];
      while (priorityQueue.values.length > 0) {
        resultOrder.push(priorityQueue.dequeue().val);
      }

      expect(resultOrder).toEqual([
        "file taxes",
        "pay bills",
        "make dinner",
        "do laundry",
        "walk dog",
      ]);
    });
  });
});
