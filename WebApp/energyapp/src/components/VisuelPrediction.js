import React, { useState, useEffect} from 'react'
import {  Card } from 'react-bootstrap'


export default function VisuelPrediction({ textToDisplay, data }) {

  
  const [showTable, setShowTable] = useState(false);
  const [inputValue, setInputValue] = useState(10);
  const [lastData, setLastData] = useState([]);

  useEffect(() => {
    const lastElements = data.slice(-inputValue); // Obtenez les derniers éléments en fonction de inputValue
    debugger
    setLastData(lastElements);
  }, [inputValue, data]);

  const handleClick = () => {
    setShowTable(!showTable);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Mettre à jour la valeur de l'input
  };

   
  return (
    <>
      <Card>
      <Card.Body>
        <h2 className='text-center mb-4'>{textToDisplay}</h2>
        <div>
        <div class="input-group">
          <input type="number" class="form-control" placeholder="10" value={inputValue} onChange={handleInputChange} style={{width: '50%'}}/>
          <span class="input-group-text">Entre le nombre de ranger</span>
        </div>
        <div class="row">
          <div className="col-md-12 d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ width: '50%' }}
              onClick={handleClick}
            >
              Faire une prédiction
            </button>
          </div>
        </div>
        < div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Occupation</th>
                  <th scope="col">consomation a l'instant (t)</th>
                </tr>
              </thead>
              <tbody>
                    {lastData.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                      </tr>
                    ))}
                  </tbody>
            </table>
        </div>
          
        </div>
      </Card.Body>
    </Card>
    </>
            
  )
}
