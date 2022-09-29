import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import './css/estilo_arbol.css';

export default function ThematicTree({indicatorId, setIndicatorId}) {

const [lists, setLists] = useState(false);
const [area_id, setArea_id] = useState("");
const [nombre_area, setNombre_area] = useState("");

function verPubicacionesRelacionadas(x) {
  setIndicatorId(x);
  let div = "div_"+x;
  destacaSeleccionada(div);
}

function destacaSeleccionada(x) {
  let elements = document.getElementsByClassName("row-dash-indicator-selected");
  for (var i = 0; i < elements.length; i++) {
     elements[i].classList.remove("row-dash-indicator-selected");
  }
  document.getElementById(x).classList.add("row-dash-indicator-selected");
  return false;
}


useEffect(() => {
  setLists(false);
  fetch("https://api-cepalstat.cepal.org/cepalstat/api/v1/thematic-tree/?area_id=729&lang=es&format=json")
  .then(response => {
    return response.json()
  })
  .then(data => {
    //datos del area
    const x1 = data.body.children[0].name;
    const x2 = data.body.children[0].area_id;

    setNombre_area(x1);
    setArea_id(x2);

    const data1 = data.body.children[0].children;

    let listado = data1.map(({name,order,indicator_id}) => {
      let name_div_indic = `div_${indicator_id}`;
      let default_id_indicador = `div_${indicatorId}`;

        return (
          <div key={indicator_id}>

            {name_div_indic==default_id_indicador && (
              <div className="row-dash-indicator-link-2 row-dash-indicator-selected" id={name_div_indic} onClick={()=>verPubicacionesRelacionadas(indicator_id)}> {name} <br/><small>ID: {indicator_id}</small></div>
            )}

            {name_div_indic!=default_id_indicador && (
              <div className="row-dash-indicator-link-2" id={name_div_indic} onClick={()=>verPubicacionesRelacionadas(indicator_id)}> {name} <br/><small>ID: {indicator_id}</small></div>
            )}

          </div>
        )

    });
    setLists(listado);
  });


}, []);


return (
  <>
    <div className="dashboard_list">
      <div className="titulo_area_nombre">Indicadores del Area: {nombre_area}</div>
      <div className="titulo_area_id">Area ID: {area_id}</div>
      <div className="titulo_area_indicadores">Indicadores:</div>
      {!lists && (<div><Spinner type="border" color="success" /></div>)}
      {lists}
    </div>
  </>

);

}
