import React, { useEffect, useState } from 'react'
import VisuelPrediction from '../VisuelPrediction'
import Body from '../Body'
import { useParams } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios';

export default function Appareils() {

  const {id} = useParams()
  const {appName} = useAuth()
  const [excelData, setExcelData] = useState([]);
  
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        debugger;
          const response = await axios.get(`http://127.0.0.1:5000/run-script?id=${id}`); // Envoyer la requête GET à l'API
          const excelData = response.data.data; // Récupérer les données de la réponse
          setExcelData(excelData);
      } catch (error) {
          console.error('Erreur lors de la récupération des données depuis l\'API :', error);
      }
  };

  fetchData();
}, [id]);



  
  return (
    <Body>
      <div className='mt-5'>
        <VisuelPrediction textToDisplay= {appName[id]} data= {excelData}/>
      </div>
    </Body>
  )
}
