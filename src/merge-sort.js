class MergeSort {
  static #split(arr) {
    if (arr.length === 1) return arr;
    const end = arr.length;
    const midway = Math.round(end / 2);
    const left = arr.slice(0, midway);
    const right = arr.slice(midway, end);
    return [left, right];
  }

  static sort(arr) {
    if (arr.length === 1) return arr;

    // Sort left and right
    let [left, right] = this.#split(arr);

    left = this.sort(left);
    right = this.sort(right);

    // Merge left and right
    let sortedArr = [];
    let leftI = 0;
    let rightI = 0;

    while (true) {
      const leftElement = left[leftI];
      const rightElement = right[rightI];

      if (leftElement == undefined && rightElement == undefined) break;

      if (leftElement < rightElement || rightElement == undefined) {
        sortedArr.push(leftElement);
        leftI++;
        continue;
      }

      if (rightElement < leftElement || leftElement == undefined) {
        sortedArr.push(rightElement);
        rightI++;
        continue;
      }

      if (rightElement === leftElement) {
        sortedArr.push(rightElement);
        sortedArr.push(leftElement);
        rightI++;
        leftI++;
        continue;
      }
    }

    return sortedArr;
  }
}

module.exports = MergeSort;
