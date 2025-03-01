const LinkedList = require("./linked-list.js");

class Queue {
  data = new LinkedList();

  enqueue(value) {
    this.data.append(value);
  }

  dequeue() {
    if (this.data.head === null) return;
    this.data.removeAt(0);
  }

  peek() {
    if (this.data.head === null) return null;
    return this.data.head.value;
  }
}

module.exports = Queue;
