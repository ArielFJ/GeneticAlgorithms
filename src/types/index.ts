export interface GAParameters<T> {
  fitness: number[];
  population: T[];
  bestSolution: T;
  generations: number;
  bestIndex: number;
  avgFitness: number;
}
