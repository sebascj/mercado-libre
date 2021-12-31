import { useState, useEffect, useMemo, KeyboardEvent } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { getItemsList } from '../../services/api';
import { List } from '../../models/models';

import './search-bar.scss';
import clsx from 'clsx';

type Params = {
  onSearch: (list: List) => void;
  className: string;
};

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const SearchBar = ({ className, onSearch }: Params) => {
  const barClasses = clsx('search-bar', className);
  const [search, setSearch] = useState('');
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const query = useQuery();

  const getList = async (queryString?: string) => {
    const searchParams = queryString || search;
    if (id) {
      redirectToListView(searchParams);
    } else {
      try {
        const itemsList = await getItemsList({ search: searchParams });
        history.push({ search: `search=${searchParams}` });
        onSearch(itemsList);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const redirectToListView = (search: string) => {
    history.push(`/items?search=${search}`);
  };

  const handleSearch = (e: KeyboardEvent) => {
    if (e.code === 'Enter' && search) {
      getList();
    }
  };

  useEffect(() => {
    const searchParam = query.get('search');
    if (searchParam && !id) {
      getList(searchParam);
    }
  }, []);

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
        onKeyDown={handleSearch}
      ></input>
      <button
        className="search-bar__button"
        onClick={() => {
          getList();
        }}
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
