import SearchBar from '../../components/search-bar/search-bar';
import style from './search.module.css';
const Search = () => {
  return (
    <>
      <header className={style['header']}>
        <SearchBar />
      </header>
      <div>Search Page</div>
    </>
  );
};
export default Search;
