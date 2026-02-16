const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  if (req.method === "GET") {
    const { current_page = 0, pageSize = 10, filters, sort } = req.query;

    const parsedFilters = filters ? JSON.parse(filters) : {};
    const where = Object.keys(parsedFilters)
      .map((k, i) => `${i === 0 ? "WHERE" : "AND"} ${k}='${parsedFilters[k]}'`)
      .join(" ");

    const order = sort ? `ORDER BY ${sort.replace(":", " ")}` : "";

    try {
      const data = await pool.query(
        `SELECT * FROM quickTexts ${where} ${order} LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );

      const count = await pool.query(
        `SELECT COUNT(*) FROM quickTexts ${where}`,
      );

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
    const { quicktextname, relatedto, field, message, category } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO quickTexts (quickTextName, relatedTo, field, message, category)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [quicktextname, relatedto, field, message, category],
      );

      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  res.status(405).end();
};
