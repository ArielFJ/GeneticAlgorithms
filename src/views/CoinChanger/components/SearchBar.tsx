import React from "react";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import { checkForValidCharacters } from "../../../utils/helpers";
import { useWordFinderGAContext } from "../../../context/WordFinderGAContext";
import { useCoinChangerGAContext } from "../../../context/CoinChangerGAContext";

function SearchBar() {
  const { setExpectedCoinSum, run } = useCoinChangerGAContext();
  const [value, setValue] = React.useState(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value || value <= 0) {
      alert("Please enter a valid number greater than 0.")
      return;
    }
    setExpectedCoinSum(isNaN(value) ? 0 : value);
    run(value);
  };

  return (
    <div className="flex justify-center w-full">
      <form className="flex w-2/3" onSubmit={onSubmit}>
        <Input
          type="number"
          placeholder="Enter a number (100, 1024, 2020)..."
          className="w-3/4 mr-2"
          value={value}
          onChange={(event) => setValue(parseInt(event.target.value))}
        />
        <div className="w-1/4 text-center">
          <Button>Change</Button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
