import React, { useRef }from "react";
import { Chart } from "react-google-charts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "@mui/material/Button";


export default function ChartBar(data, nome) {
    const chartRef = useRef(null);
    const options = {
      chart: {
        title: `Visao geral ${nome}`,
        subtitle: "Relatorio de operacoes de entrada e saida de mercadorias.",
      },
    };

    const handleExportPDF = async () => {
    const chartElement = chartRef.current;

    if (chartElement) {
      // Captura o gráfico como imagem
      const canvas = await html2canvas(chartElement);
      const imgData = canvas.toDataURL("image/png");

      // Cria um PDF com o jsPDF
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 100); // Ajuste as dimensões conforme necessário
      pdf.save("grafico.pdf");
    }
  };
{/*  */}
  return (
    <>
    <div ref={chartRef}>
      <Chart
        chartType="Bar"
        width="100%"
        height="600px"
        data={data.data}
        options={options}
      />
      </div>
      <Button variant="contained" onClick={handleExportPDF}>Exportar como PDF</Button>
      {/* <button ></button> */}
    </>
  );
}
