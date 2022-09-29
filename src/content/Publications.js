import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import loadingspinner from './img/loading.gif';
import icon_external_link from './img/icon_external_link.png';

export default function Publications({indicatorId, setIndicatorId}) {

  const [lists, setLists] = useState("");
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState('default.jpg');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchDataPublications(indicatorId);
  }, [indicatorId]);

  function fetchDataPublications(x) {

    let loadinginfo = () =>  (<div><img src={loadingspinner} /> Cargando desde Api...</div>);

    setLists(loadinginfo);
    fetch("https://api-cepalstat.cepal.org/cepalstat/api/v1/indicator/"+x+"/publications?lang=es")
    .then(response => {
      return response.json()
    })
    .then(data => {
      const data1 = data.body.publications;
      let listado = data1.map(({title,date,thumbnail,url,description}) => {
        return (
          <>
            <div className="publications_box col-md-4 shadow-sm ">
              <div className="publications_photo"><img src={thumbnail} className="publications_thumb" width="100px" /> </div>
              <div className="publications_title">{title}</div>
              <div className="publications_date">{date} </div>
              <div><Button color="primary" className="btn-sm" onClick={()=>muestra(thumbnail,title,description)}>Más Información</Button>  <a href={url} className="btn btn-sm btn-primary" target="_blank"> Ver <img className="align_btn" src={icon_external_link} /></a></div>
            </div>
          </>
        )
      })
      setLists(listado);
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
            {lists}
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
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
