import { useGAContext } from "../../context/GAContext";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/atoms/Button";
import Alert from "../../components/atoms/Alert";
import GeneticAlgorithmFields from "../../components/GeneticAlgorithmFields";
import PopulationSet from "./PopulationSet";

function GeneticAlgorithm() {
  const {
    expectedPhrase,
    maxPopulation,
    population,
    fitness,
    bestPhrase,
    bestIndex,
    stop,
    stopped,
    finished,
  } = useGAContext();

  return (
    <>
      <div className="sticky top-0">
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

          <GeneticAlgorithmFields />

          <div className="mt-10 flex justify-center">
            {/* <Button onClick={resume}>Resume</Button> */}
            <Button onClick={stop} disabled={stopped}>Stop</Button>
          </div>

          <div className="mt-10 flex justify-center">
            {stopped ? (
              <Alert status="error">Stopped</Alert>
            ) : finished ? (
              <Alert>Done!</Alert>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="overflow-auto">
          <p className="font-semibold">Population set:</p>
          <PopulationSet
            bestIndex={bestIndex}
            fitness={fitness}
            maxPopulation={maxPopulation}
            population={population}
          />
        </div>
      </div>
    </>
  );
}

export default GeneticAlgorithm;
