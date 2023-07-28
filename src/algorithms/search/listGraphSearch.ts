/*
export const list1: WeightedAdjacencyList = [];

//      (1) --- (4) ---- (5)
//    /  |       |       /|
// (0)   | ------|------- |
//    \  |/      |        |
//      (2) --- (3) ---- (6)
list1[0] = [
    { to: 1, weight: 3 },
    { to: 2, weight: 1 },
];
list1[1] = [
    { to: 0, weight: 3 },
    { to: 2, weight: 4 },
    { to: 4, weight: 1 },
];
list1[2] = [
    { to: 1, weight: 4 },
    { to: 3, weight: 7 },
    { to: 0, weight: 1 },
];
list1[3] = [
    { to: 2, weight: 7 },
    { to: 4, weight: 5 },
    { to: 6, weight: 1 },
];
list1[4] = [
    { to: 1, weight: 1 },
    { to: 3, weight: 5 },
    { to: 5, weight: 2 },
];
list1[5] = [
    { to: 6, weight: 1 },
    { to: 4, weight: 2 },
    { to: 2, weight: 18 },
];
list1[6] = [
    { to: 3, weight: 1 },
    { to: 5, weight: 1 },
];
*/

type CompleteGraphEdge = { from: number; to: number; weight: number };
type GraphEdge = { to: number; weight: number };
type WeightedAdjacencyList = GraphEdge[][];

function walk(
  graph: WeightedAdjacencyList,
  curr: number,
  needle: number,
  seen: boolean[],
  path: number[]
): boolean {
  /**
     Si encontramos el nodo que buscamos
     */
  if (curr === needle) {
    path.push(curr);
    return true;
  }
  /**
   Si ya habiamos visitado este punto
   */
  if (seen[curr]) {
    return false;
  }
  /**
   Marcamos el nodo que estamos trabajando actualmente como visto
   */
  seen[curr] = true;
  /**
   Agregamos el nodo actual al camino que recorremos
   */
  path.push(curr);
  /**
   Recorremos los elementos internos del nodo actual para recorrer sus conexiones
   */
  const list = graph[curr];
  for (let i = 0; i < list.length; i++) {
    /*
    Hacemos un eje de cada elemento que contiene el nodo que estamos analizando y lo pasamos con
    la funcion recursiva hasta que lo encontremos.
    */
    const edge = list[i];
    if (walk(graph, edge.to, needle, seen, path)) {
      return true;
    }
  }
  /*
  En caso de no encontrar el objetivo despues de la recursion, removemos el ultimo elemento del arreglo path,
  y retornamos false
  */
  path.pop();
  return false;
}

export const listGraphSearch = (
  graph: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null => {
  /**
     Creamos los arreglos para controlar los nodos que vistamos y el camino recorrido
     */
  const seen: boolean[] = new Array(graph.length).fill(false);
  const path: number[] = [];
  /**
   Caminamos el grafo recursivamente
   */
  walk(graph, source, needle, seen, path);
  /**
   Si al final de recorrer el grafo el path esta vacio, quiere decir que no encontro el objetivo,
   por lo tanto retornamos null, caso contrario retornamos el path
   */
  if (path.length === 0) {
    return null;
  }
  return path;
};
