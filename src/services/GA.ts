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
  matingPool: number[];
  possibleCharacters: string[] = [];
  // onPopulationChange: (pop: string[][]) => void;

  constructor() {
    this.expectedPhrase = "";
    this.maxPopulation = 0;
    this.generation = 0;
    this.winnerIndex = 0;
    this.mutationRate = 0.01;
    this.finished = false;
    this.stopped = true;
    this.setPopulation([]);
    this.matingPool = [];
    this.fitness = [];
    this.possibleCharacters = generateAsciiCharacters();
    // this.onPopulationChange = onPopChange;
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

  setPopulation(pop: string[][]) {
    this.population =pop;
    // this.onPopulationChange(this.population);
  }

  generateInitialPopulation() {
    this.generation = 1;

    const length = this.expectedPhrase.length;
    this.setPopulation([]);

    for (let i = 0; i < this.maxPopulation; i++) {
      const cromosome = [];
      for (let j = 0; j < length; j++) {
        const gene = this.getRandomGene();
        cromosome.push(gene);
      }
      this.shuffleArray(cromosome);
      this.population.push(cromosome);
    }
  }

  stop() {
    this.stopped = true;
  }

  async run(expectedPhrase: string, maxPopulation: number) {
    this.expectedPhrase = expectedPhrase;
    this.maxPopulation = maxPopulation;

    this.stopped = false;
    this.generation = 1;
    const length = this.expectedPhrase.length;
    this.setPopulation([]);
    const maxIterations = 100;
    let counter = 0;

    this.generateInitialPopulation();

    this.calculateFitness();
    this.naturalSelection();

    while (!this.stopped && counter < maxIterations) {
      // for (let i = 0; i < this.maxPopulation; i++) {
      //   const cromosome = [];
      //   for (let j = 0; j < length; j++) {
      //     const gene = this.getRandomGene();
      //     cromosome.push(gene);
      //   }
      //   this.shuffleArray(cromosome);
      //   this.population.push(cromosome);
      // }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.calculateFitness();
      this.naturalSelection();
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
      this.fitness[i] = fit / this.maxPopulation;
    }
  }

  // Build mating pool
  naturalSelection() {
    const fitnessSum = this.fitness.reduce((total, curr) => total + curr, 0.0);
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

    this.matingPool = options;
    // const indexA = random(options.length - 1);
    // let indexB = random(options.length - 1);

    // const cromosomeA = this.population[options[indexA]];
    // let cromosomeB = this.population[options[indexB]];
    // while (cromosomeA === cromosomeB) {
    //   indexB = random(options.length - 1);
    //   cromosomeB = this.population[options[indexB]];
    // }

    // return {
    //   cromosomeA,
    //   cromosomeB,
    // };
  }

  reproduce() {
    const newPopulation = [];

    for (let i = 0; i < this.maxPopulation; i++) {
      const rand1 = random(this.matingPool.length - 1);
      const rand2 = random(this.matingPool.length - 1);

      const partnerA = this.matingPool[rand1];
      const partnerB = this.matingPool[rand2];

      const cromosomeA = this.population[partnerA];
      const cromosomeB = this.population[partnerB];
      // console.log(
      //   "🚀 ~ file: GA.ts:167 ~ GeneticAlgorithm ~ reproduce ~ partnerA:",
      //   {
      //     len: this.matingPool.length,
      //     rand1,
      //     rand2,
      //     partnerA,
      //     partnerB,
      //     cromosomeA,
      //     cromosomeB,
      //   }
      // );

      const newGene = this.crossover(cromosomeA, cromosomeB);
      this.mutate(newGene);
      newPopulation.push(newGene);
    }

    this.setPopulation(newPopulation);
    this.generation++;
  }

  crossover(cromosomeA: string[], cromosomeB: string[]) {
    const partition = random(this.expectedPhrase.length - 1);
    const geneSetA = cromosomeA.slice(0, partition);
    const geneSetB = cromosomeB.slice(partition);
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
}
