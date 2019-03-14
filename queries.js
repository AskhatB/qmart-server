const jwt = require('jsonwebtoken');
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qmart',
  password: '2509',
  port: 5432
});

const getProduct = (req, res) => {
  const id = parseInt(req.body.id);
  pool.query(
    `SELECT * FROM products.product WHERE products.product.id = ${id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const getProdcutList = (req, res) => {
  console.log(req.body.cartIds);
  pool.query(
    `SELECT * FROM products.product WHERE products.product.id in (${
      req.body.cartIds
    })`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const userLogin = (req, res) => {
  const user = {
    id: 1,
    username: 'Askhat',
    email: 'baltabaev.a2509@gmail.com'
  };
  jwt.sign({ user: user }, 'secret', (err, token) => {
    res.json({ token });
  });
};

module.exports = {
  getProduct,
  getProdcutList,
  userLogin
};
