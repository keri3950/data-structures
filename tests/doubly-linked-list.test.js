import { DoublyLinkedList } from "../src/doubly-linked-lists/DoublyLinkedList.js";

describe("DoublyLinkedList", () => {
  let list;

  beforeEach(() => {
    list = new DoublyLinkedList();
  });

  describe("initial state", () => {
    test("starts empty", () => {
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
    });
  });

  describe("push", () => {
    test("adds to end, sets head/tail, links prev/next, updates length", () => {
      list.push(1);
      expect(list.head.val).toBe(1);
      expect(list.tail.val).toBe(1);
      expect(list.length).toBe(1);

      list.push(2);
      expect(list.head.val).toBe(1);
      expect(list.tail.val).toBe(2);
      expect(list.head.next.val).toBe(2);
      expect(list.tail.prev.val).toBe(1);
      expect(list.length).toBe(2);
    });

    test("returns the list (chainable)", () => {
      expect(list.push(1)).toBe(list);
    });
  });

  describe("pop", () => {
    test("returns undefined when empty", () => {
      expect(list.pop()).toBeUndefined();
    });

    test("removes last node, fixes tail links, updates length", () => {
      list.push(1).push(2).push(3);
      const removed = list.pop();
      expect(removed.val).toBe(3);
      expect(list.tail.val).toBe(2);
      expect(list.tail.next).toBeNull();
      expect(list.length).toBe(2);
    });

    test("resets head/tail on last removal", () => {
      list.push("x");
      const removed = list.pop();
      expect(removed.val).toBe("x");
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
    });
  });

  describe("shift", () => {
    test("returns undefined when empty", () => {
      expect(list.shift()).toBeUndefined();
    });

    test("removes first node, fixes head links, updates length", () => {
      list.push(1).push(2).push(3);
      const removed = list.shift();
      expect(removed.val).toBe(1);
      expect(list.head.val).toBe(2);
      expect(list.head.prev).toBeNull();
      expect(list.length).toBe(2);
    });

    test("resets head/tail on last removal", () => {
      list.push("y");
      const removed = list.shift();
      expect(removed.val).toBe("y");
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
    });
  });

  describe("unshift", () => {
    test("adds to front, links prev/next, updates length", () => {
      list.unshift(2);
      expect(list.head.val).toBe(2);
      expect(list.tail.val).toBe(2);
      expect(list.length).toBe(1);

      list.unshift(1);
      expect(list.head.val).toBe(1);
      expect(list.head.next.val).toBe(2);
      expect(list.tail.prev.val).toBe(1);
      expect(list.length).toBe(2);
    });

    test("returns the list (chainable)", () => {
      expect(list.unshift(1)).toBe(list);
    });
  });

  describe("get", () => {
    beforeEach(() => {
      list.push("a").push("b").push("c").push("d");
    });

    test("returns null for out-of-bounds", () => {
      expect(list.get(-1)).toBeNull();
      expect(list.get(4)).toBeNull();
      expect(list.get(999)).toBeNull();
    });

    test("returns correct nodes (forward and backward search paths)", () => {
      // Near head
      expect(list.get(0).val).toBe("a");
      expect(list.get(1).val).toBe("b");

      // Near tail
      expect(list.get(2).val).toBe("c");
      expect(list.get(3).val).toBe("d");
    });
  });

  describe("set", () => {
    test("returns false for invalid index", () => {
      list.push(1);
      expect(list.set(5, 100)).toBe(false);
    });

    test("updates node value and returns true", () => {
      list.push(1).push(2).push(3);
      const ok = list.set(1, 200);
      expect(ok).toBe(true);
      expect(list.get(1).val).toBe(200);
    });
  });

  describe("insert", () => {
    test("returns false for invalid index", () => {
      expect(list.insert(-1, 10)).toBe(false);
      expect(list.insert(1, 10)).toBe(false);
    });

    test("inserts at head (index 0)", () => {
      const ok = list.insert(0, "start");
      expect(ok).toBe(true);
      expect(list.head.val).toBe("start");
      expect(list.tail.val).toBe("start");
      expect(list.length).toBe(1);
      expect(list.head.prev).toBeNull();
      expect(list.tail.next).toBeNull();
    });

    test("inserts at tail (index === length)", () => {
      list.push(1).push(2);
      const ok = list.insert(2, 3);
      expect(ok).toBe(true);
      expect(list.tail.val).toBe(3);
      expect(list.tail.prev.val).toBe(2);
      expect(list.length).toBe(3);
    });

    test("inserts in the middle and stitches both directions", () => {
      list.push(1).push(3);
      const ok = list.insert(1, 2);
      expect(ok).toBe(true);

      const n0 = list.get(0);
      const n1 = list.get(1);
      const n2 = list.get(2);

      expect(n0.val).toBe(1);
      expect(n1.val).toBe(2);
      expect(n2.val).toBe(3);

      expect(n0.next).toBe(n1);
      expect(n1.next).toBe(n2);

      expect(n1.prev).toBe(n0);
      expect(n2.prev).toBe(n1);

      expect(list.length).toBe(3);
    });
  });

  describe("remove", () => {
    test("returns undefined for invalid index", () => {
      expect(list.remove(0)).toBeUndefined();
      list.push(1);
      expect(list.remove(-1)).toBeUndefined();
      expect(list.remove(1)).toBeUndefined();
    });

    test("removes head and fixes links", () => {
      list.push("a").push("b").push("c"); // [a,b,c]
      const removed = list.remove(0);
      expect(removed.val).toBe("a");
      expect(list.head.val).toBe("b");
      expect(list.head.prev).toBeNull();
      expect(list.length).toBe(2);
    });

    test("removes tail and fixes links", () => {
      list.push(1).push(2).push(3); // [1,2,3]
      const removed = list.remove(2);
      expect(removed.val).toBe(3);
      expect(list.tail.val).toBe(2);
      expect(list.tail.next).toBeNull();
      expect(list.length).toBe(2);
    });

    test("removes from middle and stitches both directions", () => {
      list.push(1).push(2).push(3).push(4);
      const removed = list.remove(2);
      expect(removed.val).toBe(3);

      const n1 = list.get(1);
      const n2 = list.get(2);

      expect(n1.val).toBe(2);
      expect(n2.val).toBe(4);
      expect(n1.next).toBe(n2);
      expect(n2.prev).toBe(n1);
      expect(removed.next).toBeNull();
      expect(removed.prev).toBeNull();
      expect(list.length).toBe(3);
    });
  });

  describe("reverse", () => {
    test("does nothing on an empty list", () => {
      list.reverse();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
    });

    test("does nothing on a single-item list", () => {
      list.push("one");
      list.reverse();
      expect(list.head.val).toBe("one");
      expect(list.tail.val).toBe("one");
      expect(list.head.next).toBeNull();
      expect(list.head.prev).toBeNull();
      expect(list.length).toBe(1);
    });

    test("reverses a multi-item list and updates all links", () => {
      list.push(10).push(20).push(30);

      const returnedList = list.reverse();
      expect(returnedList).toBe(list);

      expect(list.head.val).toBe(30);
      expect(list.tail.val).toBe(10);
      expect(list.length).toBe(3);

      const n0 = list.get(0);
      expect(n0.val).toBe(30);
      expect(n0.prev).toBeNull();
      expect(n0.next.val).toBe(20);

      const n1 = list.get(1);
      expect(n1.val).toBe(20);
      expect(n1.prev.val).toBe(30);
      expect(n1.next.val).toBe(10);

      const n2 = list.get(2);
      expect(n2.val).toBe(10);
      expect(n2.prev.val).toBe(20);
      expect(n2.next).toBeNull();
    });
  });
});
