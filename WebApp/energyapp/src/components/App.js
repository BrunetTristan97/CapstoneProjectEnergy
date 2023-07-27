import React from "react";
import Signup from "./signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import MajProfile from "./MajProfile";
import Appareils from "./CorpPrediction/Appareils";
import Dashbord from "./CorpPrediction/Dashbord";
import backgroundImage from "../img/cool-background.png";

function App() {

  

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`, // Utiliser l'image dans le style
      backgroundSize: 'cover', // Ajuster la taille de l'image à la div
      backgroundRepeat: 'no-repeat', // Empêcher la répétition de l'image
      minHeight: '100vh', // Ajuster la hauteur de la div pour s'adapter au contenu
    }}>

        <Container >
          <Router>
            <AuthProvider>
                <Routes>
                  <Route exact path="/" element={ <Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  <Route path="/Appareils/:id" element={<Appareils />} />
                  <Route path="/Dashboard" element={<Dashbord />} />
                  <Route path="/majProfile" element={<MajProfile />} />
                  
                
                </Routes>
            </AuthProvider>
          </Router>
      </Container>
    </div>
    
    
  )
}

export default App;
