import React from "react";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import { useWordFinderGAContext } from "../../../context/WordFinderGAContext";
import { checkForValidCharacters } from "../../../utils/helpers";

function SearchBar() {
  const { setExpectedPhrase, run } = useWordFinderGAContext();
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
    <div className="flex justify-center w-full">
      <form className="flex w-2/3" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Enter a word (UPPERCASE, lowercase and spaces)..."
          className="w-3/4 mr-2"
          value={phrase}
          onChange={(event) => setPhrase(event.target.value)}
        />
        <div className="w-1/4 text-center">
          <Button>Execute</Button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
