import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import Menu from './Menu';


const Body = ({ children }) => {
    const {currentUser} = useAuth()
  return (
    
    <>
    {currentUser ? ( 
        <>
            <Menu/>
            <Container className=" align-items-center justify-content-center">
            {children}
            </Container>
        </>
      ) : (<Navigate to="/" />)
    }
       
    </>
    
  );
};

export default Body;