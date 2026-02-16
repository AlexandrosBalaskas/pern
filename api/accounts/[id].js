const pool = require("../../server/db");

module.exports = async (req, res) => {
  await new Promise((r) => setTimeout(r, 500));
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const result = await pool.query(`SELECT * FROM accounts WHERE id=$1`, [
        id,
      ]);
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "PUT") {
    const body = req.body;
    try {
      const result = await pool.query(
        `UPDATE accounts SET
          accountName=$1, website=$2, type=$3, description=$4, parentAccount=$5, accountOwner=$6, phone=$7,
          billingStreet=$8, billingPostalCode=$9, billingCity=$10, billingCountry=$11, billingState=$12,
          shippingStreet=$13, shippingPostalCode=$14, shippingCity=$15, shippingCountry=$16, shippingState=$17
         WHERE id=$18 RETURNING *`,
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
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  if (req.method === "DELETE") {
    try {
      await pool.query(`DELETE FROM accounts WHERE id=$1`, [id]);
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).end();
    }
  }

  res.status(405).end();
};
