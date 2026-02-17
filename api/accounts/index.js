const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 500));

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // SINGLE
      if (id) {
        const result = await pool.query(
          `SELECT * FROM accounts WHERE id = $1`,
          [id],
        );
        return res.status(200).json(result.rows[0]);
      }

      // LIST
      const { current_page = 0, pageSize = 10, filters, sort } = req.query;
      const parsedFilters = filters ? JSON.parse(filters) : {};

      const where = Object.keys(parsedFilters)
        .map(
          (k, i) => `${i === 0 ? "WHERE" : "AND"} ${k}='${parsedFilters[k]}'`,
        )
        .join(" ");

      const order = sort ? `ORDER BY ${sort.replace(":", " ")}` : "";

      const data = await pool.query(
        `SELECT * FROM accounts ${where} ${order}
         LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );

      const count = await pool.query(`SELECT COUNT(*) FROM accounts ${where}`);

      return res.status(200).json({
        data: data.rows,
        count: count.rows[0].count,
      });
    }

    if (req.method === "POST") {
      const body = req.body;

      const result = await pool.query(
        `INSERT INTO accounts
         (accountName, website, type, description, parentAccount, accountOwner, phone,
          billingStreet, billingPostalCode, billingCity, billingCountry, billingState,
          shippingStreet, shippingPostalCode, shippingCity, shippingCountry, shippingState)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
         RETURNING *`,
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
    }

    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      const body = req.body;

      const result = await pool.query(
        `UPDATE accounts SET
          accountName=$1, website=$2, type=$3, description=$4, parentAccount=$5,
          accountOwner=$6, phone=$7,
          billingStreet=$8, billingPostalCode=$9, billingCity=$10,
          billingCountry=$11, billingState=$12,
          shippingStreet=$13, shippingPostalCode=$14, shippingCity=$15,
          shippingCountry=$16, shippingState=$17
         WHERE id=$18
         RETURNING *`,
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
          id,
        ],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      await pool.query(`DELETE FROM accounts WHERE id = $1`, [id]);
      return res.status(204).end();
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
