import './Footer-style.css';

export default function Footer({languageapp,setLanguageapp}) {

  return (

      <div className="footer-color">
        <div className="container">
          <div className="row footer-line-2 footer-line-3">
            <div className="col-xs-12 col-sm-12 col-lg-12" align="center">
              {languageapp=="es" && (<>© <a href="#">CEPAL</a> - Naciones Unidas &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Términos y condiciones &nbsp;&nbsp;&nbsp; Contacto</>)}
              {languageapp=="en" && (<>© <a href="#">ECLAC</a> - United Nations &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Terms and conditions &nbsp;&nbsp;&nbsp; Contact</>)}

            </div>
          </div>
        </div>
      </div>

  );
}
