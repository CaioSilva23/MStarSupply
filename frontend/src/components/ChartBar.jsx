import React, { useRef }from "react";
import { Chart } from "react-google-charts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "@mui/material/Button";


export default function ChartBar({data, mes, nome}) {
    const chartRef = useRef(null);

    const options = {
      chart: {
          title: mes ? `Visão por mês: ${nome}` : 'Visão geral de todas as mercadorias',
          subtitle: mes ? 'Relatório por mês de entrada e saída' : 'Relatório de operações de entrada e saída por mercadorias.',
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
      pdf.addImage(imgData, "PNG", 10, 10, 190, 100); //dimensões
      pdf.save("grafico.pdf");
    }
  };
  return (
    <>
    {data && data.length > 0 ? (
        <>
            <div ref={chartRef}>
                <Chart
                    chartType="Bar"
                    width="100%"
                    height="450px"
                    data={data}
                    options={options}
                />
            </div>
            <Button variant="contained" onClick={handleExportPDF}>Exportar como PDF</Button>
        </>
    ) : (
        <p>Nenhum dado disponível para mostrar</p>
    )}
</>
  );
}
