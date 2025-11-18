import { useSearch } from "../store/searchStore";
import '../styles/SearchBar.scss';
import Button from './Button'
import searchIcon from "../assets/search.svg"

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
      <Button className="search-button" type="submit"><img src={searchIcon} alt="Search"/></Button>
    </form>
  );
};

export default SearchBar;
