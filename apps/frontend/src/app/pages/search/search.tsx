import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Item, Currency } from '../../models/models';
import { parseAmount, parseSymbol } from '../../utils/utils';
import Header from '../../components/header/header';
import { getCurrencies } from '../../services/api';

import './search.scss';
import BreadCrumb from '../../components/breadcrumb/breadcrumb';

const ItemBox = ({
  item,
  currencies,
}: {
  item: Item;
  currencies: Currency[];
}) => {
  const history = useHistory();
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
            <span>{parseSymbol(currencies, item.price.currency)}</span>
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
  const [currencies, setCurrencies] = useState<Currency[]>([
    {
      id: 'USD',
      symbol: 'U$S',
      description: 'Dólar',
      decimal_places: 2,
    },
  ]);
  const onSearch = (list: List) => {
    setList(list);
  };

  useEffect(() => {
    getCurrencies()
      .then((currencies) => {
        setCurrencies(currencies);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  let listTemplate;
  if (list) {
    listTemplate = (
      <div className="search__box">
        {list.items.map((item: Item, index) => (
          <ItemBox key={'item_' + index} item={item} currencies={currencies} />
        ))}
      </div>
    );
  }

  return (
    <>
      <Header onSearch={onSearch} />
      <div className="search__body">
        {list && <BreadCrumb path={list.categories} />}
        {listTemplate}
      </div>
    </>
  );
};

export default Search;
