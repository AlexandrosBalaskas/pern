const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 300));
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const result = await pool.query(`SELECT * FROM contacts WHERE id=$1`, [
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
        `UPDATE contacts SET
          salutation=$1, firstName=$2, lastName=$3, accountName=$4, title=$5, reportsTo=$6, description=$7,
          contactOwner=$8, phone=$9, email=$10, mailingStreet=$11, postalCode=$12, mailingCity=$13,
          mailingCountry=$14, mailingState=$15
         WHERE id=$16 RETURNING *`,
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
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "DELETE") {
    try {
      await pool.query(`DELETE FROM contacts WHERE id=$1`, [id]);
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  res.status(405).end();
};
