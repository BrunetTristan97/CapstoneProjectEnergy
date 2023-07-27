import React, { useState} from 'react'
import {  Card } from 'react-bootstrap'


export default function VisuelPrediction({ textToDisplay }) {

  
  const [showTable, setShowTable] = useState(false);

  const handleClick = () => {
    setShowTable(!showTable);
  };

   
  return (
    <>
      <Card>
      <Card.Body>
        <h2 className='text-center mb-4'>{textToDisplay}</h2>
        <div>
          <button type="button" class="btn btn-primary btn-lg btn-block" style={{width: '100%'}} onClick={handleClick}>
            Cliquez ici pour 
            {
              showTable ? ' effacer et faire une nouvelle prediction'  : ' faire une prediction sur les 10 dernieres valeur'
            }
            </button>
          {showTable && (
            
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
                <tr>
                  <th scope="row">1</th>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>0</td>
                  <td>60</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>1</td>
                  <td>60</td>
                </tr>
              </tbody>
            </table>
            <h2 className="text-center mt-4">Resultat ML</h2>
            <div className="bg-success p-3 mt-3 text-center">
              <p className="text-white h4">Fonctionement normal</p>
            </div>

            <h2 className="text-center mt-4">Resultat DML</h2>
            <div className="bg-danger p-3 mt-3 text-center">
              <p className="text-white h4">Surconsomation</p>
            </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
    </>
            
  )
}
