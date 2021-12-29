import { List } from '../models/models';

const baseApi = 'http://localhost:3333';

const baseRequest = async <T>({
  resource,
}: {
  resource: string;
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetch(`${baseApi}/${resource}`).then(
      async (result) => {
        const response = await result.json();
        switch (result.status) {
          case 400:
            reject(response);
        }
        resolve(response);
      },
      (error) => reject(error)
    );
  });
};

const getItemsList = ({ search = '' }: { search: string }): Promise<List> => {
  const resource = `items?search=${search}&limit=4`;
  return baseRequest({ resource });
};
export { getItemsList };
