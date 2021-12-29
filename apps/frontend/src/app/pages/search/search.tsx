import SearchBar from '../../components/search-bar/search-bar';
import './search.scss';

import { List } from '../../models/models';

const Search = () => {
  const onSearch = (list: List) => {
    console.log(list);
  };
  return (
    <>
      <header className="search__header">
        <img
          className="search__logo"
          src="../../assets/Logo_ML@2x.png"
          alt="Logo"
        />
        <SearchBar className="search__bar" onSearch={onSearch} />
      </header>
      <div className="search__body">Search Page</div>
    </>
  );
};
export default Search;
