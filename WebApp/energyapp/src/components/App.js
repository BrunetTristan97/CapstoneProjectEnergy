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

function App() {

  

  return (
    
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
    
  )
}

export default App;
