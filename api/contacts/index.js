const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { current_page = 0, pageSize = 10, filters, sort } = req.query;
  const parsedFilters = filters ? JSON.parse(filters) : {};

  if (req.method === "GET") {
    const where = Object.keys(parsedFilters)
      .map((k, i) => `${i === 0 ? "WHERE" : "AND"} ${k}='${parsedFilters[k]}'`)
      .join(" ");
    const order = sort ? `ORDER BY ${sort.replace(":", " ")}` : "";

    try {
      const data = await pool.query(
        `SELECT * FROM contacts ${where} ${order} LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );
      const count = await pool.query(`SELECT COUNT(*) FROM contacts ${where}`);
      return res
        .status(200)
        .json({ data: data.rows, count: count.rows[0].count });
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "POST") {
    const {
      salutation,
      firstname,
      lastname,
      accountname,
      title,
      reportsto,
      description,
      contactowner,
      phone,
      email,
      mailingstreet,
      postalcode,
      mailingcity,
      mailingcountry,
      mailingstate,
    } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO contacts
          (salutation, firstName, lastName, accountName, title, reportsTo, description,
           contactOwner, phone, email, mailingStreet, postalCode, mailingCity, mailingCountry, mailingState)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
         RETURNING *`,
        [
          salutation,
          firstname,
          lastname,
          accountname,
          title,
          reportsto,
          description,
          contactowner,
          phone,
          email,
          mailingstreet,
          postalcode,
          mailingcity,
          mailingcountry,
          mailingstate,
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
