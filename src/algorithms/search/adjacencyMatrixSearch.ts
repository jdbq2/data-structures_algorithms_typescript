/*
export const matrix2: WeightedAdjacencyMatrix = [
    [0, 3, 1,  0, 0, 0, 0], // 0
    [0, 0, 0,  0, 1, 0, 0],
    [0, 0, 7,  0, 0, 0, 0],
    [0, 0, 0,  0, 0, 0, 0],
    [0, 1, 0,  5, 0, 2, 0],
    [0, 0, 18, 0, 0, 0, 1],
    [0, 0, 0,  1, 0, 0, 1],
];
*/

declare type AdjacencyMatrix = number[][];
declare type WeightedAdjacencyMatrix = number[][];
export const adjacencyMatrixSearch = (
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null => {
  return [2];
};
