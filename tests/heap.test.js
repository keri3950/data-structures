import { MaxBinaryHeap } from "../src/heaps/Heap.js";

describe("MaxBinaryHeap", () => {
  let heap;

  beforeEach(() => {
    heap = new MaxBinaryHeap();
  });

  describe("initial state", () => {
    test("starts with an empty values array", () => {
      expect(heap.values).toEqual([]);
    });
  });

  describe("insert", () => {
    test("inserts a value into an empty heap", () => {
      heap.insert(10);
      expect(heap.values).toEqual([10]);
    });

    test("maintains the heap property by bubbling up the inserted value", () => {
      heap.insert(41).insert(39).insert(33).insert(18).insert(27).insert(12);

      expect(heap.values[0]).toBe(41);

      heap.insert(55);

      expect(heap.values[0]).toBe(55);
      expect(heap.values).toEqual([55, 39, 41, 18, 27, 12, 33]);
    });

    test("returns the heap instance to allow for chaining", () => {
      const instance = heap.insert(10);
      expect(instance).toBe(heap);
    });
  });

  describe("extractMax", () => {
    test("returns undefined if the heap is empty", () => {
      expect(heap.extractMax()).toBeUndefined();
    });

    test("removes and returns the largest value from the heap", () => {
      heap.insert(41).insert(39).insert(55); // 55 is the max

      const maxValue = heap.extractMax();
      expect(maxValue).toBe(55);
    });

    test("correctly sinks down the new root to maintain the heap property", () => {
      heap
        .insert(41)
        .insert(39)
        .insert(33)
        .insert(18)
        .insert(27)
        .insert(12)
        .insert(55);

      heap.extractMax();

      expect(heap.values[0]).toBe(41);
      expect(heap.values).toEqual([41, 39, 33, 18, 27, 12]);
    });

    test("handles extracting the last element correctly", () => {
      heap.insert(100);
      const maxValue = heap.extractMax();

      expect(maxValue).toBe(100);
      expect(heap.values).toEqual([]);
    });

    test("returns all elements in descending order when called repeatedly", () => {
      const testValues = [41, 39, 33, 18, 27, 12, 55];
      testValues.forEach((val) => heap.insert(val));

      const sorted = [];
      while (heap.values.length > 0) {
        sorted.push(heap.extractMax());
      }

      expect(sorted).toEqual([55, 41, 39, 33, 27, 18, 12]);
    });
  });
});
