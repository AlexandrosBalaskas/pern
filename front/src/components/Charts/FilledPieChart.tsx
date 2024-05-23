import React, { useEffect, useMemo } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Card, CardContent, CardHeader } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useCharts from "../../store/charts/useCodelist";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  chartContainer: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

export default function BasicPie({ chartId, className }: any) {
  const { t: translate } = useTranslation("codelist");
  const styles = useStyles();
  const { loadChart, items } = useCharts(chartId);
  useEffect(() => {
    loadChart();
  }, []);

  const data = useMemo(() => {
    return Object.keys(items || {}).map((key, index) => {
      return { id: index, value: items[key], label: translate(key) };
    });
  }, [translate, items]);
  return (
    <Card className={className}>
      <CardHeader title={translate(chartId)} />
      <CardContent>
        <PieChart
          className={styles.chartContainer}
          series={[
            {
              arcLabel: (item) => `${item.value}`,
              data,
              innerRadius: 19,
              outerRadius: 95,
              paddingAngle: 2,
              cornerRadius: 6,
              startAngle: -180,
              endAngle: 180,
              cx: 150,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
            },
          }}
          width={480}
          height={200}
        />
      </CardContent>
    </Card>
  );
}
