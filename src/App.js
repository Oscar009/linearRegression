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
import axios from "axios";

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
  const [b0, setB0] = useState(0);
  const [b1, setB1] = useState(0);
  const [point, setPoint] = useState(0);
  const [x, setX] = useState(0);

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
    //x*y coleccion
    let xpory = [];
    //x^2 calecci??n
    let xcuadrada = [];
    //sumatoria de y
    let sumy = 0;
    //sumatoria de x
    let sumx = 0;
    for (let i = 0; i < endogena.length; i++) {
      xpory.push(endogena[i] * labels[i]);
      xcuadrada.push(labels[i] * labels[i]);
      sumy += endogena[i];
      sumx += labels[i];
    }
    //sumatoria de x*y
    let sumxpory = 0;
    //sumatoria de x^2
    let sumxcuadrada = 0;
    for (let i = 0; i < xpory.length; i++) {
      sumxpory += xpory[i];
      sumxcuadrada += xcuadrada[i];
    }
    //calcular b1
    let b1 =
      (endogena.length * sumxpory - sumx * sumy) /
      (endogena.length * sumxcuadrada - sumx * sumx);
    setB1(b1);
    //calcular b0
    let b0 = (sumy - b1 * sumx) / endogena.length;
    setB0(b0);
    //calcular puntos de y hat
    let myResults = [];
    for (let i = 0; i < labels.length; i++) {
      myResults.push(b0 + b1 * labels[i]);
    }

    setResults(myResults);
    setEndogena(myEndogena);
    setLabels(myLabels);
  };

  const prediction = () => {
    setPoint(b0 + b1 * x);
  };

  const handleUpdatex = (e) => {
    const { value } = e.target;
    setX(value);
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
        <h2>
          y = {b0} + {b1} * x
        </h2>
        <br></br>
        Prediction:
        <input onChange={handleUpdatex} type="number" name="x" value={x} />
        <button onClick={prediction}>Calculate</button>
        <br></br>
        Result: {point}
      </div>
    </div>
  );
}
export default App;
