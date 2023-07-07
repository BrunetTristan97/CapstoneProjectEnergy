import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert  } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import ConnectionBody from './ConnectionBody'





export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError(' le mot de passe ne correspond pas')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value )
            history('/MachineALaver');
        
        } catch (error) {
            setError('Erreur lors de la creation de compte')
            setLoading(false)
        }
    }
   
  return (
    <ConnectionBody>
      <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Enregistrez vous</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailRef} type="email" required/>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control ref={passwordRef} type="password" required/>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Confirmation du mot de passe </Form.Label>
                    <Form.Control ref={passwordConfirmRef} type="password" required/>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
            Avez-vous deja un compte ace EcoEnergy ?<Link to="/">Connectez vous</Link>
      </div>
    </ConnectionBody>
  )
}
