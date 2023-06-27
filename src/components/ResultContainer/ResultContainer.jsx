import React from 'react';

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