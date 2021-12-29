type Price = {
  amount: number;
  decimals: number;
};

const parsePrice = (price: number): Price => {
  const decimalStr = (price + '').split('.')[1] || 0;
  const decimals = parseFloat(`0.${decimalStr}`);
  return { amount: Math.trunc(price), decimals };
};

export { parsePrice };
