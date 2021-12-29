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
};

export type List = {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: Item[];
};
