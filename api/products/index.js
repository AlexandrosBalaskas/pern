const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { id } = req.query;

  if (req.method === "GET") {
    // GET ONE
    if (id) {
      try {
        const result = await pool.query(
          `SELECT * FROM products WHERE id = $1`,
          [id],
        );
        return res.status(200).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(500).end();
      }
    }

    // GET MANY
    const { current_page = 0, pageSize = 10, filters, sort } = req.query;

    const parsedFilters = filters ? JSON.parse(filters) : {};
    const where = Object.keys(parsedFilters)
      .map((k, i) => `${i === 0 ? "WHERE" : "AND"} ${k}='${parsedFilters[k]}'`)
      .join(" ");

    const order = sort ? `ORDER BY ${sort.replace(":", " ")}` : "";

    try {
      const data = await pool.query(
        `SELECT * FROM products ${where} ${order}
         LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );

      const count = await pool.query(`SELECT COUNT(*) FROM products ${where}`);

      return res.status(200).json({
        data: data.rows,
        count: count.rows[0].count,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "POST") {
    const {
      productname,
      productfamily,
      productcode,
      active,
      productdescription,
    } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO products
         (productName, productFamily, productCode, active, productDescription)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [productname, productfamily, productcode, active, productdescription],
      );

      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "PUT") {
    if (!id) return res.status(400).json({ error: "Missing id" });

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
         SET productName = $1,
             productFamily = $2,
             productCode = $3,
             active = $4,
             productDescription = $5
         WHERE id = $6
         RETURNING *`,
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
    if (!id) return res.status(400).json({ error: "Missing id" });

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
