export type Item = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number | null;
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
  category: string;
  item: Item;
};
