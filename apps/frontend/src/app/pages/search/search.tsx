import { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar';
import './search.scss';

import { List, Item } from '../../models/models';

const ItemBox = ({ item }: { item: Item }) => {
  return (
    <>
      <div className="result">
        <img className="result__image" src={item.picture} alt="Result" />
      </div>
      <hr className="search__hr" />
    </>
  );
};

const Search = () => {
  const [list, setList] = useState<List>();
  const onSearch = (list: List) => {
    setList(list);
  };

  let listTemplate;
  if (list) {
    listTemplate = (
      <div className="search__box">
        {list.items.map((item: Item, index) => (
          <ItemBox key={'item_' + index} item={item} />
        ))}
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
