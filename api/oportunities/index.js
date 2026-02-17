const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // SINGLE
      if (id) {
        const result = await pool.query(
          `SELECT * FROM oportunities WHERE id = $1`,
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
        `SELECT * FROM oportunities ${where} ${order}
         LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );

      const count = await pool.query(
        `SELECT COUNT(*) FROM oportunities ${where}`,
      );

      return res.status(200).json({
        data: data.rows,
        count: count.rows[0].count,
      });
    }

    if (req.method === "POST") {
      const {
        oportunityname,
        accountname,
        closedate,
        amount,
        description,
        oportunityowner,
        stage,
        probability,
        forecastcategory,
        nextstep,
      } = req.body;

      const result = await pool.query(
        `INSERT INTO oportunities
         (oportunityName, accountName, closeDate, amount, description,
          oportunityOwner, stage, probability, forecastCategory, nextStep)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         RETURNING *`,
        [
          oportunityname,
          accountname,
          closedate,
          amount,
          description,
          oportunityowner,
          stage,
          probability,
          forecastcategory,
          nextstep,
        ],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      const {
        oportunityname,
        accountname,
        closedate,
        amount,
        description,
        oportunityowner,
        stage,
        probability,
        forecastcategory,
        nextstep,
      } = req.body;

      const result = await pool.query(
        `UPDATE oportunities SET
          oportunityName=$1,
          accountName=$2,
          closeDate=$3,
          amount=$4,
          description=$5,
          oportunityOwner=$6,
          stage=$7,
          probability=$8,
          forecastCategory=$9,
          nextStep=$10
         WHERE id=$11
         RETURNING *`,
        [
          oportunityname,
          accountname,
          closedate,
          amount,
          description,
          oportunityowner,
          stage,
          probability,
          forecastcategory,
          nextstep,
          id,
        ],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      await pool.query(`DELETE FROM oportunities WHERE id=$1`, [id]);
      return res.status(204).end();
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
