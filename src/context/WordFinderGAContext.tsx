import React, { createContext, useContext, useEffect, useState } from "react";
import { WordFinderGeneticAlgorithm } from "../services/WordFinderGA";
import { GAParameters } from "../types";

type GAStore = {
  expectedPhrase: string;
  bestPhrase: string;
  maxPopulation: number;
  generations: number;
  winnerIndex: number;
  mutationRate: number;
  bestIndex: number;
  finished: boolean;
  stopped: boolean;
  population: string[][];
  fitness: number[];
  averageFitness: number;
  setExpectedPhrase: (phrase: string) => void;
  setMaxPopulation: (pop: number) => void;
  setMutationRate: (value: number) => void;
  run: (phrase: string) => Promise<void>;
  stop: () => void;
  resume: () => void;
};

export const WordFinderGAContext = createContext<GAStore>({} as GAStore);

export const useWordFinderGAContext = () => useContext(WordFinderGAContext);

const ga: WordFinderGeneticAlgorithm = new WordFinderGeneticAlgorithm();

const WordFinderGAProvider = ({ children }: { children: React.ReactNode }) => {
  const [expectedPhrase, setExpectedPhrase] = useState<string>("");
  const [bestPhrase, setBestPhrase] = useState<string>("");
  const [maxPopulation, setMaxPopulation] = useState<number>(200);
  const [generations, setGenerations] = useState<number>(0);
  const [winnerIndex, setWinnerIndex] = useState<number>(0);
  const [mutationRate, setMutationRate] = useState<number>(0.01);
  const [bestIndex, setBestIndex] = useState<number>(-1);
  const [finished, setFinished] = useState<boolean>(false);
  const [stopped, setStopped] = useState<boolean>(false);
  const [population, setPopulation] = useState<string[][]>([]);
  const [fitness, setFitness] = useState<number[]>([]);
  const [averageFitness, setAverageFitness] = useState<number>(0);

  const onNewGeneration = (params: GAParameters) => {
    setPopulation(params.population);
    setFitness(params.fitness);
    setBestPhrase(params.bestPhrase);
    setGenerations(params.generations);
    setBestIndex(params.bestIndex);
    setAverageFitness(params.avgFitness);
  };

  const run = async (phrase: string) => {
    setExpectedPhrase(phrase);
    setWinnerIndex(-1);
    setFinished(false);
    const framesPerSecond = 1000 / 60;
    setStopped(false);
    await ga.run({
      expectedPhrase: phrase,
      maxPopulation,
      mutationRate,
      onNewGen: onNewGeneration,
      waitTime: framesPerSecond,
    });
  };

  useEffect(() => {
    if (bestIndex === -1) return;
    setWinnerIndex(bestIndex);
    setFinished(true);
  }, [bestIndex])

  const stop = () => {
    ga.stop();
    setStopped(true);
  };

  const resume = () => {
    ga.resume();
  };

  return (
    <WordFinderGAContext.Provider
      value={{
        expectedPhrase,
        setExpectedPhrase,
        bestPhrase,
        maxPopulation,
        setMaxPopulation,
        generations,
        winnerIndex,
        mutationRate,
        setMutationRate,
        bestIndex,
        finished,
        stopped,
        population,
        fitness,
        averageFitness,
        run,
        stop,
        resume,
      }}
    >
      {children}
    </WordFinderGAContext.Provider>
  );
};

export default WordFinderGAProvider;
