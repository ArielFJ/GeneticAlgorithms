import React, { useEffect } from "react";
import { useGenAlgo } from "../hooks/useGenAlgo";
import { useSettingsStore } from "../store";
import Button from "./atoms/Button";
import Input from "./atoms/Input";

function SearchBar() {
  const { expectedPhrase, totalPopulation, setExpectedPhrase } = useSettingsStore(
    (state) => state
  );
  const { currentPopulation, nextGeneration } = useGenAlgo();
  const [phrase, setPhrase] = React.useState<string>('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('in submit')
    event.preventDefault();
    setExpectedPhrase(phrase);
    // nextGeneration(phrase);
  };

  return (
    <div className="flex justify-center w-full">
      <form className="flex w-2/3" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Enter a word..."
          className="w-3/4 mr-2"
          value={phrase}
          onChange={(event) => setPhrase(event.target.value)}
        />
        <div className="w-1/4 text-center">
          <Button>Change</Button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
