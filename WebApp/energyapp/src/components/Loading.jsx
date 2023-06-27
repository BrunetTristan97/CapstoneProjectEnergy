import React, { useState, useEffect }  from "react";
import ReactLoading from "react-loading";
 

export const Loading = ({ component: Component, textToDisplay }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [showAnotherComponent, setShowAnotherComponent] = useState(false);

  useEffect(() => {
    // Simulation d'un délai de 3 secondes avant d'afficher un autre composant
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowAnotherComponent(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

    return (
        <div>
             {isLoading ? (
                <>
                    <h2>{textToDisplay}</h2>
                    <ReactLoading type="cylon" color="#18d411" height={100} width={100} />
                </>
            ) : showAnotherComponent ? (
                    <Component />
            ) : null} 
        </div>
    );
}