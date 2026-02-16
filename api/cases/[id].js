const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const result = await pool.query(`SELECT * FROM cases WHERE id=$1`, [id]);
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "PUT") {
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
    try {
      const result = await pool.query(
        `UPDATE cases SET
           status=$1, priority=$2, caseOrigin=$3, caseOwner=$4, contactName=$5, accountName=$6,
           subject=$7, description=$8
         WHERE id=$9 RETURNING *`,
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
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "DELETE") {
    try {
      await pool.query(`DELETE FROM cases WHERE id=$1`, [id]);
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  res.status(405).end();
};
