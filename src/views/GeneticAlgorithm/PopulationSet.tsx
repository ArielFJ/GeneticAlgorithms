import {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";

interface Props {
  bestIndex: number;
  population: string[][];
  fitness: number[];
  maxPopulation: number;
}

function PopulationSet({
  bestIndex,
  population,
  fitness,
}: Props) {
  const listRef = useRef() as MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    if (bestIndex > -1) {
      const liElement = listRef.current.children[bestIndex];
      if (!liElement) return;
      liElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [bestIndex]);

  const currentPopulation = useMemo(() => {
    return population.map((cromosome, index) => {
      return { cromosome, fitness: fitness[index] };
    });
  }, [population, fitness]);

  return (
    <ul ref={listRef}>
      {currentPopulation.map(({ cromosome, fitness }, index) => (
        <li
          key={index}
          title={cromosome.join("")}
          className={index === bestIndex ? "bg-green-500 text-white" : ""}
        >
          {index.toString().padStart(3, "0")}: {cromosome.join("")} -{" "}
          {(fitness * 100).toFixed(2)}%
        </li>
      ))}
    </ul>
  );
}

export default PopulationSet;
