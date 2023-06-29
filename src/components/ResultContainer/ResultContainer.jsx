import React from 'react';

//import styles
import './Result.css';

const Result = ({cardName, cardValue}) => {
    return(
         <div className="details-card-container">
             <div className="card-name">
                 {cardName}
             </div>
             <div className="card-value">
                 {cardValue}
             </div>
         </div>
    );
};

export default Result;