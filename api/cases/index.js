const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // SINGLE
      if (id) {
        const result = await pool.query(`SELECT * FROM cases WHERE id = $1`, [
          id,
        ]);
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
        `SELECT * FROM cases ${where} ${order}
         LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );

      const count = await pool.query(`SELECT COUNT(*) FROM cases ${where}`);

      return res.status(200).json({
        data: data.rows,
        count: count.rows[0].count,
      });
    }

    if (req.method === "POST") {
      const {
        status,
        priority,
        caseorigin,
        caseowner,
        contactname,
        accountname,
        subject,
        description,
      } = req.body;

      const result = await pool.query(
        `INSERT INTO cases
         (status, priority, caseOrigin, caseOwner, contactName, accountName, subject, description)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING *`,
        [
          status,
          priority,
          caseorigin,
          caseowner,
          contactname,
          accountname,
          subject,
          description,
        ],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      const {
        status,
        priority,
        caseorigin,
        caseowner,
        contactname,
        accountname,
        subject,
        description,
      } = req.body;

      const result = await pool.query(
        `UPDATE cases SET
           status=$1, priority=$2, caseOrigin=$3, caseOwner=$4,
           contactName=$5, accountName=$6, subject=$7, description=$8
         WHERE id=$9
         RETURNING *`,
        [
          status,
          priority,
          caseorigin,
          caseowner,
          contactname,
          accountname,
          subject,
          description,
          id,
        ],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      await pool.query(`DELETE FROM cases WHERE id = $1`, [id]);
      return res.status(204).end();
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
