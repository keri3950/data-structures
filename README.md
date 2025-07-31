# JavaScript Data Structures & Algorithms

A personal repository for implementing and practicing common data structures in JavaScript. The primary goal is to develop a deep understanding of each data structure by building it from scratch and writing comprehensive tests with Jest.

---

## Implemented Data Structures

This is a running list of the data structures I have implemented.

- [ ] Singly Linked List
- [ ] Doubly Linked List
- [ ] Stack
- [ ] Queue
- [ ] Hash Table
- [ ] Binary Search Tree
- [ ] Graph
- [ ] Heap

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd your-repo-name
    ```
3.  Install the development dependencies (Jest):
    ```bash
    npm install
    ```

---

## Running the Tests

This project uses **Jest** for testing. All tests are located in the `/tests` directory.

- **To run all tests once:**

  ```bash
  npm test
  ```

- **To run tests in watch mode (re-runs on file changes):**
  This is the recommended way to work while developing a new data structure.
  ```bash
  npm run test:watch
  ```

---

## Project Structure

The repository is organized to keep a clear separation between the source code for each data structure and its corresponding tests.

```
data-structures-js/
├── .gitignore
├── package.json
├── README.md
│
├── src/
│   ├── stack/
│   │   └── Stack.js
│   └── ... (one folder per data structure)
│
└── tests/
    ├── stack.test.js
    └── ... (one test file per data structure)
```
