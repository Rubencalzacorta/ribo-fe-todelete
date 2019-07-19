import React from 'react';

function AccDetailHolder(props) {
  const { title, amount} = props;

  return (
    <div className="AccDetailSquare">
      <div className="DetailSquareText">
      <h6>{title}</h6>
      <h2>{amount.toLocaleString('de-DE')}</h2>
      </div>
    </div>
  );
}



export default AccDetailHolder;