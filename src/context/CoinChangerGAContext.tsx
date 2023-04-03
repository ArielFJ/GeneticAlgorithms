import React, { createContext, useContext, useEffect, useState } from "react";
import { WordFinderGeneticAlgorithm } from "../services/WordFinderGA";
import { GAParameters } from "../types";
import { CoinChangerGeneticAlgorithm } from "../services/CoinChangerGA";

type GAStore = {
  expectedCoinSum: number;
  bestSolution: number[];
  maxPopulation: number;
  generations: number;
  winnerIndex: number;
  mutationRate: number;
  bestIndex: number;
  finished: boolean;
  stopped: boolean;
  population: number[][];
  fitness: number[];
  averageFitness: number;
  setExpectedCoinSum: (coinSum: number) => void;
  setMaxPopulation: (pop: number) => void;
  setMutationRate: (value: number) => void;
  run: (coinSum: number) => Promise<void>;
  stop: () => void;
  resume: () => void;
};

export const CoinChangerGAContext = createContext<GAStore>({} as GAStore);

export const useCoinChangerGAContext = () => useContext(CoinChangerGAContext);

const ga: CoinChangerGeneticAlgorithm = new CoinChangerGeneticAlgorithm();

const CoinChangerGAProvider = ({ children }: { children: React.ReactNode }) => {
  const [expectedCoinSum, setExpectedCoinSum] = useState<number>(0);
  const [bestSolution, setBestSolution] = useState<number[]>([]);
  const [maxPopulation, setMaxPopulation] = useState<number>(200);
  const [generations, setGenerations] = useState<number>(0);
  const [winnerIndex, setWinnerIndex] = useState<number>(0);
  const [mutationRate, setMutationRate] = useState<number>(0.01);
  const [bestIndex, setBestIndex] = useState<number>(-1);
  const [finished, setFinished] = useState<boolean>(false);
  const [stopped, setStopped] = useState<boolean>(false);
  const [population, setPopulation] = useState<number[][]>([]);
  const [fitness, setFitness] = useState<number[]>([]);
  const [averageFitness, setAverageFitness] = useState<number>(0);

  const onNewGeneration = (params: GAParameters<number[]>) => {
    setPopulation(params.population);
    setFitness(params.fitness);
    setBestSolution(params.bestSolution);
    setGenerations(params.generations);
    setBestIndex(params.bestIndex);
    setAverageFitness(params.avgFitness);
  };

  const run = async (coinSum: number) => {
    setExpectedCoinSum(coinSum);
    setWinnerIndex(-1);
    setFinished(false);
    const framesPerSecond = 1000 / 60;
    setStopped(false);
    await ga.run({
      expectedCoinSum: coinSum,
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
    <CoinChangerGAContext.Provider
      value={{
        expectedCoinSum,
        setExpectedCoinSum: setExpectedCoinSum,
        bestSolution,
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
    </CoinChangerGAContext.Provider>
  );
};

export default CoinChangerGAProvider;
