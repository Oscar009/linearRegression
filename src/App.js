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
import { useMemo, useState } from "react";

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
  const [dataSet, setDataSet] = useState(
    "{23,651},{26,762},{30,856},{34,1063},{43,1190},{48, 1298},{52, 1421},{57,1440},{58,1518}"
  );

  const [endogena, setEndogena] = useState([]);
  const [results, setResults] = useState([]);
  const [labels, setLabels] = useState([]);

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

  const data = useMemo(() => {
    return {
      datasets: [
        {
          label: "points",
          data: endogena,
          tension: 0.3,
          pointRadius: 4,
          backgroundColor: "blue",
        },
        {
          label: "y hat",
          tension: 0.3,
          data: results,
          borderColor: "red",
          backgroundColor: "red",
          pointRadius: 4,
        },
      ],
      labels,
    };
  }, [labels, endogena, results]);

  const calculate = () => {
    let myData = dataSet.replace(/\s+/g, "");
    let aux = "";
    let myLabels = [];
    let myEndogena = [];
    let flag = true;
    for (let i = 0; i < myData.length; i++) {
      if (myData.charAt(i) === "{") {
        aux = "";
      } else if (myData.charAt(i) === "}") {
        myEndogena.push(parseInt(aux));
        aux = "";
      } else if (myData.charAt(i) === ",") {
        if (flag) {
          myLabels.push(parseInt(aux));
          aux = "";
          flag = false;
        } else {
          flag = true;
        }
      } else {
        aux += myData.charAt(i);
      }
    }
    setLabels(myLabels);
    setEndogena(myEndogena);
    console.log(labels);
    console.log(endogena);
  };

  const handleUpdate = (e) => {
    const { value } = e.target;
    setDataSet(value);
  };

  return (
    <div>
      <h1>Simple linear regresion</h1>
      <h2>By: Oscar Ortiz</h2>
      <hr></hr>
      <div style={row}>
        <h2>DataSet:</h2>
        <input
          style={{ width: "50%" }}
          onChange={handleUpdate}
          type="text"
          name="dataSet"
          value={dataSet}
        />
        <button onClick={calculate}>Send</button>
      </div>
      {dataSet}
      <div>
        <h2>Output:</h2>
        <div style={{ width: "60%", height: "50%" }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
export default App;
