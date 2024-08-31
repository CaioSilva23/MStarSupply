import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "Visao geral",
    subtitle: "Relatorio de operacoes de entrada e saida de mercadorias.",
  },
};

export default function ChartBar(data) {
  
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="600px"
      data={data.data}
      options={options}
    />
  );
}
