import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSettingsStore } from "../store";
import { GeneticAlgorithm } from "./../services/GA";

interface Props {
  totalPopulation: number;
  expectedPhrase: string;
}

let ga: GeneticAlgorithm = new GeneticAlgorithm();

export function useGenAlgo() {
  const [gaInstance] = useState(ga);
  const { totalPopulation } = useSettingsStore((state) => state);

  const currentPopulation = useMemo(
    () => gaInstance.currentPopulation,
    [gaInstance.generation]
  );
  // const [currentPopulation, setCurrentPopulation] = useState<any[]>([]);

  useEffect(() => {
    console.log(gaInstance.currentPopulation);

    // function handleChange() {
    //   setCurrentPopulation(ga.currentPopulation);
    // }

    // ga.addListener()
  }, [gaInstance.generation]);

  const nextGeneration = useCallback(
    (expectedPhrase: string) => {
      ga.stop();
      ga.run(expectedPhrase, totalPopulation);
    },
    [ga]
  );

  const stop = useCallback(() => {
    ga.stop();
  }, [ga]);

  return { currentPopulation, generation: 0, nextGeneration, stop };
}
