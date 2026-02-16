const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const result = await pool.query(`SELECT * FROM products WHERE id = $1`, [
        id,
      ]);
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "PUT") {
    const {
      productname,
      productfamily,
      productcode,
      active,
      productdescription,
    } = req.body;

    try {
      const result = await pool.query(
        `UPDATE products
         SET productName = $1, productFamily = $2, productCode = $3, active = $4, productDescription = $5
         WHERE id = $6 RETURNING *`,
        [
          productname,
          productfamily,
          productcode,
          active,
          productdescription,
          id,
        ],
      );

      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "DELETE") {
    try {
      await pool.query(`DELETE FROM products WHERE id = $1`, [id]);
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  res.status(405).end();
};
