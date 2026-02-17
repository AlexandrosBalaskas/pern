const pool = require("../server/db");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type } = req.query;

  try {
    switch (type) {
      case "casesByPriority": {
        const result = await pool.query(`
          SELECT priority, COUNT(*)::int AS count
          FROM cases
          WHERE priority IN ('1','2','3')
          GROUP BY priority
        `);

        const response = {
          Low: 0,
          Medium: 0,
          High: 0,
        };

        result.rows.forEach((row) => {
          if (row.priority === "1") response.Low = row.count;
          if (row.priority === "2") response.Medium = row.count;
          if (row.priority === "3") response.High = row.count;
        });

        return res.status(200).json(response);
      }

      case "leadsByStatus": {
        const result = await pool.query(`
          SELECT lead_status, COUNT(*)::int AS count
          FROM leads
          GROUP BY lead_status
        `);

        return res.status(200).json(
          result.rows.map((row) => ({
            status: row.lead_status,
            count: row.count,
          })),
        );
      }

      case "opportunitiesByStage": {
        const result = await pool.query(`
          SELECT stage, COUNT(*)::int AS count
          FROM opportunities
          GROUP BY stage
        `);

        return res.status(200).json(
          result.rows.map((row) => ({
            stage: row.stage,
            count: row.count,
          })),
        );
      }

      case "productsByFamily": {
        const result = await pool.query(`
          SELECT product_family, COUNT(*)::int AS count
          FROM products
          GROUP BY product_family
        `);

        return res.status(200).json(
          result.rows.map((row) => ({
            family: row.product_family,
            count: row.count,
          })),
        );
      }

      default:
        return res.status(400).json({
          error: "Invalid chart type",
        });
    }
  } catch (err) {
    console.error("Charts API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
