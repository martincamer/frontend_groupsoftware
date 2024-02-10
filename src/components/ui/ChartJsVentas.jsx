import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartJsVentas = ({ ventasPorMes }) => {
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
            label: "Ventas por Mes",
            data: ventasPorMes.map((mesVentas) => mesVentas.totalVentas),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Perfiles Vendidos por Mes",
            data: ventasPorMes.map((mesVentas) => mesVentas.perfilesVendidos),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "KG Vendidos por Mes",
            data: ventasPorMes.map((mesVentas) => mesVentas.kgVendidos),
            backgroundColor: "rgba(255, 205, 86, 0.2)",
            borderColor: "rgba(255, 205, 86, 1)",
            borderWidth: 1,
          },
          // Agrega más datasets según sea necesario
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
    <div className="w-[1220px] mx-auto">
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default ChartJsVentas;
