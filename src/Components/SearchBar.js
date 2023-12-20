import React from "react";

function SearchBar({ setSearchText, searchText }) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div>
      <input
        type={"text"}
        placeholder="Type to search"
        onChange={setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
