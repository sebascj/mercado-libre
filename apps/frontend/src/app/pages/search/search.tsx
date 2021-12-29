import { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar';
import './search.scss';

import { List, Item } from '../../models/models';

const Search = () => {
  const [list, setList] = useState<List>();
  const onSearch = (list: List) => {
    setList(list);
  };

  let listTemplate;
  if (list) {
    listTemplate = (
      <div className="search__box">
        {list.items.map((item: Item, index) => {
          return <div key={'item_' + index}>{item.title}</div>;
        })}
      </div>
    );
  }

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
      <div className="search__body">{listTemplate}</div>
    </>
  );
};
export default Search;
