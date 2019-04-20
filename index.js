const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8900;

const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.post('/product', db.getProduct);
app.post('/product-list', db.getProdcutList);
app.post('/offer-by-barcode', db.getOfferByBarcode);
app.post('/product-by-barcode', db.getProductByBarcode);

// app.post('/login', db.userLogin);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});