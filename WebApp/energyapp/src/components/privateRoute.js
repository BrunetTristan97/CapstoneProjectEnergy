import React from 'react'
import { useAuth } from '../context/AuthContext'

import { Route , useNavigate } from "react-router-dom";

export default function PrivateRoute({component: Component, ...rest}) {
  
    const {currentUser} = useAuth()
    const history = useNavigate()
    
    return (
    <Route
        {...rest}
        render = {props => {
            return currentUser ? <Component {...props} /> : history("/login")
        }}

        
>
    </Route>
  )
}
