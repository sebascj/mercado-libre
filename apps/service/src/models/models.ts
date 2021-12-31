export type Item = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity?: number;
  description?: string;
};

export type List = {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: Item[];
};

export type Details = {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  item: Item;
};

export type Currency = {
  id: string;
  symbol: string;
  description: string;
  decimal_places: number;
};
