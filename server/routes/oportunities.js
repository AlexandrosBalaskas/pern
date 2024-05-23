const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/stageCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM stage`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.stage_id, label: acc.stage_type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/forecast_categoryCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM forecast_category`);
    const result = (data.rows || []).map((acc) => {
      return {
        code: acc.forecast_category_id,
        label: acc.forecast_category_type,
      };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/oportunitiesByStage", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
      stage, 
         COUNT(*) as count 
       FROM oportunities 
       WHERE stage IN ('1', '2', '3', '4', '5', '6') 
       GROUP BY stage`
    );
    const counts = {
      Qualify: 0,
      "Meet & Present": 0,
      Propose: 0,
      Negotiate: 0,
      "Closed Won": 0,
      "Closed Lost": 0,
    };

    result.rows.forEach((row) => {
      if (row.stage === "1") {
        counts.Qualify = row.count;
      } else if (row.stage === "2") {
        counts["Meet & Present"] = row.count;
      } else if (row.stage === "3") {
        counts.Propose = row.count;
      } else if (row.stage === "4") {
        counts.Negotiate = row.count;
      } else if (row.stage === "5") {
        counts["Closed Won"] = row.count;
      } else if (row.stage === "6") {
        counts["Closed Lost"] = row.count;
      }
    });
    res.status(200).send(counts);
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/oportunities", async (req, res) => {
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
      `SELECT * FROM oportunities ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(
      `SELECT COUNT(*) FROM oportunities ${filters} `
    );
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/oportunities/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(
      `SELECT * FROM oportunities WHERE id = ${id}`
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/oportunities/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  const {
    oportunityname,
    accountname,
    closedate,
    amount,
    description,
    oportunityowner,
    stage,
    probability,
    forecastcategory,
    nextstep,
  } = req.body;
  try {
    const results = await pool.query(
      `UPDATE oportunities SET oportunityName = $1 , accountName = $2, closeDate = $3, amount = $4, description = $5, oportunityOwner = $6, stage = $7, probability = $8, forecastCategory = $9, nextStep = $10 WHERE id = ${id} returning *`,
      [
        oportunityname,
        accountname,
        closedate,
        amount,
        description,
        oportunityowner,
        stage,
        probability,
        forecastcategory,
        nextstep,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/oportunities/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(
      `DELETE FROM oportunities WHERE id = ${id}`
    );
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/oportunities", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const {
    oportunityname,
    accountname,
    closedate,
    amount,
    description,
    oportunityowner,
    stage,
    probability,
    forecastcategory,
    nextstep,
  } = req.body;
  console.log(req.body, "boy");
  try {
    const results = await pool.query(
      "INSERT INTO oportunities (oportunityName,accountName,closeDate,amount,description,oportunityOwner,stage,probability,forecastCategory,nextStep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *",
      [
        oportunityname,
        accountname,
        closedate,
        amount,
        description,
        oportunityowner,
        stage,
        probability,
        forecastcategory,
        nextstep,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
