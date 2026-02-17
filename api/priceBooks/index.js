const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // GET /priceBooks/:id
      if (id) {
        const result = await pool.query(
          `SELECT * FROM priceBooks WHERE id = $1`,
          [id],
        );
        return res.status(200).json(result.rows[0]);
      }

      // GET /priceBooks
      const { current_page = 0, pageSize = 10, filters, sort } = req.query;
      const parsedFilters = filters ? JSON.parse(filters) : {};

      const where = Object.keys(parsedFilters)
        .map(
          (k, i) => `${i === 0 ? "WHERE" : "AND"} ${k}='${parsedFilters[k]}'`,
        )
        .join(" ");

      const order = sort ? `ORDER BY ${sort.replace(":", " ")}` : "";

      const data = await pool.query(
        `SELECT * FROM priceBooks ${where} ${order} LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );

      const count = await pool.query(
        `SELECT COUNT(*) FROM priceBooks ${where}`,
      );

      return res.status(200).json({
        data: data.rows,
        count: count.rows[0].count,
      });
    }

    if (req.method === "POST") {
      const { pricebookname, description, active, isstandard } = req.body;

      const result = await pool.query(
        `INSERT INTO priceBooks (priceBookName, description, active, isStandard)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [pricebookname, description, active, isstandard],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ error: "ID is required" });

      const { pricebookname, description, active, isstandard } = req.body;

      const result = await pool.query(
        `UPDATE priceBooks
         SET priceBookName = $1,
             description = $2,
             active = $3,
             isStandard = $4
         WHERE id = $5
         RETURNING *`,
        [pricebookname, description, active, isstandard, id],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "ID is required" });

      await pool.query(`DELETE FROM priceBooks WHERE id = $1`, [id]);
      return res.status(204).end();
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
