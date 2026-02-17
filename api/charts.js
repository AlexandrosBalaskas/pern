const pool = require("../server/db");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type } = req.query;

  try {
    switch (type) {
      case "casesByPriority": {
        const result = await pool.query(
          `SELECT 
         priority, 
         COUNT(*) as count 
       FROM cases 
       WHERE priority IN ('1', '2', '3') 
       GROUP BY priority`,
        );

        const response = {
          Low: 0,
          Medium: 0,
          High: 0,
        };

        result.rows.forEach((row) => {
          if (row.priority == "1") response.Low = row.count;
          if (row.priority == "2") response.Medium = row.count;
          if (row.priority == "3") response.High = row.count;
        });

        return res.status(200).json(response);
      }

      case "leadsByStatus": {
        const result = await pool.query(
          `SELECT 
      leadStatus, 
         COUNT(*) as count 
       FROM leads 
       WHERE leadStatus IN ('1', '2', '3', '4', '5') 
       GROUP BY leadStatus`,
        );
        const counts = {
          Unqualified: 0,
          Qualified: 0,
          Nurturing: 0,
          Contracted: 0,
          New: 0,
        };

        result.rows.forEach((row) => {
          if (row.leadstatus == "5") {
            counts.Unqualified = row.count;
          } else if (row.leadstatus == "4") {
            counts.Qualified = row.count;
          } else if (row.leadstatus == "3") {
            counts.Nurturing = row.count;
          } else if (row.leadstatus == "2") {
            counts.Contracted = row.count;
          } else if (row.leadstatus == "1") {
            counts.New = row.count;
          }
        });
        res.status(200).send(counts);
      }

      case "oportunitiesByStage": {
        const result = await pool.query(
          `SELECT 
      stage, 
         COUNT(*) as count 
       FROM oportunities 
       WHERE stage IN ('1', '2', '3', '4', '5', '6') 
       GROUP BY stage`,
        );

        const counts = {
          Qualify: 0,
          "Meet & Present": 0,
          Propose: 0,
          Negotiate: 0,
          "Closed Won": 0,
          "Closed Lost": 0,
        };

        result.rows.forEach((row) => {
          if (row.stage == "1") {
            counts.Qualify = row.count;
          } else if (row.stage == "2") {
            counts["Meet & Present"] = row.count;
          } else if (row.stage == "3") {
            counts.Propose = row.count;
          } else if (row.stage == "4") {
            counts.Negotiate = row.count;
          } else if (row.stage == "5") {
            counts["Closed Won"] = row.count;
          } else if (row.stage == "6") {
            counts["Closed Lost"] = row.count;
          }
        });

        return res.status(200).json(counts);
      }

      case "productsByFamily": {
        const result = await pool.query(
          `SELECT 
      productFamily, 
         COUNT(*) as count 
       FROM products 
       WHERE productFamily IN ('1', '2', '3', '4', '5') 
       GROUP BY productFamily`,
        );
        const counts = {
          Electronics: 0,
          Apparel: 0,
          Automobiles: 0,
          Furniture: 0,
          "Home Appliances": 0,
        };

        result.rows.forEach((row) => {
          if (row.productfamily == "1") {
            counts.Electronics = row.count;
          } else if (row.productfamily == "2") {
            counts.Apparel = row.count;
          } else if (row.productfamily == "3") {
            counts.Automobiles = row.count;
          } else if (row.productfamily == "4") {
            counts.Furniture = row.count;
          } else if (row.productfamily == "5") {
            counts["Home Appliances"] = row.count;
          }
        });
        res.status(200).send(counts);
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
