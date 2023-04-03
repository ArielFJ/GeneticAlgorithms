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
            <p>
              {COIN_SET.map((coin, index) => (
                <span
                  key={index}
                  className="border-b-2 border-b-green-500 mr-4"
                >
                  ${coin}
                </span>
              ))}
            </p>

            <h4 className="text-xl font-semibold mt-10">Expected Value:</h4>
            <p>$ {expectedCoinSum}</p>

            <h4 className="text-xl font-semibold mt-10">
              Best solution:{" "}
              {bestIndex > -1 ? `(at position ${bestIndex})` : ""}
            </h4>
            {finished && COIN_SET.map((coin, index) =>
              bestSolution[index] > 0 ? (
                <p key={index}>
                  <span className="border-b-2 border-b-red-400">
                    # {bestSolution[index]}
                  </span>{" "}
                  coin(s) of{" "}
                  <span className="border-b-2 border-b-green-500 mr-2">
                    ${coin}
                  </span>
                </p>
              ) : (
                <></>
              )
            )}

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
