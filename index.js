const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

console.log("FINE 1")
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


console.log("FINE 2")
app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});


console.log("FINE 3")
app.post('/product', db.getProduct);
app.post('/product-list', db.getProdcutList);
app.post('/offer-by-barcode', db.getOfferByBarcode);
app.post('/product-by-barcode', db.getProductByBarcode);

// app.post('/login', db.userLogin);


console.log("BEFORELISTENING")
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
console.log("AFTER")