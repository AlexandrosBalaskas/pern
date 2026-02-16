const pool = require("../server/db");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const result = await pool.query(`
      SELECT stage, COUNT(*) as count
      FROM oportunities
      WHERE stage IN ('1','2','3','4','5','6')
      GROUP BY stage
    `);

    const counts = {
      Qualify: 0,
      "Meet & Present": 0,
      Propose: 0,
      Negotiate: 0,
      "Closed Won": 0,
      "Closed Lost": 0,
    };

    result.rows.forEach((row) => {
      if (row.stage === "1") counts.Qualify = row.count;
      if (row.stage === "2") counts["Meet & Present"] = row.count;
      if (row.stage === "3") counts.Propose = row.count;
      if (row.stage === "4") counts.Negotiate = row.count;
      if (row.stage === "5") counts["Closed Won"] = row.count;
      if (row.stage === "6") counts["Closed Lost"] = row.count;
    });

    res.status(200).json(counts);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
