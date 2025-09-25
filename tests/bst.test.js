import { BinarySearchTree } from "../src/trees/Bst.js";

describe("BinarySearchTree", () => {
  let tree;

  beforeEach(() => {
    tree = new BinarySearchTree();
  });

  describe("initial state", () => {
    test("should start with a null root", () => {
      expect(tree.root).toBeNull();
    });
  });

  describe("insert", () => {
    test("should set the root if the tree is empty", () => {
      tree.insert(10);
      expect(tree.root.value).toBe(10);
      expect(tree.root.left).toBeNull();
      expect(tree.root.right).toBeNull();
    });

    test("should insert smaller values to the left", () => {
      tree.insert(10);
      tree.insert(5);
      expect(tree.root.value).toBe(10);
      expect(tree.root.left.value).toBe(5);
      expect(tree.root.right).toBeNull();
    });

    test("should insert larger values to the right", () => {
      tree.insert(10);
      tree.insert(15);
      expect(tree.root.value).toBe(10);
      expect(tree.root.left).toBeNull();
      expect(tree.root.right.value).toBe(15);
    });

    test("should correctly place nodes in a multi-level tree", () => {
      tree.insert(10);
      tree.insert(5);
      tree.insert(15);
      tree.insert(3);
      tree.insert(7);
      tree.insert(20);

      expect(tree.root.left.value).toBe(5);
      expect(tree.root.right.value).toBe(15);
      expect(tree.root.left.left.value).toBe(3);
      expect(tree.root.left.right.value).toBe(7);
      expect(tree.root.right.right.value).toBe(20);
      expect(tree.root.right.left).toBeNull();
    });

    test("should ignore duplicate values and return undefined", () => {
      tree.insert(10);
      tree.insert(5);

      const result = tree.insert(10);

      expect(result).toBeUndefined();
      expect(tree.root.left.value).toBe(5);
      expect(tree.root.right).toBeNull();
    });

    test("should return the tree instance to allow chaining", () => {
      const result = tree.insert(10);
      expect(result).toBe(tree);

      // Example of chaining
      tree.insert(5).insert(15);
      expect(tree.root.left.value).toBe(5);
      expect(tree.root.right.value).toBe(15);
    });
  });

  describe("find and contains", () => {
    beforeEach(() => {
      tree.insert(10).insert(5).insert(15).insert(3).insert(7).insert(20);
    });

    describe("find", () => {
      test("should return the node for a value that exists in the tree", () => {
        const foundNode = tree.find(7);
        expect(foundNode).not.toBeNull();
        expect(foundNode.value).toBe(7);
        expect(foundNode.left).toBeNull();
        expect(foundNode.right).toBeNull();
      });

      test("should return the root node when finding the root value", () => {
        const foundNode = tree.find(10);
        expect(foundNode).toBe(tree.root);
        expect(foundNode.value).toBe(10);
      });

      test("should return null for a value that does not exist", () => {
        expect(tree.find(99)).toBeNull();
      });

      test("should return null when searching in an empty tree", () => {
        const emptyTree = new BinarySearchTree();
        expect(emptyTree.find(10)).toBeNull();
      });
    });

    describe("contains", () => {
      test("should return true for a value that exists", () => {
        expect(tree.contains(15)).toBe(true);
      });

      test("should return true for the root value", () => {
        expect(tree.contains(10)).toBe(true);
      });

      test("should return false for a value that does not exist", () => {
        expect(tree.contains(99)).toBe(false);
      });

      test("should return false when searching in an empty tree", () => {
        const emptyTree = new BinarySearchTree();
        expect(emptyTree.contains(10)).toBe(false);
      });
    });
  });

  describe("bfs (Breadth-First Search)", () => {
    test("should return an empty array for an empty tree", () => {
      expect(tree.bfs()).toEqual([]);
    });

    test("should return an array with only the root value for a single-node tree", () => {
      tree.insert(42);
      expect(tree.bfs()).toEqual([42]);
    });

    describe("with a populated tree", () => {
      beforeEach(() => {
        tree.insert(10).insert(6).insert(15).insert(3).insert(8).insert(20);
      });

      test("should return an array of values in breadth-first order", () => {
        const expectedOrder = [10, 6, 15, 3, 8, 20];
        expect(tree.bfs()).toEqual(expectedOrder);
      });

      test("should handle a tree that is not perfectly balanced", () => {
        tree.insert(17);
        const expectedOrder = [10, 6, 15, 3, 8, 20, 17];
        expect(tree.bfs()).toEqual(expectedOrder);
      });
    });
  });

  describe("dfsPreOrder (Depth-First Search)", () => {
    test("should return an empty array for an empty tree", () => {
      expect(tree.dfsPreOrder()).toEqual([]);
    });

    test("should return an array with only the root value for a single-node tree", () => {
      tree.insert(42);
      expect(tree.dfsPreOrder()).toEqual([42]);
    });

    describe("with a populated tree", () => {
      beforeEach(() => {
        tree.insert(10).insert(6).insert(15).insert(3).insert(8).insert(20);
      });

      test("should return an array of values in pre-order (Root, Left, Right)", () => {
        const expectedOrder = [10, 6, 3, 8, 15, 20];
        expect(tree.dfsPreOrder()).toEqual(expectedOrder);
      });
    });

    test("should handle a right-skewed tree correctly", () => {
      tree.insert(10).insert(15).insert(20).insert(25);
      const expectedOrder = [10, 15, 20, 25];
      expect(tree.dfsPreOrder()).toEqual(expectedOrder);
    });
  });

  describe("dfsPostOrder (Depth-First Search)", () => {
    test("should return an empty array for an empty tree", () => {
      expect(tree.dfsPostOrder()).toEqual([]);
    });

    test("should return an array with only the root value for a single-node tree", () => {
      tree.insert(42);
      expect(tree.dfsPostOrder()).toEqual([42]);
    });

    describe("with a populated tree", () => {
      beforeEach(() => {
        tree.insert(10).insert(6).insert(15).insert(3).insert(8).insert(20);
      });

      test("should return an array of values in post-order (Left, Right, Root)", () => {
        const expectedOrder = [3, 8, 6, 20, 15, 10];
        expect(tree.dfsPostOrder()).toEqual(expectedOrder);
      });
    });

    test("should handle a left-skewed tree correctly", () => {
      tree.insert(10).insert(6).insert(3);
      const expectedOrder = [3, 6, 10];
      expect(tree.dfsPostOrder()).toEqual(expectedOrder);
    });
  });

  describe("dfsInOrder (Depth-First Search)", () => {
    test("should return an empty array for an empty tree", () => {
      expect(tree.dfsInOrder()).toEqual([]);
    });

    test("should return an array with only the root value for a single-node tree", () => {
      tree.insert(42);
      expect(tree.dfsInOrder()).toEqual([42]);
    });

    describe("with a populated tree", () => {
      beforeEach(() => {
        tree.insert(10).insert(6).insert(15).insert(3).insert(8).insert(20);
      });

      test("should return an array of values in sorted (in-order) order", () => {
        const expectedOrder = [3, 6, 8, 10, 15, 20];
        expect(tree.dfsInOrder()).toEqual(expectedOrder);
      });
    });

    test("should return sorted values for an unbalanced tree", () => {
      tree.insert(10).insert(20).insert(30).insert(40);
      const expectedOrder = [10, 20, 30, 40];
      expect(tree.dfsInOrder()).toEqual(expectedOrder);

      const leftSkewedTree = new BinarySearchTree();
      leftSkewedTree.insert(40).insert(30).insert(20).insert(10);
      const expectedLeftOrder = [10, 20, 30, 40];
      expect(leftSkewedTree.dfsInOrder()).toEqual(expectedLeftOrder);
    });
  });
});
