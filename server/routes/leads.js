const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/lead_statusCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM lead_status`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.status_id, label: acc.status_type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/lead_sourceCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM lead_source`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.source_id, label: acc.source_type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/industryCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM industry`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.industry_id, label: acc.industry_type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/leadsByStatus", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
      leadStatus, 
         COUNT(*) as count 
       FROM leads 
       WHERE leadStatus IN ('1', '2', '3', '4', '5') 
       GROUP BY leadStatus`
    );
    const counts = {
      Unqualified: 0,
      Qualified: 0,
      Nurturing: 0,
      Contracted: 0,
      New: 0,
    };

    result.rows.forEach((row) => {
      if (row.leadstatus === "5") {
        counts.Unqualified = row.count;
      } else if (row.leadstatus === "4") {
        counts.Qualified = row.count;
      } else if (row.leadstatus === "3") {
        counts.Nurturing = row.count;
      } else if (row.leadstatus === "2") {
        counts.Contracted = row.count;
      } else if (row.leadstatus === "1") {
        counts.New = row.count;
      }
    });
    res.status(200).send(counts);
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/leads", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const { current_page, pageSize } = req.query;
  const filters = (Object.keys(JSON.parse(req.query?.filters)) || [])
    .map((key, index) => {
      let par = index === 0 ? "WHERE" : "AND";
      return `${par} ${key} = '${JSON.parse(req.query.filters)[key]}'`;
    })
    .join(" ");
  const order = req.query?.sort
    ? `ORDER BY ${req.query?.sort?.split(":")?.join(" ")}`
    : "";
  try {
    const data = await pool.query(
      `SELECT * FROM leads ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(`SELECT COUNT(*) FROM leads ${filters} `);
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/leads/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM leads WHERE id = ${id}`);
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/leads/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
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
    const results = await pool.query(
      `UPDATE leads SET salutation = $1 , firstName = $2, lastName = $3, company = $4, title = $5, website = $6, description = $7, leadStatus = $8, leadOwner = $9, phone = $10, email = $11, street = $12, postalCode = $13, city = $14, country = $15, state = $16, employeesNumber = $17, annualRevenue = $18, leadSource = $19, industry = $20 WHERE id = ${id} returning *`,
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
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/leads/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM leads WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/leads", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
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
  console.log(req.body, "boy");
  try {
    const results = await pool.query(
      "INSERT INTO leads (salutation,firstName,lastName,company,title,website,description,leadStatus,leadOwner,phone,email,street,postalCode,city,country,state,employeesNumber,annualRevenue,leadSource,industry) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) returning *",
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
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
