//Search for a value inside an array BigO O(n):
export const linearSearch = (hayStack: number[], needle: number): boolean => {
  for (let i = 0; i < hayStack.length; i++) {
    if (hayStack[i] === needle) {
      return true;
    }
  }
  return false;
};

module.exports = linearSearch;
