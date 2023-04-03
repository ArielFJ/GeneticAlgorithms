import React from "react";
// import { useWordFinderGAContext } from "../context/WordFinderGAContext";
import Slider from "./atoms/Slider";

function GeneticAlgorithmFields({ contextFunc }: { contextFunc: any} ) {
  const {
    mutationRate,
    maxPopulation,
    generations,
    averageFitness,
    setMaxPopulation,
    setMutationRate,
  } = contextFunc();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "maxPopulation") {
      setMaxPopulation(Number(value));
    } else if (name === "mutationRate") {
      setMutationRate(Number(value));
    }
  };

  return (
    <div className="mt-10">
      <p className="text-sm">Generation: {generations}</p>
      <p className="text-sm mt-2">
        Average Fitness: {(averageFitness * 100).toFixed(2)}%
      </p>

      <div className="grid grid-cols-2">
        <div>
          <p className="text-sm mt-2">Total population: {maxPopulation}</p>
          <p className="text-sm mt-2">
            Mutation rate: {(mutationRate * 100).toFixed(2)}%
          </p>
        </div>
        <div className="flex flex-col w-2/3 gap-1">
          <Slider
            min={20}
            max={1000}
            value={maxPopulation}
            onChange={handleChange}
            name="maxPopulation"
          />
          <Slider
            min={0.005}
            max={0.1}
            step={0.001}
            value={mutationRate}
            onChange={handleChange}
            name="mutationRate"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneticAlgorithmFields;
