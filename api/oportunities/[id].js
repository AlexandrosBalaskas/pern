const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { id } = req.query;

  if (req.method === "GET") {
    const result = await pool.query(
      "SELECT * FROM oportunities WHERE id = $1",
      [id],
    );
    return res.json(result.rows[0]);
  }

  if (req.method === "PUT") {
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
      UPDATE oportunities SET
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
        id,
      ],
    );

    return res.json(result.rows[0]);
  }

  if (req.method === "DELETE") {
    await pool.query("DELETE FROM oportunities WHERE id=$1", [id]);
    return res.status(204).end();
  }

  res.status(405).end();
};
