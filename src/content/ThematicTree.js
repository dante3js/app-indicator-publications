import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import './css/estilo_arbol.css';

export default function ThematicTree({indicatorId,setIndicatorId,languageapp,setLanguageapp}) {
const [data1, setData1] = useState([]);
const [area_id, setArea_id] = useState("");
const [nombre_area, setNombre_area] = useState("");

function verPubicacionesRelacionadas(x) {
  setIndicatorId(x);
}

useEffect(() => {
  setData1([]);
  fetch(`https://api-cepalstat.cepal.org/cepalstat/api/v1/thematic-tree/?area_id=729&lang=${languageapp}&format=json`)
  .then(response => {
    return response.json()
  })
  .then(data => {
    //datos del area
    const x1 = data.body.children[0].name;
    const x2 = data.body.children[0].area_id;

    setNombre_area(x1);
    setArea_id(x2);

    setData1(data.body.children[0].children);
  });


}, [languageapp]);


return (
  <>
    <div className="dashboard_list">
      <div className="titulo_area_nombre">{languageapp=="es" && ("Indicadores del área:")}{languageapp=="en" && ("Area Indicators:")} {nombre_area}</div>
      <div className="titulo_area_id">{languageapp=="es" && ("Área ID:")}{languageapp=="en" && ("ID Area:")} {area_id}</div>
      <div className="titulo_area_indicadores">{languageapp=="es" && ("Indicadores:")}{languageapp=="en" && ("Indicators:")}</div>
      {data1.length === 0 && (<div><Spinner type="border" color="success" /></div>)}
      {data1.map(({name,order,indicator_id}) => {
        return (
          <div key={indicator_id}>

            {indicator_id==indicatorId && (
              <div className="row-dash-indicator-link-2 row-dash-indicator-selected" onClick={()=>verPubicacionesRelacionadas(indicator_id)}> {name} <br/><small>ID: {indicator_id}</small></div>
            )}

            {indicator_id!=indicatorId && (
              <div className="row-dash-indicator-link-2" onClick={()=>verPubicacionesRelacionadas(indicator_id)}> {name} <br/><small>ID: {indicator_id}</small></div>
            )}

          </div>
        )

    })}
    </div>
  </>

);

}
