import * as https from 'https';
import { List, Item } from '../models/models';

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
          console.error(error.message);
          res.resume();
          reject(error);
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

const getItemsList = (query = ''): Promise<List> => {
  return new Promise((resolve, reject) => {
    const url = `${baseApi}/sites/MLA/search?q=${query}`;
    getRequest(url).then(
      (data) => {
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
            const decimalStr = (price + '').split('.')[1];
            const decimals = parseFloat(`.${decimalStr}`);
            const item: Item = {
              id,
              title,
              condition,
              picture: thumbnail,
              free_shipping: shipping.free_shipping,
              price: {
                currency: currency_id,
                decimals,
                amount: Math.trunc(price),
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
      },
      (e) => {
        reject(e);
      }
    );
  });
};

const getItemsDetail = (id: string) => {
  const url = `${baseApi}/items/${id}/description`;
  return getRequest(url);
};

export { getItemsList, getItemsDetail };
