const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const result = await pool.query(
        `SELECT * FROM priceBooks WHERE id = $1`,
        [id],
      );
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "PUT") {
    const { pricebookname, description, active, isstandard } = req.body;
    try {
      const result = await pool.query(
        `UPDATE priceBooks SET priceBookName = $1, description = $2, active = $3, isStandard = $4
         WHERE id = $5 RETURNING *`,
        [pricebookname, description, active, isstandard, id],
      );
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "DELETE") {
    try {
      await pool.query(`DELETE FROM priceBooks WHERE id = $1`, [id]);
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  res.status(405).end();
};
