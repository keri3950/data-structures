import { Queue } from "../src/stacks-queues/Queues";

describe("Queue", () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  describe("initial state", () => {
    test("starts empty with size 0", () => {
      expect(queue.first).toBeNull();
      expect(queue.last).toBeNull();
      expect(queue.size).toBe(0);
    });
  });

  describe("enqueue", () => {
    test("adds an item to an empty queue", () => {
      queue.enqueue(10);
      expect(queue.first.value).toBe(10);
      expect(queue.last.value).toBe(10);
      expect(queue.size).toBe(1);
    });

    test("adds an item to the end of a non-empty queue", () => {
      queue.enqueue(10);
      queue.enqueue(20);
      expect(queue.first.value).toBe(10); // First item remains the same
      expect(queue.last.value).toBe(20); // New item becomes the last
      expect(queue.size).toBe(2);
    });

    test("returns the new size", () => {
      expect(queue.enqueue("a")).toBe(1);
      expect(queue.enqueue("b")).toBe(2);
    });
  });

  describe("dequeue", () => {
    test("returns null if the queue is empty", () => {
      expect(queue.dequeue()).toBeNull();
    });

    test("removes and returns the value from the front of the queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);

      const removedValue = queue.dequeue();
      expect(removedValue).toBe(1); // FIFO: The first item added is removed
      expect(queue.size).toBe(1);
      expect(queue.first.value).toBe(2);
      expect(queue.last.value).toBe(2);
    });

    test("correctly resets the queue when the last item is dequeued", () => {
      queue.enqueue(42);

      const removedValue = queue.dequeue();
      expect(removedValue).toBe(42);
      expect(queue.size).toBe(0);
      expect(queue.first).toBeNull();
      expect(queue.last).toBeNull();
    });
  });
});
