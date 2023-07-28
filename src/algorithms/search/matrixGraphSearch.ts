/*
//     >(1)<--->(4) ---->(5)
//    /          |       /|
// (0)     ------|------- |
//    \   v      v        v
//     >(2) --> (3) <----(6)

type AdjacencyMatrix = number[][];
export const matrix2: WeightedAdjacencyMatrix = [
    [0, 3, 1,  0, 0, 0, 0], // 0
    [0, 0, 0,  0, 1, 0, 0],
    [0, 0, 7,  0, 0, 0, 0],
    [0, 0, 0,  0, 0, 0, 0],
    [0, 1, 0,  5, 0, 2, 0],
    [0, 0, 18, 0, 0, 0, 1],
    [0, 0, 0,  1, 0, 0, 1],
];

adjacencyMatrixSearch(matrix2, 0, 6) Pasamos el grafo el punto inicial y el punto que buscamos
 nos debe retornar lo puntos que debemos visitar para llegar al objetivo, en este caso seria 
 [
  0,
  1,
  4,
  5,
  6,
  ]
*/

type WeightedAdjacencyMatrix = number[][];

export const MatrixGraphSearch = (
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null => {
  /**
   Lo usamos para controlar que filas de la matriz ya visitamos
   */
  const seen = new Array(graph.length).fill(false);
  /**
   Lo usamos para saber lo pasos previos del camino que recorremos para llegar al nodo objetivo
   */
  const prev = new Array(graph.length).fill(-1);

  /**
   Marcamos la fila de origen de la matriz como vista, y creamos un array con este valor 
   para empezar nuestra busqueda por ahi
   */
  seen[source] = true;
  const q: number[] = [source];

  /**
   Mientras el array tenga elementos ejecutamos la siguiente operacion
   */
  do {
    /**
     Sacamos el primer elemento que tenemos en le array
     */
    const curr = q.shift() as number;
    /**
     Validamos si es el nodo que estamos buscando
     */
    if (curr === needle) {
      break;
    }

    /**
     Creamos la faviable de la fila que vamos a recorrer para buscar conexiones
     */
    const adjs = graph[curr];

    /**
     Recorremos cada elemento de la fila
     */
    for (let i = 0; i < adjs.length; i++) {
      /**
       Si el elemento de la fila de la matriz es cero quiere decir que no hay conexion 
       y por lo tanto debemos seguir buscando
       */
      if (adjs[i] === 0) {
        continue;
      }
      /**
       Si el elemento de la fila de la matriz ya lo hemos visto continuamos
       */
      if (seen[i]) {
        continue;
      }

      /**
       Caso contrario marcamos la fila como ya visitada, y ubicamos el valor del index 
       del elemento donde encontramos conexion dentro del index del array prev para controlar
       el path de como se crearon las conexiones.
       */
      seen[i] = true;
      prev[i] = curr;
      /**
       Agregamos el index al array para visitar esa fila de la matriz y seguir buscando conexiones
       pero ahora en esa fila.
       */
      q.push(i);
    }
    //Marcamos la fila actual como visitada
    seen[curr] = true;
  } while (q.length);

  /**
   Ahora ordenamos el arreglo con le camino recorrido, para esto empezamos por el needle que necesitamos buscar
   */
  let curr = needle;
  /**
   Creamos el array de salida
   */
  const out: number[] = [];

  /**
   Validamos si el index del valor que necesitamos buscar tiene un padre, es decir una conexion de origen,
   si la tiene, agregamos el valor actual al array de salida, y posteriormente hacemos del valor actual curr el valor
   del index del elemento que trajo al elemento actual, haciendo el tipo de pregunta ¿que fila tenia la conexion que te trajo aqui?,
   esto, evaluando el array prev.
   */
  while (prev[curr] !== -1) {
    out.push(curr);
    curr = prev[curr];
  }

  /**
   Si el array de salida tiene elementos retornamos este arreglo con sus elementos en orden, concatenado al elemento 
   de origen.
   */
  if (out.length) {
    return [source].concat(out.reverse());
  }
  /**
   Si el arreglo de salida no tiene elementos, retornamos null ya que significa que no encontramos conexiones.
   */
  return null;
};
