/**
 Algoritmo de ordenamiento que consiste en que cada item del array revisa si el que tiene al lado es menor,
 si eso es asi intercambian posiciones. El BigO de este algoritmo es: O(n**2)
 */
export const bubbleSort = (array: number[]): number[] => {
  let orderedArray = [...array]; // copiamos el arreglo de entrada para modificarlo
  /**
   El primer ciclo controla que no hagamos el recorrido de todo el array de nuevo, ya que 
   este algoritmo tiene como propiedad que en cada ciclo siempre deja el numero mas grande en la
   posicion donde debe estar, por lo que no tiene sentido recorrerlo hasta el final una y otra vez.
   */
  for (let i = 0; i < orderedArray.length; i++) {
    for (let j = 0; j < orderedArray.length - 1 - i; j++) {
      /**
     Preguntamos si el valor actual es mayor que el siguiente, si es asi,
     intercambiamos posiciones
     */
      if (orderedArray[j] > orderedArray[j + 1]) {
        const temp = orderedArray[j];
        orderedArray[j] = orderedArray[j + 1];
        orderedArray[j + 1] = temp;
      }
    }
  }
  return orderedArray;
};

module.exports = bubbleSort;
