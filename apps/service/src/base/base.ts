import * as https from 'https';
import { List, Item, Details } from '../models/models';
import { parsePrice } from '../utils/utils';

const baseApi = 'https://api.mercadolibre.com';

const getRequest = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          const error = new Error(
            'Request Failed.\n' + `Status Code: ${statusCode}`
          );
          res.resume();
          reject({ message: error.message, statusCode });
        }
        res.setEncoding('utf-8');
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            console.error(e.message);
            reject(e);
          }
        });
      })
      .on('error', (e) => {
        console.error(e.message);
        reject(e);
      });
  });
};

const getCategory = (id: string): Promise<any> => {
  const url = `${baseApi}/categories/${id}`;
  return getRequest(url);
};

const getDescription = (id: string): Promise<any> => {
  const url = `${baseApi}/items/${id}/description`;
  return getRequest(url);
};

const getItemsList = (query = ''): Promise<List> => {
  return new Promise((resolve, reject) => {
    const url = `${baseApi}/sites/MLA/search?q=${query}`;
    getRequest(url)
      .then((data) => {
        const categoryFilters = data.filters.filter(
          (filter) => filter.id === 'category'
        )[0];
        const categories: string[] =
          categoryFilters.values[0].path_from_root.map((type) => type.name);
        const items: Item[] = data.results.map(
          ({
            id,
            title,
            currency_id,
            price,
            thumbnail,
            shipping,
            condition,
          }) => {
            const parsedPrice = parsePrice(price);
            const item: Item = {
              id,
              title,
              condition,
              picture: thumbnail,
              free_shipping: shipping.free_shipping,
              price: {
                currency: currency_id,
                decimals: parsedPrice.decimals,
                amount: parsedPrice.amount,
              },
            };
            return item;
          }
        );
        const list: List = {
          author: {
            name: 'Sebastian',
            lastname: 'Clavijo',
          },
          categories,
          items,
        };
        resolve(list);
      })
      .catch((e) => reject(e));
  });
};

const getItemDetail = (id: string): Promise<Details> => {
  return new Promise((resolve, reject) => {
    const url = `${baseApi}/items/${id}`;
    let category = '';
    let item: Item;
    getRequest(url)
      .then(
        ({
          id,
          category_id,
          title,
          currency_id,
          price,
          pictures,
          shipping,
          condition,
          sold_quantity,
        }) => {
          const parsedPrice = parsePrice(price);
          item = {
            id,
            title,
            condition,
            picture: pictures[0].secure_url,
            free_shipping: shipping.free_shipping,
            price: {
              currency: currency_id,
              amount: parsedPrice.amount,
              decimals: parsedPrice.decimals,
            },
            sold_quantity,
          };
          return getCategory(category_id);
        }
      )
      .then((categoryData) => {
        category = categoryData.name;
        return getDescription(id);
      })
      .then((descriptionData) => {
        item.description = descriptionData.plain_text;
        const details: Details = {
          author: {
            name: 'Sebastian',
            lastname: 'Clavijo',
          },
          category,
          item,
        };
        resolve(details);
      })
      .catch((e) => reject(e));
  });
};

export { getItemsList, getItemDetail };
