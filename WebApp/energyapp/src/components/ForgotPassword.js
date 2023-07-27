import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert  } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, } from 'react-router-dom'
import ConnectionBody from './ConnectionBody'

export default function ForgotPassword() {

    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value )
            setMessage('Verifiez vos emails')
        
        } catch (error) {
            setError('Erreur de reinitialisation du MDP')
            setLoading(false)
        }
    }
   
  return (
    <ConnectionBody>
     <Card className="shadow">
        <Card.Body>
            <h2 className="text-center mb-4">Reinitialiser votre mot de passe</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailRef} type="email" required/>
                </Form.Group>
               
                <Button disabled={loading} className="w-100 mt-4" type="submit">Reinitialiser mot de passe</Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to="/">connectez vous ?</Link>
            </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
            Voulez vous creer un compte ? <Link to="/signup">Enregistrez vous</Link>
      </div>
   </ConnectionBody>
  )
}
