import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert  } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value )
            history('/dashbord')
        
        } catch (error) {
            setError('Erreur lors de la connection')
            setLoading(false)
        }
    }
   
  return (
    <>
      <Card>
        <Card.Body>
            <h2 className="text-center mb-4">connectez-vous</h2>
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
                <Button disabled={loading} className="w-100 mt-4" type="submit">Log In</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
            Voulez vous creer un compte ? <Link to="/signup">Enregistrez vous</Link>
      </div>
    </>
  )
}
