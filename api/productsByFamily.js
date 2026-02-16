const pool = require("..server/db");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const result = await pool.query(`
      SELECT productFamily, COUNT(*) AS count
      FROM products
      WHERE productFamily IN ('1', '2', '3', '4', '5')
      GROUP BY productFamily
    `);

    const counts = {
      Electronics: 0,
      Apparel: 0,
      Automobiles: 0,
      Furniture: 0,
      "Home Appliances": 0,
    };

    result.rows.forEach((row) => {
      if (row.productfamily == "1") counts.Electronics = row.count;
      if (row.productfamily == "2") counts.Apparel = row.count;
      if (row.productfamily == "3") counts.Automobiles = row.count;
      if (row.productfamily == "4") counts.Furniture = row.count;
      if (row.productfamily == "5") counts["Home Appliances"] = row.count;
    });

    res.status(200).json(counts);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
