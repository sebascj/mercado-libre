import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { getItemsList, getItemDetail, getCurrenciesList } from './base/base';

const app = express();
const jsonParser = bodyParser.json();
const corsOptions = {
  origin: ['http://localhost:4200'],
};

app.use(jsonParser);
app.use(cors(corsOptions));

app.get('/items', async (req, res) => {
  try {
    const query: string = req.query.search as string;
    const limit: string = req.query.limit as string;
    const itemsList = await getItemsList(query, limit);
    res.send(itemsList);
  } catch (e) {
    res.status(e.statusCode || 500).send({ message: e.message });
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    const id: string = req.params.id;
    const itemDetail = await getItemDetail(id);
    res.send(itemDetail);
  } catch (e) {
    res.status(e.statusCode || 500).send({ message: e.message });
  }
});

app.get('/currencies', async (req, res) => {
  try {
    const currencies = await getCurrenciesList();
    res.send(currencies);
  } catch (e) {
    res.status(e.statusCode || 500).send({ message: e.message });
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
