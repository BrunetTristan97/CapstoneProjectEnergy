import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert  } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'


export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Password do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value )
        
        } catch (error) {
            setError('Failed to create an account')
            setLoading(false)
        }
    }
   
  return (
    <>
      <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
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
            Avez-vous deja un compte ace EcoEnergy ? Log In
      </div>
    </>
  )
}
