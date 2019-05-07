const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "142.93.136.152",
  database: "postgres",
  password: "2203",
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
    `SELECT * FROM products.product WHERE products.product.id in (${
      req.body.cartIds
    })`,
    (error, results) => {
      if (error) {
        throw error;
      }
      1;
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

module.exports = {
  getProduct,
  getProdcutList,
  getOfferByBarcode,
  getProductByBarcode
};
