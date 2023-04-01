import React from "react";
import Button from "./atoms/Button";
import Input from "./atoms/Input";
import { useGAContext } from "../context/GAContext";
import { checkForValidCharacters } from "../utils/helpers";

function SearchBar() {
  const { setExpectedPhrase, run } = useGAContext();
  const [phrase, setPhrase] = React.useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phrase || !checkForValidCharacters(phrase)) {
      alert("Please enter a valid phrase (uppercase, lowercase, spaces).")
      return;
    }
    setExpectedPhrase(phrase);
    run(phrase);
  };

  return (
    <div className="flex justify-center w-full bg-white mt-2">
      <form className="flex w-2/3 bg-white" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Enter a word (UPPERCASE, lowercase and spaces)..."
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
