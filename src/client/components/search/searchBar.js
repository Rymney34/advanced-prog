import { useContext } from "react";
import { SearchContext } from "../context/context";
import "./searchBar.css"

function SearchBar() {
  const { search, setSearch } = useContext(SearchContext);

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value);
  
  }

  return (
    <div className='searchBarWrapper'>
      <input className='searchBar'
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
      />
    </div>
  )
}
export default SearchBar