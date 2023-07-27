import React from 'react';
const ConnectionBody = ({ children }) => {
  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Centrera le contenu verticalement sur toute la hauteur de la fenêtre
      }}
  >
    <div className="w-100 mt-5" style={{maxWidth: "400px"}}>
      {children}
    </div>

  </div>
    
  );
};

export default ConnectionBody;