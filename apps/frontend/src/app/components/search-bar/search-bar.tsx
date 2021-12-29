import { useState } from 'react';
import { getItemsList } from '../../services/api';
import { List } from '../../models/models';

import './search-bar.scss';

type Params = {
  onSearch: (list: List) => void;
};

const SearchBar = ({ onSearch }: Params) => {
  const [search, setSearch] = useState('');
  const getList = async () => {
    try {
      const itemsList = await getItemsList({ search });
      onSearch(itemsList);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        placeholder="Nunca dejes de buscar"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
      <button
        className="search-bar__button"
        onClick={getList}
        disabled={!search}
      >
        <img
          className="search-bar__image"
          src="../../assets/ic_Search@2x.png"
          alt="search"
        ></img>
      </button>
    </div>
  );
};
export default SearchBar;
