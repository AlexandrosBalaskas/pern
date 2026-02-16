const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 500));

  const { current_page = 0, pageSize = 10, filters, sort } = req.query;
  const parsedFilters = filters ? JSON.parse(filters) : {};

  if (req.method === "GET") {
    const where = Object.keys(parsedFilters)
      .map((k, i) => `${i === 0 ? "WHERE" : "AND"} ${k}='${parsedFilters[k]}'`)
      .join(" ");
    const order = sort ? `ORDER BY ${sort.replace(":", " ")}` : "";

    try {
      const data = await pool.query(
        `SELECT * FROM accounts ${where} ${order} LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );
      const count = await pool.query(`SELECT COUNT(*) FROM accounts ${where}`);
      return res
        .status(200)
        .json({ data: data.rows, count: count.rows[0].count });
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "POST") {
    const body = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO accounts
         (accountName, website, type, description, parentAccount, accountOwner, phone,
          billingStreet, billingPostalCode, billingCity, billingCountry, billingState,
          shippingStreet, shippingPostalCode, shippingCity, shippingCountry, shippingState)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`,
        [
          body.accountname,
          body.website,
          body.type,
          body.description,
          body.parentaccount,
          body.accountowner,
          body.phone,
          body.billingstreet,
          body.billingpostalcode,
          body.billingcity,
          body.billingcountry,
          body.billingstate,
          body.shippingstreet,
          body.shippingpostalcode,
          body.shippingcity,
          body.shippingcountry,
          body.shippingstate,
        ],
      );
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  res.status(405).end();
};
