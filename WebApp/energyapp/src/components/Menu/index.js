import React, { useState} from 'react'
import { Navbar, Nav, NavDropdown, Row, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'

  

import { Alert } from 'react-bootstrap';


const Menu = () => {

  const [error, setError] = useState('')
  const {logout} = useAuth()
    const history = useNavigate()

  async function handleLogout() {
    setError('')
    try {
      await logout()
      history('/')
    } catch (error) {
      setError('erreur de deconnexion')
    }
  }


  return (
    <>
        <Navbar bg="dark" variant="dark" expand="lg" style={{ minHeight: '75px' }} className="w-100 h-100">
        <Row className="w-100">
        <div className="col-2 d-flex justify-content-end">
          <Navbar.Brand href="#" className="ml-5">IA-EcoEnergy</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
        </div>
        <div className="col-8 d-flex justify-content-center">
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="mr-auto">
            <NavDropdown title="Mes appareils" id="navbarDropdown">
                <NavDropdown.Item href="/Appareils/0">Machine à laver</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Appareils/1">Poele electrique</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Appareils/2">Télévision</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/Dashboard">Tableau de bord</Nav.Link>
              <Nav.Link href="/majProfile">Profil</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <Button variant="secondary" onClick={handleLogout}>Déconnexion</Button>
        </div>
      </Row>
          
          
        </Navbar>
        {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
};
  
export default Menu;