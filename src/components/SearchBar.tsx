import React from "react";
import Button from "./atoms/Button";
import Input from "./atoms/Input";

function SearchBar() {
  return (
    <div className="flex justify-center w-full">
      <form className="flex w-2/3">
        <Input type="text" placeholder="Search..." className="w-3/4 mr-2" />
        <div className="w-1/4 text-center">
          <Button>Change</Button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
