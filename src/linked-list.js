class Node {
  value = null;
  nextNode = null;
}

class LinkedList {
  head = null;
  tail = null; // Next time, probably set tail as a function that gets the tail dynamically instead of it being a value hard set

  append(value) {
    const newNode = new Node();
    newNode.value = value;
    if (this.head === null) this.head = newNode;
    else this.tail.nextNode = newNode;
    this.tail = newNode;
  }

  prepend(value) {
    const newNode = new Node();
    newNode.value = value;
    newNode.nextNode = this.head;
    this.head = newNode;
    if (this.tail === null) this.tail = newNode;
  }

  size() {
    let count = 0;
    let currentNodePointer = this.head;
    while (currentNodePointer !== null) {
      count++;
      currentNodePointer = currentNodePointer.nextNode;
    }
    return count;
  }

  at(index) {
    let currentNodePointer = this.head;
    for (let i = 0; i < index; i++) {
      if (currentNodePointer === null) return null;
      currentNodePointer = currentNodePointer.nextNode;
    }

    if (currentNodePointer === null) return null;
    return currentNodePointer;
  }

  pop() {
    let currentNodePointer = this.head;
    if (currentNodePointer === null) return;
    if (currentNodePointer.nextNode === null) {
      this.head = null;
      this.tail = null;
      return;
    }
    while (currentNodePointer.nextNode.nextNode !== null) {
      currentNodePointer = currentNodePointer.nextNode;
    }
    currentNodePointer.nextNode = null;
    this.tail = currentNodePointer;
  }

  contains(value) {
    let currentNodePointer = this.head;
    while (true) {
      if (currentNodePointer === null) return false;
      if (currentNodePointer.value === value) return true;
      currentNodePointer = currentNodePointer.nextNode;
    }
  }

  find(value) {
    let currentIndex = 0;
    let currentNodePointer = this.head;
    while (true) {
      if (currentNodePointer === null) return null;
      if (currentNodePointer.value === value) return currentIndex;
      currentNodePointer = currentNodePointer.nextNode;
      currentIndex++;
    }
  }

  toString() {
    let str = "";
    let currentNodePointer = this.head;
    while (currentNodePointer !== null) {
      if (currentNodePointer.nextNode === null) {
        str += currentNodePointer.value + " -> null";
      } else {
        str += currentNodePointer.value + " -> ";
      }
      currentNodePointer = currentNodePointer.nextNode;
    }
    console.log(str);
  }

  insertAt(value, index) {
    const newNode = new Node();
    newNode.value = value;
    let currentIndex = 0;
    let currentNodePointer = this.head;
    let leftNodePointer;
    let rightNodePointer;

    while (true) {
      if (index < 0) {
        throw new Error("Index can not be lower than 0");
      }
      if (index === 0) {
        newNode.nextNode = this.head;
        this.head = newNode;
        if (currentNodePointer === null) {
          this.tail = newNode;
        }
        return;
      }
      if (currentIndex === index - 1) {
        if (currentNodePointer === null) {
          return;
        }
        leftNodePointer = currentNodePointer;
        currentNodePointer = currentNodePointer.nextNode;
        rightNodePointer = currentNodePointer;
        leftNodePointer.nextNode = newNode;
        newNode.nextNode = rightNodePointer;
        if (rightNodePointer === null) {
          this.tail = newNode;
        }
        return;
      }
      currentIndex++;
      currentNodePointer = currentNodePointer.nextNode;
    }
  }

  removeAt(index) {
    let currentIndex = 0;
    let currentNodePointer = this.head;
    let leftNodePointer;
    let rightNodePointer;

    if (index === 0) {
      if (this.head.nextNode === null) {
        this.tail = null;
      }
      this.head = this.head.nextNode;
      return;
    }

    while (true) {
      if (currentIndex === index - 1) {
        leftNodePointer = currentNodePointer;
      }
      if (currentIndex === index + 1) {
        rightNodePointer = currentNodePointer;
        break;
      }
      currentIndex++;
      currentNodePointer = currentNodePointer.nextNode;
    }

    leftNodePointer.nextNode = rightNodePointer;

    if (rightNodePointer === null) this.tail = leftNodePointer;
  }
}

module.exports = LinkedList;
