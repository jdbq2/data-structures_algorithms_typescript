/*
Para recorrer un arbol en in order haciendo deep-first, significa que caminamos a la izquierda, luego visitamos el nodo, y posteriormente caminamos a la 
derecha usando un arbol como parametro:

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

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path; //Hacemos el return cuando el elemento curr del arbol es null
  }
  walk(curr.left, path); // recorremos el arbol a la izquierda
  path.push(curr.value); // visitamos el nodo
  walk(curr.right, path); // Recorremos el arbol a la derecha
  return path; // devolvemos el path
}

export const inOrderBinaryTree = (head: BinaryNode<number>): number[] => {
  return walk(head, []);
};
