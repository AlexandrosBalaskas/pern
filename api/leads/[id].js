const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const result = await pool.query(`SELECT * FROM leads WHERE id = $1`, [
        id,
      ]);
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "PUT") {
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

    try {
      const result = await pool.query(
        `UPDATE leads SET
          salutation=$1, firstName=$2, lastName=$3, company=$4, title=$5, website=$6, description=$7,
          leadStatus=$8, leadOwner=$9, phone=$10, email=$11, street=$12, postalCode=$13, city=$14,
          country=$15, state=$16, employeesNumber=$17, annualRevenue=$18, leadSource=$19, industry=$20
         WHERE id=$21 RETURNING *`,
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
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "DELETE") {
    try {
      await pool.query(`DELETE FROM leads WHERE id=$1`, [id]);
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  res.status(405).end();
};
