import { createRef, useEffect, useMemo, useRef } from "react";
import { useSettingsStore } from "../store";
import { useGAContext } from "../context/GAContext";
import SearchBar from "../components/SearchBar";
import Button from "../components/atoms/Button";
import Alert from "../components/atoms/Alert";

function GeneticAlgorithm() {
  const {
    expectedPhrase,
    mutationRate,
    maxPopulation,
    population,
    fitness,
    generations,
    bestPhrase,
    bestIndex,
    averageFitness,
    stop,
    resume,
  } = useGAContext();
  const listItemRefs = useRef(
    Array.from({ length: maxPopulation }).map(() => createRef<HTMLLIElement>())
  );

  const currentPopulation = useMemo(() => {
    return population.map((cromosome, index) => {
      return { cromosome, fitness: fitness[index] };
    });
  }, [population, fitness]);

  useEffect(() => {
    if (bestIndex > -1) {
      const ref = listItemRefs.current[bestIndex];
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [bestIndex]);

  return (
    <>
      <div className="mt-2">
        <SearchBar />
      </div>
      <div className="grid grid-cols-2 h-full mt-2 p-2">
        <div>
          <h4 className="text-xl font-semibold">Expected phrase:</h4>
          <p>{expectedPhrase}</p>

          <h4 className="text-xl font-semibold mt-10">
            Best phrase: {bestIndex > -1 ? `(at position ${bestIndex})` : ""}
          </h4>
          <p>{bestPhrase}</p>

          <div className="mt-10">
            <p className="text-sm">Generation: {generations}</p>
            <p className="text-sm">Average Fitness: {(averageFitness * 100).toFixed(2)}%</p>
            <p className="text-sm">Total population: {maxPopulation}</p>
            <p className="text-sm">Mutation rate: {mutationRate * 100}%</p>
          </div>

          <div className="mt-10 flex justify-center">
            {/* <Button onClick={resume}>Resume</Button> */}
            <Button onClick={stop}>Stop</Button>
          </div>

          <div className="mt-10 flex justify-center">
            {/* // TODO: change state to STOPPED, RUNNING, DONE */}
            {bestIndex > -1 && <Alert>Done!</Alert>}
          </div>
        </div>
        <div className="overflow-auto" style={{ height: '85%'}}>
          <p className="font-semibold">Population set:</p>
          <ul>
            {currentPopulation.map(({ cromosome, fitness }, index) => (
              <li
                key={index}
                title={cromosome.join("")}
                className={index === bestIndex ? "bg-green-500 text-white" : ""}
                ref={listItemRefs.current[index]}
              >
                {index.toString().padStart(3, "0")}: {cromosome.join("")} -{" "}
                {(fitness * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default GeneticAlgorithm;
