import { Stack } from "../src/stacks/stacks";

describe("Stack", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  describe("initial state", () => {
    test("starts empty with size 0", () => {
      expect(stack.first).toBeNull();
      expect(stack.last).toBeNull();
      expect(stack.size).toBe(0);
    });
  });

  describe("push", () => {
    test("adds an item to an empty stack", () => {
      stack.push(10);
      expect(stack.first.val).toBe(10);
      expect(stack.last.val).toBe(10);
      expect(stack.size).toBe(1);
    });

    test("adds an item to the top of a non-empty stack", () => {
      stack.push(10);
      stack.push(20);
      expect(stack.first.val).toBe(20);
      expect(stack.last.val).toBe(10);
      expect(stack.size).toBe(2);
    });

    test("returns the new size", () => {
      expect(stack.push("a")).toBe(1);
      expect(stack.push("b")).toBe(2);
    });
  });

  describe("pop", () => {
    test("returns null if the stack is empty", () => {
      expect(stack.pop()).toBeNull();
    });

    test("removes and returns the value from the top of the stack", () => {
      stack.push(1);
      stack.push(2);

      const removedValue = stack.pop();
      expect(removedValue).toBe(2);
      expect(stack.size).toBe(1);
      expect(stack.first.val).toBe(1);
    });

    test("correctly resets the stack when the last item is popped", () => {
      stack.push(42);

      const removedValue = stack.pop();
      expect(removedValue).toBe(42);
      expect(stack.size).toBe(0);
      expect(stack.first).toBeNull();
      expect(stack.last).toBeNull();
    });
  });
});
