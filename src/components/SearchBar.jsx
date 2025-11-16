import { useSearch } from "../store/searchStore";
import '../styles/SearchBar.scss';

const SearchBar = () => {
  const { inputValue, setInputValue, triggerSearch } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    triggerSearch();
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Search Jobs"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" >Search</button>
    </form>
  );
};

export default SearchBar;
