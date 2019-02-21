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

module.exports = {
  getProduct
};
