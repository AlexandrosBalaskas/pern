import React, { useEffect, useMemo } from "react";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardHeader } from "@mui/material";
import useCharts from "../../store/charts/useCodelist";
import { useTranslation } from "react-i18next";

export default function TickPlacementBars({ chartId, className, title }: any) {
  const { t: translate } = useTranslation("codelist");
  const { loadChart, items } = useCharts(chartId);
  useEffect(() => {
    loadChart();
  }, []);

  const chartSetting: any = useMemo(() => {
    return {
      yAxis: [
        {
          label: "rainfall (mm)",
        },
      ],
      series: [{ data: Object.values(items || {}), label: translate(title) }],
      height: 250,
      sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
          transform: "translateX(-10px)",
        },
      },
    };
  }, [translate, items, title]);

  const data = useMemo(() => {
    return Object.keys(items || {}).map((key, index) => {
      return { value: items[key], label: translate(key) };
    });
  }, [translate, items]);
  console.log(data);

  return (
    <Card className={className}>
      <CardHeader title={translate(chartId)} />
      <CardContent>
        <BarChart
          dataset={data}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "label",
              tickPlacement: "middle",
              tickLabelPlacement: "middle",
            },
          ]}
          {...chartSetting}
        />
      </CardContent>
    </Card>
  );
}
