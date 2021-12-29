import { useState } from 'react';
import { getItemsList } from '../../services/api';
import { List } from '../../models/models';

import './search-bar.scss';
import clsx from 'clsx';

type Params = {
  onSearch: (list: List) => void;
  className: string;
};

const SearchBar = ({ className, onSearch }: Params) => {
  const barClasses = clsx('search-bar', className);
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
    <div className={barClasses}>
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
