/**
 Algoritmo de ordenamiento con un BigO(nlogn), para el caso promedio, tiene un BigO exponencial si se da el peor caso
 que es un arreglo ordenado inversamente.
 */

export const quickSort = (arr: number[]): number[] => {
  //Si el arreglo ya no tiene ams de un elemento no lo podemos ordenar por lo tanto devolvemos el arreglo
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2); // Obtenemos el index del valor escogido como pivot
  const pivot = arr.splice(pivotIndex, 1)[0]; //Ubucamos su valor dentro del array y lo sacamos del mismo.
  const left: number[] = []; //Creamos el arreglo para los elemento menores que el pivot
  const right: number[] = []; //Creamos el arreglo para los elemento mayores que el pivot

  for (let i = 0; i < arr.length; i++) {
    //Recorremos todos los elementos del array, y metemos cada elemento donde debe ir despues de compararlos con el pivot
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  //hacemos el return de un arreglo que incluye la funcion recursiva y el pivot en el medio
  return [...quickSort(left), pivot, ...quickSort(right)];
};

module.exports = quickSort;
