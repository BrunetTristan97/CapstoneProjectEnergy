import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert  } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Body from './Body'





export default function MajProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updateEmail, updatePassworld} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    function handleSubmit(e){
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError(' le mot de passe ne correspond pas')
        }
        const promises = []
        setError('')
        setLoading(true)
        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef))
        }

        if (passwordRef.current.value){
            promises.push(updatePassworld(emailRef))
        }


        
        Promise.all(promises).then(() => {
            history('/')
        }).catch(()=>{
            setError('Erreur lors de la creation de compte')
            
        }).finally(()=>{
            setLoading(false)
        })

       
   }
   
  return (
    <Body>
      <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Mise a jour de votre profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailRef} type="email" required defaultValue={currentUser.email}/>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control ref={passwordRef} type="password" />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Confirmation du mot de passe </Form.Label>
                    <Form.Control ref={passwordConfirmRef} type="password" />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Mise à jour</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
            <Link to="/dashbord">Annuler</Link>
      </div>
    </Body>
  )
}
