import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';

import { getCurrencies, getItemDetails } from '../../services/api';

import { List, Details as DetailsType, Currency } from '../../models/models';
import { parseAmount, parseDecimal, parseSymbol } from '../../utils/utils';

import './details.scss';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<DetailsType>();
  const [currencies, setCurrencies] = useState<Currency[]>([
    {
      id: 'USD',
      symbol: 'U$S',
      description: 'Dólar',
      decimal_places: 2,
    },
  ]);
  const onSearch = (list: List) => {
    console.log(list);
  };
  const getDetails = async () => {
    try {
      const details = await getItemDetails({ id });
      setDetails(details);
    } catch (e) {
      console.error(e);
    }
  };
  const mapCondition = (condition: string): string => {
    switch (condition) {
      case 'new':
        return 'Nuevo';
      default:
        return condition;
    }
  };
  useEffect(() => {
    getDetails();
    getCurrencies()
      .then((currencies) => {
        setCurrencies(currencies);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  let detailsTemplate = <>Loading...</>;
  if (details) {
    detailsTemplate = (
      <div className="details__body">
        <div className="details__box">
          <div className="details__wrapper">
            <img className="details__image" src={details.item.picture} />
            <div className="details__info">
              <span className="details__condition">
                {mapCondition(details.item.condition)}&nbsp;-&nbsp;
                {details.item.sold_quantity} vendidos
              </span>
              <span className="details__title">{details.item.title}</span>
              <div className="details__price">
                <span>
                  {parseSymbol(currencies, details.item.price.currency)}
                </span>
                <div>
                  <span>{parseAmount(details.item.price.amount)}</span>
                  <span className="details__price--decimal">
                    {parseDecimal(details.item.price.decimals)}
                  </span>
                </div>
              </div>
              <button className="details__button">Comprar</button>
            </div>
          </div>
          <div>
            <div>Descripción del producto</div>
            {details.item.description}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Header onSearch={onSearch} />
      {detailsTemplate}
    </>
  );
};

export default Details;
