const pool = require("../../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  if (req.method === "GET") {
    const { current_page = 0, pageSize = 10, filters, sort } = req.query;

    const parsedFilters = filters ? JSON.parse(filters) : {};
    const where = Object.keys(parsedFilters)
      .map((k, i) => `${i === 0 ? "WHERE" : "AND"} ${k}='${parsedFilters[k]}'`)
      .join(" ");

    const order = sort ? `ORDER BY ${sort.replace(":", " ")}` : "";

    const data = await pool.query(
      `SELECT * FROM oportunities ${where} ${order} LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
      [current_page],
    );

    const count = await pool.query(
      `SELECT COUNT(*) FROM oportunities ${where}`,
    );

    return res.json({
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
      `
      INSERT INTO oportunities
      (oportunityName, accountName, closeDate, amount, description,
       oportunityOwner, stage, probability, forecastCategory, nextStep)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
      `,
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

  res.status(405).end();
};
