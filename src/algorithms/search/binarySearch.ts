/**
 Buscamos el objeto dividiendo el arreglo en mitades y buscando dependiendo de la comparacion del valor que
 esta en el punto medio del arreglo contra el valor buscado BigO de (logN).
 */
export const binarySearch = (hayStack: number[], needle: number): boolean => {
  let lo = 0; //punto inferior de busqueda
  let hi = hayStack.length; // punto superior de la busqueda
  do {
    const midPoint = Math.floor(lo + (hi - lo) / 2); // hallamos el punto medio del arreglo
    const value = hayStack[midPoint]; //hallamos el valor del punto medio del arreglo
    if (value === needle) {
      // si el valor medio es el valor retornamos true
      return true; // si el valor medio es el valor retornamos true
    } else if (value > needle) {
      hi = midPoint; // si el valor medio es mayor al que necesitamos hacemos que ahora el punto superior sea el punto del valor medio
    } else if (value < needle) {
      lo = midPoint + 1; // si el valor medio es menor al que necesitamos hacemos que ahora el punto inferior sea el punto del valor medio
    }
  } while (lo < hi); // repetimos el proceso solo si el punto inferior sigue siendo menor al punto superior
  return false; // si se sale del ciclo quiere decir que no lo encontro y retornamos false
};

module.exports = binarySearch;
