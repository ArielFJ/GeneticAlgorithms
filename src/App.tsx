import { useState } from "react";
import Alert from "./components/atoms/Alert";
import Button from "./components/atoms/Button";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <SearchBar />
      <div className="grid grid-cols-2 h-full mt-2 p-2">
        <div>
          <h4 className="text-xl font-semibold">Expected phrase:</h4>
          <p>React is a JavaScript library for building user interfaces.</p>

          <h4 className="text-xl font-semibold mt-10">Actual phrase:</h4>
          <p>React is a JavaScript library for building user interfaces.</p>

          <div className="mt-10">
            <p className="text-sm">Generation: 0</p>
            <p className="text-sm">Average Fitness: 0%</p>
            <p className="text-sm">Total population: 0</p>
            <p className="text-sm">Mutation rate: 0%</p>
          </div>

          <div className="mt-10 flex justify-evenly">
            <Button>Start</Button>
            <Button>Stop</Button>
          </div>

          <div className="mt-10 flex justify-center">
            <Alert>Done!</Alert>
          </div>
        </div>
        <div className="overflow-auto pb-20">
          <p className="font-semibold">Population set:</p>
          <ul>
            {Array.from({ length: 100 }).map((_, index) => (
              <li key={index} title='Generated Phrase'>{index}: Generated Phrase</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
