const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // SINGLE
      if (id) {
        const result = await pool.query(
          `SELECT * FROM contacts WHERE id = $1`,
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
        `SELECT * FROM contacts ${where} ${order}
         LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );

      const count = await pool.query(`SELECT COUNT(*) FROM contacts ${where}`);

      return res.status(200).json({
        data: data.rows,
        count: count.rows[0].count,
      });
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

      const result = await pool.query(
        `INSERT INTO contacts
         (salutation, firstName, lastName, accountName, title, reportsTo, description,
          contactOwner, phone, email, mailingStreet, postalCode, mailingCity,
          mailingCountry, mailingState)
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
    }

    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ error: "Missing id" });

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

      const result = await pool.query(
        `UPDATE contacts SET
          salutation=$1, firstName=$2, lastName=$3, accountName=$4, title=$5,
          reportsTo=$6, description=$7, contactOwner=$8, phone=$9, email=$10,
          mailingStreet=$11, postalCode=$12, mailingCity=$13,
          mailingCountry=$14, mailingState=$15
         WHERE id=$16
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
          id,
        ],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      await pool.query(`DELETE FROM contacts WHERE id = $1`, [id]);
      return res.status(204).end();
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
