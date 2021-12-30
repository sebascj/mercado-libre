import { Currency } from '../models/models';

const parseAmount = (amount: number): string => {
  const parsedAmount = new Intl.NumberFormat().format(amount).replace(',', '.');
  return parsedAmount;
};

const parseDecimal = (decimal: number): string => {
  let result: number | string = decimal * 100;
  result = result.toString();
  result = result.length === 1 ? '0' + result : result;
  return result;
};

const parseSymbol = (currencies: Currency[], currencyId: string): string => {
  const currency = currencies.filter((element) => {
    return element.id === currencyId;
  })[0];
  return currency.symbol;
};

export { parseAmount, parseDecimal, parseSymbol };
