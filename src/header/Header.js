import React, { useState, useEffect } from 'react';
import './estilo.css';
import eclacLogo from './eclac_logo_en.png';
import eclacLogo2 from './eclac_logo_es.png';
import HeaderLangItem from './headerLangItem';
import {database} from './database';

export default function Header(props) {

  let indicatorId = props.indicatorId;
  let setIndicatorId = props.setIndicatorId;
  let languageapp = props.languageapp;
  let setLanguageapp = props.setLanguageapp;



  const [indtitle, setIndtitle] = useState("");
  const [indtheme, setIndtheme] = useState("");
  const [indarea, setIndarea] = useState("");
  const [label1, setLabel1] = useState("");
  const [label2, setLabel2] = useState("");
  const [label3, setLabel3] = useState("");


  useEffect(() => {
    dataIndicator(indicatorId,languageapp);
    cargaTitulos(languageapp);
  }, [indicatorId,languageapp]);


  function cargaTitulos(lang) {
    if(lang=="en") {
      setLabel1(database.english.title);
      setLabel2(database.english.subtitle);
      setLabel3(database.english.subtitle2);
    } else {
      setLabel1(database.spanish.title);
      setLabel2(database.spanish.subtitle);
      setLabel3(database.spanish.subtitle2);
    }
  }

  function dataIndicator(x,y) {
    fetch("https://api-cepalstat.cepal.org/cepalstat/api/v1/indicator/"+x+"/metadata?lang="+y+"&format=json")
    .then(response => {
      return response.json()
    })
    .then(data => {
      const data1 = data.body.metadata.indicator_name;
      const data2 = data.body.metadata.theme;
      const data3 = data.body.metadata.area;
      setIndtitle(data1);
      setIndtheme(data2);
      setIndarea(data3);
    });
  }

  function cambiaIdioma(x){
    setLanguageapp(x);
  }


  return (
    <>
      <div className="main_header">
        <div className="container ">
          <div className="row">
            <div className="col-md-2 margin_logo">
              {languageapp=="en" && (<img src={eclacLogo} width="90px" />)}
              {languageapp=="es" && (<img src={eclacLogo2} width="90px" />)}
            </div>
            <div className="col-md-8">
              <div className="header_title">{label1}  <h2>{indtitle}</h2></div>
              <div className="header_subtitle">{label2} {indtheme}, {label3} {indarea}   </div>
            </div>
            <div className="col-md-2">
              <HeaderLangItem check={languageapp=="en" && (true)} lang="en" language="English" languageapp={languageapp} setLanguageapp={setLanguageapp} ></HeaderLangItem>
              <HeaderLangItem check={languageapp=="es" && (true)} lang="es" language="Español" languageapp={languageapp} setLanguageapp={setLanguageapp}></HeaderLangItem>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
