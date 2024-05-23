import React from "react";
import HorizontalBarChart from "./Charts/HorizontalBarChart";
import FilledPieChart from "./Charts/FilledPieChart";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  initialContainer: {
    display: "flex",
    flexDirection: "row",
  },
  filledLeadsContainer: {
    width: "50%",
    marginLeft: "25px",
    marginTop: "25px",
    marginBottom: "25px",
  },
  horizontalProductsContainer: {
    width: "50%",
    margin: "25px",
  },
  horizontalOportunitiesContainer: {
    width: "50%",
    marginLeft: "25px",
    marginTop: "0px",
    marginRight: "0px",
  },
  filledCasesContainer: {
    width: "50%",
    marginLeft: "25px",
    marginRight: "25px",
  },
}));

const Initial = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.initialContainer}>
        <FilledPieChart
          className={styles.filledLeadsContainer}
          chartId={"leadsByStatus"}
        />
        <HorizontalBarChart
          className={styles.horizontalProductsContainer}
          chartId={"productsByFamily"}
          title={"products"}
        />
      </div>
      <div className={styles.initialContainer}>
        <HorizontalBarChart
          className={styles.horizontalOportunitiesContainer}
          chartId={"oportunitiesByStage"}
          title={"oportunities"}
        />
        <FilledPieChart
          className={styles.filledCasesContainer}
          chartId={"casesByPriority"}
        />
      </div>
    </>
  );
};

export default Initial;
