import SearchBar from '../../components/search-bar/search-bar';
import style from './search.module.css';

import { List } from '../../models/models';

const Search = () => {
  const onSearch = (list: List) => {
    console.log(list);
  };
  return (
    <>
      <header className={style['header']}>
        <SearchBar onSearch={onSearch} />
      </header>
      <div>Search Page</div>
    </>
  );
};
export default Search;
