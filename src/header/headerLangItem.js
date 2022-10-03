
export default function HeaderLangItem({check,language,lang,languageapp,setLanguageapp}) {

  function cambiaIdioma(lang,check_name) {

    let tttt = document.getElementById(check_name).checked;
    if(tttt==true) {
      //alert(tttt+"cambia");
      setLanguageapp(lang);

      if(lang=="en") {
        document.getElementById("check_es").checked = false;
      }

      if(lang=="es") {
        document.getElementById("check_en").checked = false;
      }


    } else {
      //alert(tttt+"falsecambia");
    }


  }

  let check_name = `check_${lang}`;

  return (
    <>
    <div className="form-check form-switch">
      <input
        id={check_name}
        className="form-check-input"
        type="checkbox"

        defaultChecked={check}
        onClick={()=>cambiaIdioma(lang,check_name)}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {language}
      </label>
    </div>
    </>
  );
}
