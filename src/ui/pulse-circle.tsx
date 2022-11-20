import React from 'react';

export const PulseCircle = ({ color }: { color: 'green' | 'red' }): JSX.Element => {
  return (
    <div
      className={ `${color}-pulse` }
      style={ { marginLeft: 16 } }
    >
      <p></p>
    </div>
  );
};
