import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return  useContext(AuthContext)
}

export  function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
      return auth.signOut()
    }

    function resetPassword(email){
      return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
      return currentUser.updateEmail(email)
    }

    function updatePassworld(password){
      return currentUser.updatePassword(password)
    }
    

    useEffect(()=>{
        const unsuscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsuscribe
    }, [])

    const appName = ["Prediction de l' etat de votre machine a laver","Prediction de l' état de votre Poele électrique","Prediction de l' état de votre Télévision"]

    const value = {
        currentUser,
        login,
        logout,
        signup,
        resetPassword,
        updateEmail,
        updatePassworld,
        appName

    }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
