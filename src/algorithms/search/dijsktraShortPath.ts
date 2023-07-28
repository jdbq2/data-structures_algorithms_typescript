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

function hasUnvisited(seen: boolean[], dists: number[]): boolean {
  /**
     Evaluamos si en el arreglo seen hay aun algun elemento que no hayamos visitado(false) y que el 
     valor del index en el arreglo de distancias es menor a Infinity.Esto para saber su aun quedan 
     nodos por visitar.
     */
  return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
  /**
Declaramos la variable para controlar el index y el valor de la distancia mas corta
    */
  let idx = -1;
  let lowestDistance = Infinity;

  /**
   Recorremos el arreglo de los elementos vistos:
   */
  for (let i = 0; i < seen.length; i++) {
    /**
     Si ese nodo ya fue visitado, vamos al siguiente ciclo del for
     */
    if (seen[i]) {
      continue;
    }
    /**
     Si el valor actual de lowestDistance es mayor a el valor que tiene el arreglo de distancias
     en ese index, significa que hay un camino mas corto (un menor valor), por lo tanto asignamos 
     al lowestDistance el valor del elemento de distancias en ese index y hacemos de index ese valor i.
     */
    if (lowestDistance > dists[i]) {
      lowestDistance = dists[i];
      idx = i;
    }
  }
  /**
   Retornamos el index donde encontramos el menor valor o camino mas corto.
   */
  return idx;
}

export const dijkstraList = (
  arr: WeightedAdjacencyList,
  source: number,
  sink: number
): number[] => {
  /**
   Lo usamos para controlar que filas de la matriz ya visitamos
   */
  const seen = new Array(arr.length).fill(false);
  /**
   Lo usamos para saber lo pasos previos del camino que recorremos para llegar al nodo objetivo
   */
  const prev = new Array(arr.length).fill(-1);
  /**
   Lo usamos para almacenar las distancias entre los nodos
   */
  const dists = new Array(arr.length).fill(Infinity);
  /**
   Añadimos el peso al arreglo de distancias, eso se hace para poder comparar desde la posicion
   inicial
   */
  dists[source] = 0;

  /*
    Mientras tengamos nodos por visitar:
   */
  while (hasUnvisited(seen, dists)) {
    /**
     Declaramos el valor actual al resultado de obtener el menor peso de lo nodos
     que no han sido visitados.
     */
    const curr = getLowestUnvisited(seen, dists);
    seen[curr] = true;

    /**
     recorremos las conexiones del nodo con menor valor que no hemos visitado
     */
    const adjs = arr[curr];
    for (let i = 0; i < adjs.length; i++) {
      /**
       Creamos un eje y le asignamos el valor que el nodo tenga en el componente de turno.
       */
      const edge = adjs[i];
      /**
       Si ese nodo eje ya fue visitado continuamos evaluando el siguiente punto del ciclo.
       */
      if (seen[edge.to]) {
        continue;
      }

      /**
       Establecemos que la distancia actual como la suma del valor que el arreglo de distancias tiene
       en el current + el peso del eje actual.
       */
      const dist = dists[curr] + edge.weight;
      /**
       Si la distancia es menor al valor que el arreglo de distancias tiene el valor del peso del eje
       hacemos del valor en el peso del eje dentro del arreglo de sitancias, la distancia. y marcamos el 
       valor del prev como el current.
       */
      if (dist < dists[edge.to]) {
        dists[edge.to] = dist;
        prev[edge.to] = curr;
      }
    }
  }

  /**
   Ahora ordenamos el arreglo con le camino recorrido, para esto empezamos por el needle que necesitamos buscar
   */
  let curr = sink;
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
  return out;
};
