/**
 Algoritmo para resolver un laberinto, tiene un BigO(n) la entrada se ve asi:
    const maze = [
    "xxxxxxxxxx x",
    "x        x x",
    "x        x x",
    "x xxxxxxxx x",
    "x          x",
    "x xxxxxxxxxx",
    ];
    const mazeResult = mazeSolver(maze, "x", { x: 10, y: 0 }, { x: 1, y: 5 });
 Y su resultado seria:

    const mazeResult = [
        { x: 10, y: 0 },
        { x: 10, y: 1 },
        { x: 10, y: 2 },
        { x: 10, y: 3 },
        { x: 10, y: 4 },
        { x: 9, y: 4 },
        { x: 8, y: 4 },
        { x: 7, y: 4 },
        { x: 6, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
        { x: 1, y: 4 },
        { x: 1, y: 5 },
    ];

 */

interface Point {
  x: number;
  y: number;
}

//Arreglo con los valores que hace referencia a los valores en los que me puedo mover
const moveDirections = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function walkMaze(
  maze: string[],
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[]
): boolean {
  //Si nos salimos del mapa
  if (
    curr.x < 0 ||
    curr.x >= maze[0].length ||
    curr.y < 0 ||
    curr.y >= maze[0].length
  ) {
    return false;
  }
  // Si hay un muro
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }
  //Estamos en el final
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    return true;
  }
  // si ya visitamos ese punto
  if (seen[curr.y][curr.x]) {
    return false;
  }

  //Caso contrario en el arreglo bidimensinal marcamos esa coordenada como vista
  seen[curr.y][curr.x] = true;

  //Hacemos el push de la coordenada actual con el fin de marcar esa coordenada como el path de la funcion recursiva
  path.push(curr);
  // Hacemos por cada coordenada cuatro recursiones con le fin de moverla a todas las direcciones posibles
  for (let i = 0; i < moveDirections.length; i++) {
    const [x, y] = moveDirections[i];
    // Si al hacer la recursion devuleve true, que significa que encontramos el final y podemos devolver el path
    if (
      walkMaze(
        maze,
        wall,
        {
          x: curr.x + x,
          y: curr.y + y,
        },
        end,
        seen,
        path
      )
    ) {
      return true;
    }
  }
  // Si la evaluacion de la recursion da false, eliminamos el elemeto ingresado al path durante esa llamada, ya que este no hace parte de la solucion
  path.pop();
  return false;
}

export const mazeSolver = (
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] => {
  //Arreglo bidimensional donde guardaremos las corrdenadas que ya visitamos
  const seen: boolean[][] = [];
  // Arreglo donde guardaremos las coordenadas que hace parte de la solucion
  const path: Point[] = [];

  //LLenamos la variable seen con false
  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  // Hacemos el llamado a la funcion que hace la recursion
  walkMaze(maze, wall, start, end, seen, path);

  //Retornamos el path, el cual ya tendra las coordenadas que hacen parte de la solucion
  return path;
};
