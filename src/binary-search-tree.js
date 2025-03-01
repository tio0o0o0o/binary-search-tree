const MergeSort = require("./merge-sort.js");
const Queue = require("./queue.js");

class Node {
  constructor() {
    this.data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  rebalance() {
    const array = this.getInOrder();
    this.root = this.buildTree(array);
  }

  isBalanced() {
    const maxHeight = this.height();
    const minHeight = this.minHeight();
    if (maxHeight - minHeight > 1) return false;
    return true;
  }

  height(node = this.root) {
    const array = this.heightRecursive(node);
    const sortedArray = MergeSort.sort(array);
    return sortedArray[sortedArray.length - 1];
  }

  minHeight(node = this.root) {
    const array = this.heightRecursive(node);
    const sortedArray = MergeSort.sort(array);
    return sortedArray[0];
  }

  depth(node) {
    let currentNode = this.root;
    let currentDepth = 0;

    while (true) {
      if (node.data === currentNode.data) return currentDepth;
      if (
        currentNode === null ||
        (currentNode.left === null && currentNode.right === null)
      )
        return null;
      if (currentNode.data > node.data) {
        currentNode = currentNode.left;
        currentDepth++;
        continue;
      }
      if (currentNode.data < node.data) {
        currentNode = currentNode.right;
        currentDepth++;
        continue;
      }
    }
  }

  heightRecursive(node, count = 0, array = []) {
    // Base case
    if (node.left === null && node.right === null) {
      array.push(count);
      return [0];
    }

    // Recursive case
    if (node.left !== null) this.heightRecursive(node.left, count + 1, array);
    if (node.right !== null) this.heightRecursive(node.right, count + 1, array);

    return array;
  }

  levelOrder(callback) {
    const array = this.getLevelOrder();
    array.forEach((value, index) => {
      callback(value, index);
    });
  }

  getLevelOrder() {
    const array = [];
    const queue = new Queue();

    queue.enqueue(this.root);

    while (queue.peek() !== null) {
      const firstItem = queue.peek();

      if (firstItem.left !== null) queue.enqueue(firstItem.left);
      if (firstItem.right !== null) queue.enqueue(firstItem.right);
      array.push(firstItem.data);
      queue.dequeue();
    }

    return array;
  }

  inOrder(callback) {
    const array = this.getInOrder();
    array.forEach((value, index) => {
      callback(value, index);
    });
  }

  preOrder(callback) {
    const array = this.getPreOrder();
    array.forEach((value, index) => {
      callback(value, index);
    });
  }

  postOrder(callback) {
    const array = this.getPostOrder();
    array.forEach((value, index) => {
      callback(value, index);
    });
  }

  getInOrder(node = this.root, array = []) {
    if (node.left !== null) this.getInOrder(node.left, array);
    array.push(node.data);
    if (node.right !== null) this.getInOrder(node.right, array);
    return array;
  }

  getPreOrder(node = this.root, array = []) {
    array.push(node.data);
    if (node.left !== null) this.getPreOrder(node.left, array);
    if (node.right !== null) this.getPreOrder(node.right, array);
    return array;
  }

  getPostOrder(node = this.root, array = []) {
    if (node.left !== null) this.getPostOrder(node.left, array);
    if (node.right !== null) this.getPostOrder(node.right, array);
    array.push(node.data);
    return array;
  }

  buildTree(array) {
    const sortedArray = Tree.sortAndRemoveDuplicates(array);
    return Tree.buildNode(sortedArray);
  }

  remove(value) {
    let previousNode = null;
    let currentNode = this.root;

    while (true) {
      if (currentNode.data === value) {
        // If leaf node
        if (currentNode.left === null && currentNode.right === null) {
          if (previousNode !== null) {
            if (value < previousNode.data) {
              previousNode.left = null;
              return;
            } else {
              previousNode.right = null;
              return;
            }
          } else {
            this.root = null;
            return;
          }
        }

        // If only one child
        if (currentNode.left === null && currentNode.right !== null) {
          if (previousNode !== null) {
            if (value < previousNode.data) {
              previousNode.left = currentNode.right;
              return;
            } else {
              previousNode.right = currentNode.right;
              return;
            }
          } else {
            this.root = currentNode.right;
            return;
          }
        }
        if (currentNode.right === null && currentNode.left !== null) {
          if (previousNode !== null) {
            if (value < previousNode.data) {
              previousNode.left = currentNode.left;
              return;
            } else {
              previousNode.right = currentNode.left;
              return;
            }
          } else {
            this.root = currentNode.left;
            return;
          }
        }

        // If Two nodes
        if (currentNode.right !== null && currentNode.left !== null) {
          // Get next larger value
          let nextLargestNode = currentNode.right;
          let nextLargestNodePrevious = currentNode;
          if (nextLargestNode.right.left !== null) {
            nextLargestNodePrevious = currentNode.right;
            while (nextLargestNodePrevious.left.left !== null) {
              nextLargestNodePrevious = nextLargestNodePrevious.left;
            }
          }
          while (nextLargestNode.left !== null) {
            nextLargestNode = nextLargestNode.left;
          }
          if (previousNode !== null) {
            if (value < previousNode.data) {
              previousNode.left.data = nextLargestNode.data;
              nextLargestNodePrevious.left = nextLargestNode.right;
              return;
            } else {
              previousNode.right.data = nextLargestNode.data;
              nextLargestNodePrevious.left = nextLargestNode.right;
              return;
            }
          } else {
            this.root.data = nextLargestNode.data;
            return;
          }
        }
      } else {
        if (value < currentNode.data) {
          if (currentNode.left !== null) {
            previousNode = currentNode;
            currentNode = currentNode.left;
          } else return;
        } else {
          if (currentNode.right !== null) {
            previousNode = currentNode;
            currentNode = currentNode.right;
          } else return;
        }
      }
    }
  }

  find(value) {
    return this.findRecursive(this.root, value);
  }

  findRecursive(node, value) {
    if (node === null) return null;
    if (node.data === value) return node;
    if (value < node.data) {
      return this.findRecursive(node.left, value);
    }
    if (value > node.data) {
      return this.findRecursive(node.right, value);
    }
  }

  insert(value) {
    let currentNode = this.root;
    while (true) {
      if (currentNode === null) {
        const newNode = new Node();
        newNode.data = value;
        this.root = newNode;
        return;
      }
      if (value === currentNode.data) return;
      if (value < currentNode.data) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
          continue;
        } else {
          const newNode = new Node();
          newNode.data = value;
          currentNode.left = newNode;
          return;
        }
      } else {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
          continue;
        } else {
          const newNode = new Node();
          newNode.data = value;
          currentNode.right = newNode;
          return;
        }
      }
    }
  }

  static buildNode(array) {
    const middleIndex = Math.floor(array.length / 2);
    const newNode = new Node();
    newNode.data = array[middleIndex];

    if (array.length >= 2) {
      const leftArray = array.slice(0, middleIndex);
      newNode.left = this.buildNode(leftArray);
    }
    if (array.length >= 3) {
      const rightArray = array.slice(middleIndex + 1, array.length);
      newNode.right = this.buildNode(rightArray);
    }

    return newNode;
  }

  static sortAndRemoveDuplicates(array) {
    const sortedArray = MergeSort.sort(array);
    const removedDuplicates = [];
    sortedArray.forEach((element) => {
      if (removedDuplicates[removedDuplicates.length - 1] === element) return;
      removedDuplicates.push(element);
    });
    return removedDuplicates;
  }
}

module.exports = Tree;
