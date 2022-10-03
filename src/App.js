import './App.css';
import Publications from "./content/Publications";
import ThematicTree from "./content/ThematicTree";
import Header from "./header/Header";
import Footer from "./footer/Footer";

import React, { useState } from 'react';

function App() {

  const [indicatorId, setIndicatorId] = useState(4183);
  const [languageapp, setLanguageapp] = useState("es");

  return (
    <div className="App">
      <Header indicatorId={indicatorId} setIndicatorId={setIndicatorId} languageapp={languageapp} setLanguageapp={setLanguageapp}></Header>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ThematicTree indicatorId={indicatorId} setIndicatorId={setIndicatorId} languageapp={languageapp} setLanguageapp={setLanguageapp} ></ThematicTree>
          </div>
          <div className="col-md-9">
            <Publications show="gallery" indicatorId={indicatorId} setIndicatorId={setIndicatorId} languageapp={languageapp} setLanguageapp={setLanguageapp} ></Publications>
          </div>
        </div>
      </div>
      <Footer languageapp={languageapp} setLanguageapp={setLanguageapp}></Footer>
    </div>
  );
}

export default App;
