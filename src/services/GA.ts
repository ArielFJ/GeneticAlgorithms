import { generateAsciiCharacters } from "../utils/helpers";

export class GeneticAlgorithm {
  expectedPhrase: string;
  maxPopulation: number;
  generation: number;
  winnerIndex: number;
  finished: boolean;
  population: string[][] = [];
  fitness: number[];
  possibleCharacters: string[] = [];

  constructor() {
    this.expectedPhrase = "";
    this.maxPopulation = 0;
    this.generation = 0;
    this.winnerIndex = 0;
    this.finished = false;
    this.population = [];
    this.fitness = [];
    this.possibleCharacters = generateAsciiCharacters();
  }

  generateInitialPopulation(expectedPhrase: string, maxPopulation: number) {
    this.expectedPhrase = expectedPhrase;
    this.maxPopulation = maxPopulation;
    this.generation = 1;

    const length = expectedPhrase.length;
    this.population = [];

    for (let i = 0; i < maxPopulation; i++) {
      const cromosome = [];
      for (let j = 0; j < length; j++) {
        const gene = this.getRandomGene();
        cromosome.push(gene);
      }
      this.shuffleArray(cromosome);
      this.population.push(cromosome);
    }

    this.calculateFitness();
  }

  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
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
      if (fit === phraseLength) {
        this.winnerIndex = i;
      }
      this.fitness[i] = fit / this.maxPopulation;
    }
  }

  reproduce() {

  }
}
