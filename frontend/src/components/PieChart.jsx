import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Language", "Speakers (in millions)"],
  ["Entrada", 5.85],
  ["Saida", 1.66],
];

export const options = {
  legend: "none",
  pieSliceText: "label",
  title: "Entradas e saidas de mercadorias",
  pieStartAngle: 100,
};

export default function PieChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"500px"}
    />
  );
}
