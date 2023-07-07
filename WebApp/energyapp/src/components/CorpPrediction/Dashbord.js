import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import Body from '../Body';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: "Historique score d'evolution  Des entrainements",
    },
  },
};

function generateRandomDateList(count) {
    const dateList = [];
    for (let i = 0; i < count; i++) {
      const day = faker.random.number({ min: 1, max: 28 });
      const hour = faker.random.number({ min: 0, max: 23 });
      const minute = faker.random.number({ min: 0, max: 59 });
      const dateString = `${day}/${hour}/${minute}`;
      dateList.push(dateString);
    }
    return dateList;
  }




const labels = generateRandomDateList(100);

export const data = {
  labels,
  datasets: [
    {
      label: "ML ",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'DML',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

 export default function Dashboard() {
  return( 
    <Body>
      <div className='mt-5'>
      <Line options={options} data={data} />
      </div>
    </Body>
  
  
  );
}
