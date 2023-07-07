import React from 'react';
const ConnectionBody = ({ children }) => {
  return (
    <div className="w-100 mt-5" style={{maxWidth: "400px"}}>
      {children}
    </div>
  );
};

export default ConnectionBody;