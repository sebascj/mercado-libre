import * as express from 'express';
import * as bodyParser from 'body-parser';
import { getItemsList, getItemsDetail } from './base/base';

const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.get('/items', async (req, res) => {
  console.log(req.query);
  try {
    const query: string = req.query.search as string;
    const itemsList = await getItemsList(query);
    res.send(itemsList);
  } catch (e) {
    res.send(e);
  }
});
app.get('/items/:id', (req, res) => {
  console.log(req.params);
  res.send({ message: 'Welcome to service!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
