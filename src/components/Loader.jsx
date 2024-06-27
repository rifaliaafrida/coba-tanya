import React from 'react';
import { LineWave } from 'react-loader-spinner';

function Loader() {
  return (
    <div>
      <LineWave
        height={80}
        width="100%"
        color="blue"
      />
    </div>
  );
}

export default Loader;
