import React from "react";
import { Chart as ChartJS, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import Body from "../Body";
import {  Card } from 'react-bootstrap'

ChartJS.register(CategoryScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Visualisation des predictions",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Temps (T)",
      },
    },
    y: {
      title: {
        display: true,
        text: "Prédiction (t)",
      },
      ticks: {
        maxTicksLimit: 5,
      },
      type: "category",
      labels: ["Consommation à l’extérieur", "Consommation excessive", "Turn off", "Turn on","normal" ],
    },
  },
};


function createNumberArray(n) {
  const numbers = [];
  for (let i = 0; i < n; i++) {
    numbers.push(i);
  }
  return numbers;
}

const data_test1 = [1,4,4,4,4,3,0,3,0,4,4,0,0,4,0,4,4,0,0,3,4,3,0,0,3,4,0,3,4,4,3,0,0,3,3,0,4,4,4,3,4,0,4,0,3,4,3,4,4,]
const data_test2 = [4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 3, 3, 3, 4, 4, 0, 4, 4, 2, 0, 1, 0, 4, 3, 4, 0, 0, 3, 3, 3, 0, 0, 3, 4, 4, 3, 3, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0];


function createRandomValueList(data) {
  const values = [];
  const possibleValues = ["normal", "Turn on", "Turn off", "Consommation excessive", "Consommation à l’extérieur"];
  for (let i = 0; i < data.length; i++) {
    const randomValue = possibleValues[data[i]];
    values.push(randomValue);
  }
  return values;
}
const labels = createNumberArray(data_test1.length >data_test2.length? data_test1.length : data_test2.length );
export const data = {
  labels,
  datasets: [

    {
      label: "ML",
      data: createRandomValueList(data_test1),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    
    {
      label: "DML",
      data: createRandomValueList(data_test2),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Dashbord() {
  
  return (
    <Body>
      <Card className="mt-5">
        <Card.Body>
          <Line options={options} data={data} />
        </Card.Body>
      </Card>
    </Body>
  );
}
