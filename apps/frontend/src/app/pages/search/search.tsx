import SearchBar from '../../components/search-bar/search-bar';
import './search.scss';

import { List } from '../../models/models';

const Search = () => {
  const onSearch = (list: List) => {
    console.log(list);
  };
  return (
    <>
      <header className="search-header">
        <SearchBar onSearch={onSearch} />
      </header>
      <div>Search Page</div>
    </>
  );
};
export default Search;
