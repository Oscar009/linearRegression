import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const row = {
  display: "flex",
  flexDirection: "row",
};

function App() {
  const scores = [6, 5, 5, 5, 8, 9, 10, 5, 12, 6];
  const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
  const labels = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Mis datos",
          data: scores,
          //tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Mis datos (2)",
          //tension: 0.3,
          data: scores2,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
        },
      ],
      labels,
    };
  }, []);

  return (
    <div>
      <h1>Simple linear regresion</h1>
      <h2>By: Oscar Ortiz</h2>
      <hr></hr>
      <div style={row}>
        <h2>DataSet:</h2>
        <input type="text" />
        <button>Send</button>
      </div>
      <div>
        <h2>Output:</h2>
        <div style={{ width: "50%", height: "30%" }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default App;
