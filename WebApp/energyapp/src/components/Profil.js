import React from 'react'
import {  Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'


export default function Profil() {

  const {currentUser, logout} = useAuth()
  const history = useNavigate()
  return (
    <>
      <Card>
      <Card.Body>
        <h2 className='text-center mb-4'>Profile</h2>
        <strong>Emaill : </strong> {currentUser.email}
        <Link to="/majProfile" className='btn btn-primary w-100 mt-3'>Mettre a jour </Link>
      </Card.Body>
    </Card>
    </>
            
  )
}
