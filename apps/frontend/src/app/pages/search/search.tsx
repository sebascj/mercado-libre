import { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar';
import './search.scss';

import { List, Item } from '../../models/models';

const ItemBox = ({ item }: { item: Item }) => {
  const parseAmount = (amount: number): string => {
    const parsedAmount = new Intl.NumberFormat()
      .format(amount)
      .replace(',', '.');
    return parsedAmount;
  };

  return (
    <>
      <div className="result">
        <img className="result__image" src={item.picture} alt="Result" />
        <div>
          <div className="result__price">
            <span>{item.price.currency}</span>
            <span>{parseAmount(item.price.amount)}</span>
            {item.free_shipping && (
              <img src="../../assets/ic_shipping.png" alt="free shipping"></img>
            )}
          </div>
          <div>
            <span>{item.title}</span>
            <span className="result__condition">{item.condition}</span>
          </div>
        </div>
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
