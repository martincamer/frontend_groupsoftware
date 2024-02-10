import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartPerfilesVendidosPorMes = ({ ventasPorMes }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Obtén el contexto del gráfico
    const ctx = chartRef.current.getContext("2d");

    // Configuración del gráfico
    const config = {
      type: "bar",
      data: {
        labels: ventasPorMes.map((mesVentas) => mesVentas.mes),
        datasets: [
          {
            label: "Perfiles Vendidos por Mes",
            data: ventasPorMes.map((mesVentas) => mesVentas.perfilesVendidos),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Crea el gráfico
    const myChart = new Chart(ctx, config);

    // Limpia el gráfico al desmontar el componente
    return () => {
      myChart.destroy();
    };
  }, [ventasPorMes]);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default ChartPerfilesVendidosPorMes;
