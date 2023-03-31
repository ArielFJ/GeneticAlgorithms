import { generateAsciiCharacters, random } from "../utils/helpers";

export class GeneticAlgorithm {
  expectedPhrase: string;
  maxPopulation: number;
  generation: number;
  winnerIndex: number;
  mutationRate: number;
  finished: boolean;
  stopped: boolean;
  population: string[][] = [];
  fitness: number[];
  possibleCharacters: string[] = [];

  constructor() {
    this.expectedPhrase = "";
    this.maxPopulation = 0;
    this.generation = 0;
    this.winnerIndex = 0;
    this.mutationRate = 0.01;
    this.finished = false;
    this.stopped = true;
    this.population = [];
    this.fitness = [];
    this.possibleCharacters = generateAsciiCharacters();
  }

  generateInitialPopulation() {
    this.generation = 1;

    const length = this.expectedPhrase.length;
    this.population = [];

    for (let i = 0; i < this.maxPopulation; i++) {
      const cromosome = [];
      for (let j = 0; j < length; j++) {
        const gene = this.getRandomGene();
        cromosome.push(gene);
      }
      this.shuffleArray(cromosome);
      this.population.push(cromosome);
    }

    this.calculateFitness();
    this.reproduce();
  }

  stop() {
    this.stopped = true;
    console.log('stopped');
  }

  run(expectedPhrase: string, maxPopulation: number) {
    this.expectedPhrase = expectedPhrase;
    this.maxPopulation = maxPopulation;

    this.stopped = false;
    this.generation = 1;
    const length = this.expectedPhrase.length;
    this.population = [];
    const maxIterations = 100;
    let counter = 0;

    while (!this.stopped && counter < maxIterations) {
      for (let i = 0; i < this.maxPopulation; i++) {
        const cromosome = [];
        for (let j = 0; j < length; j++) {
          const gene = this.getRandomGene();
          cromosome.push(gene);
        }
        this.shuffleArray(cromosome);
        this.population.push(cromosome);
      }

      this.calculateFitness();
      this.reproduce();
      counter++;
    }
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
      this.fitness[i] = fit / this.maxPopulation + 0.0001;
    }
  }

  reproduce() {
    const fitnessSum = this.fitness.reduce((total, curr) => total + curr, 0.0);
    // const probabilitiesLength = Math.floor(1 / fitnessSum);
    const normalizedFitness = [];
    for (let i = 0; i < this.fitness.length; i++) {
      const fit = this.fitness[i];
      if (fit > 0.0) {
        normalizedFitness.push({
          index: i,
          value: Math.floor((fit / fitnessSum) * 100),
        });
      }
    }

    const options = [];
    for (let fitness of normalizedFitness) {
      for (let i = 0; i < fitness.value; i++) {
        options.push(fitness.index);
      }
    }

    const indexA = random(options.length - 1);
    const indexB = random(options.length - 1);

    const cromosomeA = this.population[indexA];
    const cromosomeB = this.population[indexB];

    const newPopulation = [];
    for (let i = 0; i < this.maxPopulation; i++) {
      const partition = random(this.expectedPhrase.length - 1);
      const geneSetA = cromosomeA.slice(0, partition);
      const geneSetB = cromosomeB.slice(partition);

      const newGene = [...geneSetA, ...geneSetB];
      this.mutate(newGene);
      newPopulation.push(newGene);
    }

    this.population = newPopulation;
  }

  mutate(cromosome: string[]) {
    const rand = Math.random();
    if (rand < this.mutationRate) {
      const randIndex = random(this.expectedPhrase.length - 1);
      cromosome[randIndex] = this.getRandomGene();
    }
  }
}
