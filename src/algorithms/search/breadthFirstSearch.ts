/*
Algoritmo para hacer busquedas dentro de un arbol, se llama breadth-first search, ya que recorremos el arbol
no por sus ramas empezando desde la izquierda como cuando hacemos deep-first , sino por los niveles del arbol.

{
    value: 20,
    right: {
      value: 50,
      right: {
        value: 100,
        right: null,
        left: null,
      },
      left: {
        value: 30,
        right: {
          value: 45,
          right: null,
          left: null,
        },
        left: {
          value: 29,
          right: null,
          left: null,
        },
      },
    },
    left: {
      value: 10,
      right: {
        value: 15,
        right: null,
        left: null,
      },
      left: {
        value: 5,
        right: {
          value: 7,
          right: null,
          left: null,
        },
        left: null,
      },
    },
  }
*/

interface BinaryNode<T> {
  value: T;
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;
}
export const breadthFirstSearch = (
  head: BinaryNode<number>,
  needle: number
): boolean => {
  /**
En javascript los arrays son realmente un arrayList lo que significa que hacer el queue o el dequeue tiene un bigO(n**2), 
ya qeu debe re indexar todos los elementos cada vez que insertamos o eliminamos un elemento de la estructura
*/
  const queue: (BinaryNode<number> | null)[] = [head];

  // recorremos todo el arbol
  while (queue.length) {
    // hacemos que el primer nivel sea el current
    const curr = queue.shift() as BinaryNode<number> | undefined | null;
    if (!curr) {
      continue; // si llegamos a una hoja continuamos el ciclo con el siguiente elemento
    }
    //Preguntamos si el nodo actual tiene el valor que estamos buscando
    if (curr?.value === needle) {
      return true;
    }
    //caso contrario agregamos el left y el right al queue para evaluar los otros niveles del arbol
    queue.push(curr.left);
    queue.push(curr.right);
  }
  return false;
};
