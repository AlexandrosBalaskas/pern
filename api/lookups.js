const pool = require("../server/db");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();

  const { type } = req.query;

  const queries = {
    account_typeCL: {
      sql: "SELECT * FROM account_type",
      map: (r) => ({ code: r.id, label: r.type }),
    },
    accountsCL: {
      sql: "SELECT * FROM accounts",
      map: (r) => ({ code: r.id, label: r.accountname }),
    },
    case_originCL: {
      sql: "SELECT * FROM case_origin",
      map: (r) => ({ code: r.origin_id, label: r.origin_type }),
    },
    case_statusCL: {
      sql: "SELECT * FROM case_status",
      map: (r) => ({ code: r.status_id, label: r.status_type }),
    },
    contactsCL: {
      sql: "SELECT * FROM contacts",
      map: (r) => ({ code: r.id, label: r.firstname }),
    },
    forecast_categoryCL: {
      sql: "SELECT * FROM forecast_category",
      map: (r) => ({
        code: r.forecast_category_id,
        label: r.forecast_category_type,
      }),
    },
    industryCL: {
      sql: "SELECT * FROM industry",
      map: (r) => ({ code: r.industry_id, label: r.industry_type }),
    },
    lead_sourceCL: {
      sql: "SELECT * FROM lead_source",
      map: (r) => ({ code: r.source_id, label: r.source_type }),
    },
    lead_statusCL: {
      sql: "SELECT * FROM lead_status",
      map: (r) => ({ code: r.status_id, label: r.status_type }),
    },
    priorityCL: {
      sql: "SELECT * FROM priority",
      map: (r) => ({ code: r.priority_id, label: r.priority_type }),
    },
    product_familiesCL: {
      sql: "SELECT * FROM product_families",
      map: (r) => ({ code: r.family_id, label: r.family_type }),
    },
    related_toCL: {
      sql: "SELECT * FROM related_to",
      map: (r) => ({ code: r.related_id, label: r.related_type }),
    },
    salutationCL: {
      sql: "SELECT * FROM salutation",
      map: (r) => ({ code: r.salutation_id, label: r.salutation_type }),
    },
    stageCL: {
      sql: "SELECT * FROM stage",
      map: (r) => ({ code: r.stage_id, label: r.stage_type }),
    },
  };

  if (!queries[type]) {
    return res.status(400).json({ error: "Invalid lookup type" });
  }

  try {
    const data = await pool.query(queries[type].sql);
    const items = data.rows.map(queries[type].map);
    res.status(200).json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
