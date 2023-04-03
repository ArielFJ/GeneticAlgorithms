import { useWordFinderGAContext } from "../../context/WordFinderGAContext";
import Button from "../../components/atoms/Button";
import Alert from "../../components/atoms/Alert";
import GeneticAlgorithmFields from "../../components/GeneticAlgorithmFields";
import PopulationSet from "../../components/PopulationSet";
import MainLayout from "../../layouts/MainLayout";
import SearchBar from "./components/SearchBar";
import { useCoinChangerGAContext } from "../../context/CoinChangerGAContext";
import { COIN_SET } from "../../services/CoinChangerGA";

function CoinChanger(): JSX.Element {
  const {
    expectedCoinSum,
    maxPopulation,
    population,
    fitness,
    bestSolution,
    bestIndex,
    stop,
    stopped,
    finished,
  } = useCoinChangerGAContext();
  console.log(
    "🚀 ~ file: index.tsx:22 ~ CoinChanger ~ bestSolution:",
    bestSolution
  );
  const dollarUsLocale = new Intl.NumberFormat("en-US");

  return (
    <MainLayout extraHeader={<SearchBar />}>
      <>
        <div className="grid grid-cols-2 h-full mt-2 p-2">
          <div>
            <h4 className="text-xl font-semibold">Available Coins</h4>
            <p>{JSON.stringify(COIN_SET)}</p>

            <h4 className="text-xl font-semibold mt-10">Expected coins:</h4>
            <p>{expectedCoinSum}</p>

            <h4 className="text-xl font-semibold mt-10">
              Best solution:{" "}
              {bestIndex > -1 ? `(at position ${bestIndex})` : ""}
            </h4>
            <p>{bestSolution.join(",")}</p>

            <GeneticAlgorithmFields contextFunc={useCoinChangerGAContext} />

            <div className="mt-10 flex justify-center">
              {/* <Button onClick={resume}>Resume</Button> */}
              <Button onClick={stop} disabled={stopped}>
                Stop
              </Button>
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
              geneSeparator=","
              // formatFitness={(fitness) => dollarUsLocale.format(fitness)}
            />
          </div>
        </div>
      </>
    </MainLayout>
  );
}

export default CoinChanger;
