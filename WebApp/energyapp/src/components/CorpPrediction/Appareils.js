import React from 'react'
import VisuelPrediction from '../VisuelPrediction'
import Body from '../Body'
import { useParams } from 'react-router'
import { useAuth } from '../../context/AuthContext'

export default function Appareils() {

  const {id} = useParams()
  const {appName} = useAuth()
  
  return (
    <Body>
      <div className='mt-5'>
        <VisuelPrediction textToDisplay= {appName[id]}/>
      </div>
    </Body>
  )
}
