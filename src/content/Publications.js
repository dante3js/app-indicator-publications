import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import loadingspinner from './img/loading.gif';
import icon_external_link from './img/icon_external_link.png';

export default function Publications({indicatorId,setIndicatorId,languageapp,setLanguageapp}) {

  const [lists, setLists] = useState([]);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState('default.jpg');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchDataPublications(indicatorId);
  }, [indicatorId,languageapp]);

  function fetchDataPublications(x) {
    setLists([]);
    fetch(`https://api-cepalstat.cepal.org/cepalstat/api/v1/indicator/${x}/publications?lang=${languageapp}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setLists(data.body.publications);
    });
  }


  const toggle = () => setModal(!modal);

  const muestra = (x,y,z) => {
    setModal(!modal);
    setImage(x);
    setTitle(y);
    setDescription(z);
  }


  return (
    <>
      <div className="row align_row">
        <div className="col-md-12">
          <div className="row">
          {lists.length==0 && (<div><img src={loadingspinner} /> Cargando desde Api...</div>)}
          {lists.length==0 && (<div><img src={loadingspinner} /> Cargando desde Api...</div>)}
          {lists.map(({title,date,thumbnail,url,description}) => {
            return (
                <div key={title} className="publications_box col-md-4 shadow-sm ">
                  <div className="publications_photo"><img src={thumbnail} className="publications_thumb" width="100px" /> </div>
                  <div className="publications_title">{title}</div>
                  <div className="publications_date">{date} </div>
                  <div><Button color="primary" className="btn-sm" onClick={()=>muestra(thumbnail,title,description)}>{languageapp=="es" && ("Más Información")}{languageapp=="en" && ("More Information")}</Button>  <a href={url} className="btn btn-sm btn-primary" target="_blank"> {languageapp=="es" && ("Ver")} {languageapp=="en" && ("View")} <img className="align_btn" src={icon_external_link} /></a></div>
                </div>
            )
          })}
          </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{title} </ModalHeader>
        <ModalBody>
          <img src ={image} width='400px' />
          <p>{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            {languageapp=="es" && ("Cerrar")}{languageapp=="en" && ("Close")}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
