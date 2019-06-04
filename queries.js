const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: '142.93.136.152',
  database: 'postgres',
  password: '2203',
  port: 5432
});

const getProduct = (req, res) => {
  const id = parseInt(req.body.id);
  pool.query(
    `SELECT * FROM products.product WHERE products.product.product_id = ${id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const getProductByBarcode = (req, res) => {
  pool.query(
    `SELECT * FROM products.product WHERE products.product.barcode_id = ${
      req.body.barcode
    }`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows[0]);
    }
  );
};

const getProdcutList = (req, res) => {
  pool.query(
    `SELECT * FROM 
      products.product as p 
      INNER JOIN products.offers as o 
      ON p.product_id=o.productid 
      where p.barcode_id in (${req.body.cartIds}) AND o.supermarketid = ${
      req.body.sup_id
    };`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getOfferByBarcode = (req, res) => {
  pool.query(
    `
    SELECT * FROM
    products.offers
    WHERE
    products.offers.productid = (
      SELECT product_id FROM
       products.product
       WHERE products.product.barcode_id = ${
         req.body.barcode
       }) AND products.offers.supermarketid = ${req.body.sup_id}
  `,
    (error, results) => {
      if (error) {
        res.status(200).json(error);
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const clientRegistration = (req, res) => {
  const { firstName, lastName, password, phone } = req.body;
  pool.query(
    `INSERT INTO
      products.client(first_name, last_name, password, phone)
      VALUES ('${firstName}', '${lastName}', '${password}',${phone})`,
    (error, response) => {
      if (error) {
        res.status(200).json(error);
      }
      res.status(200).json(response);
    }
  );
};

const clientLogIn = (req, res) => {
  const { phone, password } = req.body;
  pool.query(
    `SELECT client_id, password FROM products.client WHERE phone = ${phone}`,
    (error, response) => {
      if (error) {
        throw error;
      }
      try {
        if (response.rows[0].password !== password) {
          res.status(200).json({ status: 'Неверный пароль' });
        } else {
          res.status(200).json(response.rows[0]);
        }
      } catch (err) {
        console.log(err);
        res.status(200).json({ status: 'Неверный логин' });
      }
    }
  );
};

module.exports = {
  getProduct,
  getProdcutList,
  getOfferByBarcode,
  getProductByBarcode,
  clientRegistration,
  clientLogIn
};
