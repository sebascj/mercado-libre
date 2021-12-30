import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Item } from '../../models/models';
import Header from '../../components/header/header';

import './search.scss';

const ItemBox = ({ item }: { item: Item }) => {
  const history = useHistory();
  const parseAmount = (amount: number): string => {
    const parsedAmount = new Intl.NumberFormat()
      .format(amount)
      .replace(',', '.');
    return parsedAmount;
  };
  const goToDetails = () => {
    history.push(`/items/${item.id}`);
  };
  return (
    <>
      <div className="result">
        <img
          onClick={goToDetails}
          className="result__image"
          src={item.picture}
          alt="Result"
        />
        <div>
          <div onClick={goToDetails} className="result__price">
            <span>{item.price.currency}</span>
            <span>{parseAmount(item.price.amount)}</span>
            {item.free_shipping && (
              <img src="../../assets/ic_shipping.png" alt="free shipping"></img>
            )}
          </div>
          <div onClick={goToDetails} className="result__title">
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
      <Header onSearch={onSearch} />
      <div className="search__body">{listTemplate}</div>
    </>
  );
};
export default Search;
