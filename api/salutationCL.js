const pool = require("../server/db");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const data = await pool.query("SELECT * FROM salutation");
    const items = data.rows.map((acc) => ({
      code: acc.salutation_id,
      label: acc.salutation_type,
    }));
    res.status(200).json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
