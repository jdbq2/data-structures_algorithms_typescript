/**
 Algoritmo de ordenamiento con un bigO(nlog(n)), al utilizar un arreglo auxiliar para almacenar el resultado
 tiene un consumo de memoria mayor, pero su BigO, siempre es el mismo, lo que lo hace predecible con grandes
 cantides de datos como input.
 */

export const mergeSort = (arr: number[]): number[] => {
  //Si el arreglo ya no tiene mas de un elemento no lo podemos ordenar por lo tanto devolvemos el arreglo
  if (arr.length <= 1) {
    return arr;
  }

  //Seleccionamos el punto medio del arreglo y dividimos el arreglo de ese punto hacia abajo, y de ese punto hacia arriba
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Llamamos la funcion merge con el arreglo de la derecha y el arreglo de la izquierda
  return merge(mergeSort(left), mergeSort(right));
};

function merge(left: number[], right: number[]): number[] {
  /*
  Recibimos dos arreglos como parametros, definimos la variable resultado, el index de la derecha y el index de la izquierda,
  los cuales inician en cero para controlar desde donde que indices nos interesa regresar ese arreglo
  */

  let result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  /**
  Mientras el indice de la derecha sea menor que el largo del arreglo left y lo mismo con el indice de la derecha y 
  el largo del arreglo rigth, hacemos la comparacion:
 */
  while (leftIndex < left.length && rightIndex < right.length) {
    /**
     //Si el valor del elemento que se encuentra en el arreglo left en el indice actual es menor que el valor del 
     elemento que se encuentra en el arreglo rigth en le indice actual, empujamos al arreglo result el valor de left y 
     aumentamos el valor del indice left, caso contrario empujamos el valor de right y aumentamos el valor del indice right,
     garantizando asi que los elementos se van ordenando.
 */
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  /*
   Regresamos la concatenacion del arreglo resultado con los arreglos left y right desde el indice que quedaron
    despues de la comparacion.
  */
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

module.exports = mergeSort;
