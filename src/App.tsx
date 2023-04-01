import GAProvider from "./context/GAContext";
import GeneticAlgorithm from "./views/GeneticAlgorithm";

function App() {
  return (
    <GAProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <GeneticAlgorithm />
      </div>
    </GAProvider>
  );
}

export default App;
