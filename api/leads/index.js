const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // SINGLE
      if (id) {
        const result = await pool.query(`SELECT * FROM leads WHERE id = $1`, [
          id,
        ]);
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
        `SELECT * FROM leads ${where} ${order}
         LIMIT ${pageSize} OFFSET ($1 * ${pageSize})`,
        [current_page],
      );

      const count = await pool.query(`SELECT COUNT(*) FROM leads ${where}`);

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
        company,
        title,
        website,
        description,
        leadstatus,
        leadowner,
        phone,
        email,
        street,
        postalcode,
        city,
        country,
        state,
        employeesnumber,
        annualrevenue,
        leadsource,
        industry,
      } = req.body;

      const result = await pool.query(
        `INSERT INTO leads
         (salutation, firstName, lastName, company, title, website, description,
          leadStatus, leadOwner, phone, email, street, postalCode, city, country,
          state, employeesNumber, annualRevenue, leadSource, industry)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
         RETURNING *`,
        [
          salutation,
          firstname,
          lastname,
          company,
          title,
          website,
          description,
          leadstatus,
          leadowner,
          phone,
          email,
          street,
          postalcode,
          city,
          country,
          state,
          employeesnumber,
          annualrevenue,
          leadsource,
          industry,
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
        company,
        title,
        website,
        description,
        leadstatus,
        leadowner,
        phone,
        email,
        street,
        postalcode,
        city,
        country,
        state,
        employeesnumber,
        annualrevenue,
        leadsource,
        industry,
      } = req.body;

      const result = await pool.query(
        `UPDATE leads SET
          salutation=$1, firstName=$2, lastName=$3, company=$4, title=$5,
          website=$6, description=$7, leadStatus=$8, leadOwner=$9,
          phone=$10, email=$11, street=$12, postalCode=$13, city=$14,
          country=$15, state=$16, employeesNumber=$17, annualRevenue=$18,
          leadSource=$19, industry=$20
         WHERE id=$21
         RETURNING *`,
        [
          salutation,
          firstname,
          lastname,
          company,
          title,
          website,
          description,
          leadstatus,
          leadowner,
          phone,
          email,
          street,
          postalcode,
          city,
          country,
          state,
          employeesnumber,
          annualrevenue,
          leadsource,
          industry,
          id,
        ],
      );

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Missing id" });

      await pool.query(`DELETE FROM leads WHERE id = $1`, [id]);
      return res.status(204).end();
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
