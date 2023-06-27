import React from "react";
import Signup from "./signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { Loading } from "./Loading";

function App() {
  return (
    
           <Container className="d-flex align-items-center justify-content-center"
            style={{minHeight: "100vh"}}>
              <div className="w-100" style={{maxWidth: "400px"}}>
                <Router>
                  <AuthProvider>
                      <Routes>
                        <Route exact path="/" element={<Loading component={Login} textToDisplay="Connectez vous" />} />
                        <Route path="/signup" element={<Loading component={Signup} textToDisplay="Enregistrez vous" />} />
                        <Route path="/dashbord" element={<Loading component={Dashboard} textToDisplay="Bienvenue chez EcoEnergy" />} />
                      </Routes>
                  </AuthProvider>
                </Router>
              </div>
            </Container>
    
  )
}

export default App;
