import React from "react";
import Signup from "./signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";


function App() {
  return (
    
           <Container className="d-flex align-items-center justify-content-center"
            style={{minHeight: "100vh"}}>
              <div className="w-100" style={{maxWidth: "400px"}}>
                <Router>
                  <AuthProvider>
                      <Routes>
                          <Route path="/signup" component={Signup}/>
                      </Routes>
                  </AuthProvider>
                </Router>
                <Signup/>
              </div>
            </Container>
    
  )
}

export default App;
