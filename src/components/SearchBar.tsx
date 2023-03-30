import React from "react";
import Button from "./atoms/Button";
import Input from "./atoms/Input";

function SearchBar() {
  return (
    <div className="w-2/3">
      <form className="flex">
        <Input type="text" placeholder="Search..." className="w-3/4 mr-2" />
        {/* <input type="submit" value="Change" className="w-1/4 text-center" /> */}
        <div className="w-1/4 text-center">
          <Button text="Change" />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
