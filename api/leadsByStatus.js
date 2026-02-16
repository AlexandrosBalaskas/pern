const pool = require("../server/db");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const result = await pool.query(`
      SELECT leadStatus, COUNT(*) AS count
      FROM leads
      WHERE leadStatus IN ('1','2','3','4','5')
      GROUP BY leadStatus
    `);

    const counts = {
      Unqualified: 0,
      Qualified: 0,
      Nurturing: 0,
      Contracted: 0,
      New: 0,
    };

    result.rows.forEach((row) => {
      if (row.leadstatus == "5") counts.Unqualified = row.count;
      if (row.leadstatus == "4") counts.Qualified = row.count;
      if (row.leadstatus == "3") counts.Nurturing = row.count;
      if (row.leadstatus == "2") counts.Contracted = row.count;
      if (row.leadstatus == "1") counts.New = row.count;
    });

    res.status(200).json(counts);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
