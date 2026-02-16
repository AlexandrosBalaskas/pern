const pool = require("../server/db");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const result = await pool.query(
      `SELECT priority, COUNT(*) as count FROM cases WHERE priority IN ('1','2','3') GROUP BY priority`,
    );

    const counts = { Low: 0, Medium: 0, High: 0 };
    result.rows.forEach((row) => {
      if (row.priority == "1") counts.Low = row.count;
      if (row.priority == "2") counts.Medium = row.count;
      if (row.priority == "3") counts.High = row.count;
    });

    res.status(200).json(counts);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
