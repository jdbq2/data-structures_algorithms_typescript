/*
Algoritmo que nos permite saber si dos arboles son iguales
*/

interface BinaryNode<T> {
  value: T;
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;
}

export const compareTrees = (
  a: BinaryNode<number> | null,
  b: BinaryNode<number> | null
): boolean => {
  //Checkeo estructural, revisamos si ambos nodos son null
  if (a === null && b === null) {
    return true;
  }

  //Checkeo estructural, revisamos si uno de los nodos es null y el otro no
  if (a === null || b === null) {
    return false;
  }

  //Checkeo de valor, revisamos si los valores de los nodos son diferentes
  if (a.value !== b.value) {
    return false;
  }

  //LLaamos la funcion de forma recursiva usando los arboles de la derecha y de la izquierda y comparando sus resultados al final.
  return compareTrees(a.left, b.left) && compareTrees(a.right, b.right);
};
