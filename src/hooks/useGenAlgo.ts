import { useCallback, useMemo } from "react";
import { useSettingsStore } from "../store";
import { GeneticAlgorithm } from "./../services/GA";

const ga = new GeneticAlgorithm();

interface Props {
  totalPopulation: number;
  expectedPhrase: string;
}

export function useGenAlgo() {
  const { totalPopulation } = useSettingsStore((state) => state);
  const [currentPopulation, generation] = useMemo(() => {
    const pop = [];
    for (let i = 0; i < ga.maxPopulation; i++) {
      pop.push({
        cromosome: ga.population[i],
        fitness: ga.fitness[i],
      });
    }
    return [pop, ga.generation];
  }, [ga.population, ga.fitness, ga.generation]);

  const nextGeneration = useCallback(
    (expectedPhrase: string) => {
      ga.generateInitialPopulation(expectedPhrase, totalPopulation);
    },
    [ga]
  );

  return { currentPopulation, generation, nextGeneration };
}
