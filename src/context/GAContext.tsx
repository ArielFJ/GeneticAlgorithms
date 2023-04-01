import React, { createContext, useContext, useEffect, useState } from "react";
import { generateAsciiCharacters } from "../utils/helpers";
import { GeneticAlgorithm } from "../services/GA";
import { GAParameters } from "../types";

type GAStore = {
  expectedPhrase: string;
  bestPhrase: string;
  maxPopulation: number;
  generations: number;
  winnerIndex: number;
  mutationRate: number;
  timeoutId: number;
  bestIndex: number;
  finished: boolean;
  stopped: boolean;
  population: string[][];
  fitness: number[];
  averageFitness: number;
  possibleCharacters: string[];
  setExpectedPhrase: (phrase: string) => void;
  setBestPhrase: (phrase: string) => void;
  setMaxPopulation: (pop: number) => void;
  setGenerations: (value: number) => void;
  setWinnerIndex: (value: number) => void;
  setMutationRate: (value: number) => void;
  setTimeoutId: (value: number) => void;
  setFinished: (value: boolean) => void;
  setStopped: (value: boolean) => void;
  setPopulation: (value: string[][]) => void;
  setPossibleCharacters: (value: string[]) => void;
  run: (phrase: string) => Promise<void>;
  stop: () => void;
  resume: () => void;
};

export const GAContext = createContext<GAStore>({} as GAStore);

export const useGAContext = () => useContext(GAContext);

const ga: GeneticAlgorithm = new GeneticAlgorithm();

const GAProvider = ({ children }: { children: React.ReactNode }) => {
  const [expectedPhrase, setExpectedPhrase] = useState<string>("");
  const [bestPhrase, setBestPhrase] = useState<string>("");
  const [maxPopulation, setMaxPopulation] = useState<number>(200);
  const [generations, setGenerations] = useState<number>(0);
  const [winnerIndex, setWinnerIndex] = useState<number>(0);
  const [mutationRate, setMutationRate] = useState<number>(0.01);
  const [timeoutId, setTimeoutId] = useState<number>(0);
  const [bestIndex, setBestIndex] = useState<number>(-1);
  const [finished, setFinished] = useState<boolean>(false);
  const [stopped, setStopped] = useState<boolean>(false);
  const [population, setPopulation] = useState<string[][]>([]);
  const [fitness, setFitness] = useState<number[]>([]);
  const [averageFitness, setAverageFitness] = useState<number>(0);
  const [possibleCharacters, setPossibleCharacters] = useState<string[]>(
    generateAsciiCharacters()
  );

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
    <GAContext.Provider
      value={{
        expectedPhrase,
        setExpectedPhrase,
        bestPhrase,
        setBestPhrase,
        maxPopulation,
        setMaxPopulation,
        generations,
        setGenerations,
        winnerIndex,
        setWinnerIndex,
        mutationRate,
        setMutationRate,
        timeoutId,
        setTimeoutId,
        bestIndex,
        finished,
        setFinished,
        stopped,
        setStopped,
        population,
        setPopulation,
        fitness,
        averageFitness,
        possibleCharacters,
        setPossibleCharacters,
        run,
        stop,
        resume,
      }}
    >
      {children}
    </GAContext.Provider>
  );
};

export default GAProvider;
