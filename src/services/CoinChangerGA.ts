import { GAParameters } from "../types";
import {
  generateAsciiCharacters,
  randomInt,
  shuffleArray,
} from "../utils/helpers";

export const COIN_SET = [1, 5, 10, 25, 50, 100, 200, 500, 1000, 2000];

export class CoinChangerGeneticAlgorithm {
  expectedCoinSum: number;
  bestCoinSet: number[];
  maxPopulation: number;
  generations: number;
  bestIndex: number;
  mutationRate: number;
  finished: boolean;
  stopped: boolean;
  population: number[][] = [];
  fitness: number[];
  coinTotalFitness: number[];
  totalSumFitness: number[];
  avgFitness: number;
  cumulativeProportions: number[];

  constructor() {
    this.expectedCoinSum = 0;
    this.bestCoinSet = [];
    this.maxPopulation = 0;
    this.generations = 0;
    this.bestIndex = -1;
    this.mutationRate = 0.01;

    this.finished = false;
    this.stopped = true;
    this.cumulativeProportions = [];
    this.fitness = [];
    this.coinTotalFitness = [];
    this.totalSumFitness = [];
    this.avgFitness = 0;
  }

  generateInitialPopulation() {
    this.generations = 1;

    const length = COIN_SET.length;
    this.population = [];

    for (let i = 0; i < this.maxPopulation; i++) {
      const cromosome: number[] = [];
      for (let j = 0; j < length; j++) {
        const gene = this.getRandomGene();
        cromosome.push(gene);
      }
      shuffleArray(cromosome);
      this.population.push(cromosome);
    }
  }

  stop() {
    this.stopped = true;
  }

  resume() {
    this.stopped = false;
  }

  async run({
    expectedCoinSum,
    maxPopulation,
    mutationRate,
    onNewGen = () => {},
    waitTime = 1000,
  }: {
    expectedCoinSum: number;
    maxPopulation: number;
    mutationRate: number;
    onNewGen?: (p: GAParameters<number[]>) => void;
    waitTime?: number;
  }) {
    this.expectedCoinSum = expectedCoinSum;
    this.maxPopulation = maxPopulation;
    this.mutationRate = mutationRate;

    this.finished = false;
    this.stopped = false;
    this.generations = 1;
    this.population = [];
    this.cumulativeProportions = [];
    this.bestIndex = -1;
    const maxIterations = 1000000;
    let counter = 0;

    this.generateInitialPopulation();

    while (!this.stopped && counter < maxIterations && !this.finished) {
      this.calculateFitness();
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      this.reproduce();

      this.evaluate();
      onNewGen({
        population: this.population,
        fitness: this.fitness,
        bestSolution: this.bestCoinSet,
        generations: this.generations,
        bestIndex: this.bestIndex,
        avgFitness: this.avgFitness,
      });
      counter++;
    }
  }

  getRandomGene() {
    const randomValue = Math.floor(Math.random() * 10);
    return randomValue;
  }

  calculateFitness() {
    const popLength = this.population.length;
    const newFitness = [];

    for (let i = 0; i < popLength; i++) {
      const cromosome = this.population[i];
      let fit = this.sumGenes(cromosome);

      // Difference between expected and cromosome value
      const fitnessDiff = Math.abs(fit - this.expectedCoinSum);
      
      // Total number of coins in the solution
      const individualCoinSum = cromosome.reduce((total, curr) => total + curr);

      // 55% of the fitness will be the total number of coins
      const newCoinTotalFitness = (1 / (individualCoinSum + 1)) * 0.55;

      // 45% of the fitness will be how near is from the expected value
      const newTotalSumFitness = (1 / (fitnessDiff + 1)) * 0.45;

      // We give more priority to number of coins in this particular fitness
      newFitness[i] = newCoinTotalFitness + newTotalSumFitness;
    }

    this.fitness = newFitness;
  }

  reproduce() {
    const newPopulation = [];
    this.calculateProportions();

    for (let i = 0; i < this.maxPopulation; i++) {
      // Get different Parents
      const [cromosomeA, cromosomeB] = this.getParents();

      const newGene = this.crossover(cromosomeA, cromosomeB);
      this.mutate(newGene);
      newPopulation.push(newGene);
    }

    this.population = newPopulation;
    this.generations++;
  }

  calculateProportions() {
    const fitnessSum = this.fitness.reduce((total, curr) => total + curr, 0.0);
    this.avgFitness = fitnessSum / this.fitness.length;
    const proportions = this.fitness.map((fit) => fit / fitnessSum);

    // Create list to hold cumulative values
    this.cumulativeProportions = [];
    let cumulativeTotal = 0.0;

    // Populated cumulated values
    // [0.25, 0.60, 1]
    for (let p of proportions) {
      cumulativeTotal += p;
      this.cumulativeProportions.push(cumulativeTotal);
    }
  }

  crossover(father: number[], mother: number[]) {
    const partition = randomInt(COIN_SET.length - 1);
    let dominant = father;
    let nonDominant = mother;

    const isMotherDominant = Math.random() > 0.5;
    if (isMotherDominant) {
      dominant = mother;
      nonDominant = father;
    }

    const geneSetA = dominant.slice(0, partition);
    const geneSetB = nonDominant.slice(partition);
    const newGene = [...geneSetA, ...geneSetB];
    return newGene;
  }

  mutate(cromosome: number[]) {
    for (let i = 0; i < cromosome.length; i++) {
      const rand = Math.random();
      if (rand < this.mutationRate) {
        cromosome[i] = this.getRandomGene();
      }
    }
  }

  getParents() {
    let cromosomeA = this.naturalSelection();
    while (!cromosomeA) {
      cromosomeA = this.naturalSelection();
    }

    let cromosomeB = this.naturalSelection();
    while (cromosomeA === cromosomeB) {
      cromosomeB = this.naturalSelection();
    }

    return [cromosomeA, cromosomeB];
  }

  naturalSelection() {
    // Generate random number between 0 - 1
    // 0.4
    const selectedValue = Math.random();

    // Loop through cumulative values, until we find value larger than cumulated value
    // 0.25 < 0.4 - No
    // 0.55 > 0.4 - YES!
    for (let i = 0; i < this.cumulativeProportions.length; i++) {
      const value = this.cumulativeProportions[i];
      if (value >= selectedValue) {
        // Return the individual at this index
        return this.population[i];
      }
    }

    // Either generated a number outside the range, or values didn't sum to 1
    throw new Error("Bad proportions");
  }

  evaluate() {
    let bestFitness = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < this.maxPopulation; i++) {
      const cromosome = this.population[i];
      const fitness = this.fitness[i];
      const fitnessDiff = Math.abs(this.fitness[i] - this.expectedCoinSum);
      const sum = this.sumGenes(cromosome);

      if (fitnessDiff < bestFitness) {
        bestFitness = fitness;
        this.bestCoinSet = cromosome;
      }

      if (sum === this.expectedCoinSum) {
        this.finished = true;
        this.bestIndex = i;
        this.bestCoinSet = cromosome;
        this.fitness[i] = 1;
        break;
      }
    }
  }

  sumGenes(cromosome: number[]) {
    let fit = 0;
    for (let j = 0; j < COIN_SET.length; j++) {
      fit += cromosome[j] * COIN_SET[j];
    }
    return fit;
  }
}
