const BinarySearchTree = require("./binary-search-tree.js");

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function returnRandomNumbers(length = 20, max = 100) {
  const array = [];

  for (let i = 0; i < length; i++) {
    array.push(getRandomInt(max));
  }

  return array;
}

const tree = new BinarySearchTree(returnRandomNumbers());

prettyPrint(tree.root);

console.log("Is balanced: " + tree.isBalanced());

console.log("levelOrder: " + tree.getLevelOrder());
console.log("preOrder: " + tree.getPreOrder());
console.log("postOrder: " + tree.getPostOrder());
console.log("InOrder: " + tree.getInOrder());

tree.insert(104);
tree.insert(200);
tree.insert(343);
tree.insert(101);
tree.insert(150);

prettyPrint(tree.root);

console.log("Is balanced: " + tree.isBalanced());

tree.rebalance();

prettyPrint(tree.root);

console.log("Is balanced: " + tree.isBalanced());

console.log("levelOrder: " + tree.getLevelOrder());
console.log("preOrder: " + tree.getPreOrder());
console.log("postOrder: " + tree.getPostOrder());
console.log("InOrder: " + tree.getInOrder());
