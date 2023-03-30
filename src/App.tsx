import Alert from "./components/atoms/Alert";
import Button from "./components/atoms/Button";
import SearchBar from "./components/SearchBar";
import { useGenAlgo } from "./hooks/useGenAlgo";
import { useSettingsStore } from "./store";

function App() {
  const { expectedPhrase, bestPhrase, avgFitness, totalPopulation, mutationRate } = useSettingsStore((state) => state);
  const { currentPopulation, generation } = useGenAlgo();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="mt-2">
        <SearchBar />
      </div>
      <div className="grid grid-cols-2 h-full mt-2 p-2">
        <div>
          <h4 className="text-xl font-semibold">Expected phrase:</h4>
          <p>{expectedPhrase}</p>

          <h4 className="text-xl font-semibold mt-10">Actual phrase:</h4>
          <p>{bestPhrase}</p>

          <div className="mt-10">
            <p className="text-sm">Generation: {generation}</p>
            <p className="text-sm">Average Fitness: {avgFitness * 100}%</p>
            <p className="text-sm">Total population: {totalPopulation}</p>
            <p className="text-sm">Mutation rate: {mutationRate * 100}%</p>
          </div>

          <div className="mt-10 flex justify-evenly">
            <Button>Start</Button>
            <Button>Stop</Button>
          </div>

          <div className="mt-10 flex justify-center">
            {/* // TODO: change state to STOPPED, RUNNING, DONE */}
            <Alert>Done!</Alert>
          </div>
        </div>
        <div className="overflow-auto pb-20">
          <p className="font-semibold">Population set:</p>
          <ul>
            {currentPopulation.map(({ cromosome, fitness }, index) => (
              <li key={index} title={cromosome.join('')}>
                {(index).toString().padStart(3, '0')}: {cromosome.join('')} - {fitness * 100}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
