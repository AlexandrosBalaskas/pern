const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // SINGLE
      if (id) {
        const result = await pool.query(
          `SELECT * FROM quickTexts WHERE id = $1`,
          [id],
        );
        return res.status(200).json(result.rows[0]);
      }

      // LIST
      const { current_page = 0, pageSize = 10, filters, sort } = req.query;

      const parsedFilters = filters ? JSON.parse(filters) : {};
      const where = Object.keys(parsedFilters)
        .map(
          (k, i) => `${i === 0 ? "WHERE" : "AND"} ${k}='${parsedFilters[k]}'`,
        )
        .join(" ");

      const order = sort ? `ORDER BY ${sort.replace(":", " ")}` : "";

      const data = await pool.query(
        `SELECT * FROM quickTexts ${where} ${order}
         LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );

      const count = await pool.query(
        `SELECT COUNT(*) FROM quickTexts ${where}`,
      );

      return res.status(200).json({
        data: data.rows,
        count: count.rows[0].count,
      });
    }

    if (req.method === "POST") {
      const { quicktextname, relatedto, field, message, category } = req.body;

      const result = await pool.query(
        `INSERT INTO quickTexts (quickTextName, relatedTo, field, message, category)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [quicktextname, relatedto, field, message, category],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      const { quicktextname, relatedto, field, message, category } = req.body;

      const result = await pool.query(
        `UPDATE quickTexts
         SET quickTextName = $1,
             relatedTo = $2,
             field = $3,
             message = $4,
             category = $5
         WHERE id = $6
         RETURNING *`,
        [quicktextname, relatedto, field, message, category, id],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      await pool.query(`DELETE FROM quickTexts WHERE id = $1`, [id]);
      return res.status(204).end();
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
