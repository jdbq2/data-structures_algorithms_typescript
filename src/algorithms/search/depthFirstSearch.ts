/*
Algoritmo para hacer busquedas dentro de un arbol ordenado, hacemos deepth first search, ya que recorremos el arbol
preguntando si el valor del nodo actual es mayor o menor al valor que estamos buscando y asi mismo vamos
avanzando.

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

function search(curr: BinaryNode<number> | null, needle: number): boolean {
  if (!curr) {
    return false; // Si el valor es null quiere decir que llegamos a la mayor profundidad posible
  }
  if (curr.value === needle) {
    return true; // Encontramos el valor
  }
  if (curr.value < needle) {
    return search(curr.right, needle); // si el valor de curr es menor al buscado vamos por la derecha
  } else {
    return search(curr.left, needle); // si el valor de curr es mayor al buscado vamos por la izquierda
  }
}

export const depthFirstSearch = (
  head: BinaryNode<number>,
  needle: number
): boolean => {
  return search(head, needle);
};
