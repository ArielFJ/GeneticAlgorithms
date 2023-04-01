import { GAParameters } from "../types";
import {
  generateAsciiCharacters,
  randomInt,
  shuffleArray,
} from "../utils/helpers";

export class GeneticAlgorithm {
  expectedPhrase: string;
  bestPhrase: string;
  maxPopulation: number;
  generations: number;
  bestIndex: number;
  mutationRate: number;
  finished: boolean;
  stopped: boolean;
  population: string[][] = [];
  fitness: number[];
  avgFitness: number;
  cumulativeProportions: number[];
  possibleCharacters: string[] = [];

  constructor() {
    this.expectedPhrase = "";
    this.bestPhrase = "";
    this.maxPopulation = 0;
    this.generations = 0;
    this.bestIndex = -1;
    this.mutationRate = 0.01;
    this.finished = false;
    this.stopped = true;
    this.cumulativeProportions = [];
    this.fitness = [];
    this.avgFitness = 0;
    this.possibleCharacters = generateAsciiCharacters();
  }

  get currentPopulation() {
    const pop = [];
    for (let i = 0; i < this.maxPopulation; i++) {
      pop.push({
        cromosome: this.population[i],
        fitness: this.fitness[i],
      });
    }
    return pop;
  }

  generateInitialPopulation() {
    this.generations = 1;

    const length = this.expectedPhrase.length;
    this.population = [];

    for (let i = 0; i < this.maxPopulation; i++) {
      const cromosome = [];
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

  async run(
    expectedPhrase: string,
    maxPopulation: number,
    onNewGen: (p: GAParameters) => void,
    waitTime: number = 1000
  ) {
    this.expectedPhrase = expectedPhrase;
    this.maxPopulation = maxPopulation;

    this.finished = false;
    this.stopped = false;
    this.generations = 1;
    this.population = [];
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
        bestPhrase: this.bestPhrase,
        generations: this.generations,
        bestIndex: this.bestIndex,
        avgFitness: this.avgFitness,
      });
      counter++;
    }
  }

  getRandomGene() {
    const randomIndex = Math.floor(
      Math.random() * this.possibleCharacters.length
    );
    return this.possibleCharacters[randomIndex];
  }

  calculateFitness() {
    const popLength = this.population.length;
    const phraseLength = this.expectedPhrase.length;

    for (let i = 0; i < popLength; i++) {
      const cromosome = this.population[i];
      let fit = 0;
      for (let j = 0; j < phraseLength; j++) {
        const val = cromosome[j];
        if (val === this.expectedPhrase[j]) {
          fit++;
        }
      }

      this.fitness[i] = fit / phraseLength + 0.0000001;
    }
  }

  reproduce() {
    const newPopulation = [];
    this.calculateProportions();

    for (let i = 0; i < this.maxPopulation; i++) {
      // Get different Parents
      const cromosomeA = this.naturalSelection();
      let cromosomeB = this.naturalSelection();
      while (cromosomeA === cromosomeB) {
        cromosomeB = this.naturalSelection();
      }

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

  crossover(father: string[], mother: string[]) {
    const partition = randomInt(this.expectedPhrase.length - 1);
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

  mutate(cromosome: string[]) {
    for (let i = 0; i < cromosome.length; i++) {
      const rand = Math.random();
      if (rand < this.mutationRate) {
        cromosome[i] = this.getRandomGene();
      }
    }
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
    let bestFitness = 0;
    for (let i = 0; i < this.maxPopulation; i++) {
      const cromosome = this.population[i].join("");

      if (this.fitness[i] > bestFitness) {
        bestFitness = this.fitness[i];
        this.bestPhrase = cromosome;
      }

      if (cromosome === this.expectedPhrase) {
        this.finished = true;
        this.bestIndex = i;
        this.bestPhrase = cromosome;
        this.fitness[i] = 1;
        break;
      }
    }
  }
}
