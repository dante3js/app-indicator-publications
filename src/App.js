import './App.css';
import Publications from "./content/Publications";
import ThematicTree from "./content/ThematicTree";

import React, { useState } from 'react';

function App() {

  const [indicatorId, setIndicatorId] = useState(4183)

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ThematicTree indicatorId={indicatorId} setIndicatorId={setIndicatorId} ></ThematicTree>
          </div>
          <div className="col-md-9">
            <Publications show="gallery" indicatorId={indicatorId} setIndicatorId={setIndicatorId} ></Publications>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
