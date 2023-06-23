const mergeSort = require("./algorithms/sort/mergeSort");
const quickSort = require("./algorithms/sort/quickSort");
const linearSearch = require("./algorithms/search/linearSearch");
const binarySearch = require("./algorithms/search/binarySearch");
const cristalBallsSearch = require("./algorithms/search/cristalBallsSearch");
const bubbleSort = require("./algorithms/sort/bubbleSort");

console.log("----------ALGORITMOS DE BUSQUEDA--------------");
console.log("Linear Search: ", linearSearch([1, 2, 3, 4], 2));
console.log(
  "Binary Search: ",
  binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)
);
console.log(
  "Cristal Ball Search: ",
  cristalBallsSearch([false, false, true, true, true])
);

console.log("-----------ALGORITMOS DE ORDENAMIENTO---------------");
console.log("BubbleSort: ", bubbleSort([2, 5, 4, 3]));
console.log("Merge Sort: ", mergeSort([8, 7, 6, 5, 4]));
console.log("QuickSort: ", quickSort([8, 7, 6, 5, 4]));

console.log("------------------------------------------------------");
