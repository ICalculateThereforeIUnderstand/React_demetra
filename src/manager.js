import React from 'react';
import './index.css';
import { Link } from "react-router-dom";
import { Navbar } from "./staticne.js";
import useFetch  from "./useFetch.js";
import { ADRESA, Kartica, Pagination } from "./dinamicke.js";
import { Kontekst } from "./index.js";

let broj = 0;

function Ucitavam() {

  const [vis1, setVis1] = React.useState(true);
  const [vis2, setVis2] = React.useState(true);
  const [vis3, setVis3] = React.useState(true);
  
  const r1 = React.useRef(null);
  const r2 = React.useRef(null);
  const r3 = React.useRef(null);

  const r4 = React.useRef(null);
  const r5 = React.useRef(null);
  const r6 = React.useRef(null);
  const r7 = React.useRef(null);
  const r8 = React.useRef(null);

  React.useEffect(()=>{
    //console.log("ucitavam element " + Math.random());
    let delay = 433;
    let period = 1300;
    let period1 = 1.3;
    r1.current.style.height = "0%";
    r1.current.style.transition = "height " + period1 + "s";
    r2.current.style.height = "0%";
    r2.current.style.transition =  "height " + period1 + "s";
    r3.current.style.height = "0%";
    r3.current.style.transition =  "height " + period1 + "s";

    setTimeout(()=>{
      r1.current.style.height = "90%";
      setVis1(true);
    }, 10);
    
    setTimeout(()=>{
      r2.current.style.height = "90%";
      setVis2(true);
    }, 10+delay);

    setTimeout(()=>{
      r3.current.style.height = "90%";
      setVis3(true);
    }, 10+2*delay);

    r4.current = setInterval(()=>{
      setVis1((prevVis)=>{
        if (prevVis) {
          r1.current.style.height = "0%";
          return false;
        } else {
          r1.current.style.height = "90%";
          return true;
        }
      })
    }, period);

    r7.current = setTimeout(()=>{
      
      r5.current = setInterval(()=>{
        //console.log("tiktak " + Math.random());
        setVis2((prevVis)=>{
          if (prevVis) {
            r2.current.style.height = "0%";
            return false;
          } else {
            r2.current.style.height = "90%";
            return true;
          }
        })
      }, period);

    }, delay);

    r8.current = setTimeout(()=>{

      r6.current = setInterval(()=>{
        setVis3((prevVis)=>{
          if (prevVis) {
            r3.current.style.height = "0%";
            return false;
          } else {
            r3.current.style.height = "90%";
            return true;
          }
        })
      }, period);

    }, 2*delay);

    return ()=>{
      clearInterval(r4.current);
      clearInterval(r5.current);
      clearInterval(r6.current);
      clearTimeout(r7.current);
      clearTimeout(r8.current);
    }
  }, []);

  return (
    <div className="ucitavam-cont">
      <div className="ucitavam">
        <div ref={r1} className="ucitavam-stupac"></div>
        <div ref={r2} className="ucitavam-stupac"></div>
        <div ref={r3} className="ucitavam-stupac"></div>
      </div>
    </div>
  )
}

function Flash({id=null, setFlashPoruke=()=>{return true}, poruka="nesto", tip="danger ili success"}) {
    const [tip1, setTip1] = React.useState("danger");
    const [poruka1, setPoruka1] = React.useState("-");

    const r = React.useRef();
    const r1 = React.useRef();

    React.useEffect(()=>{
      return ()=>{clearTimeout(r1.current)};
    }, []);

    React.useEffect(()=>{
      //clearTimeout(r1.current);
      if (tip === "success") {
        setTip1("success");
        setPoruka1(poruka);
      } else if (tip === "danger") {
        setTip1("danger");
        setPoruka1(poruka);
      } else {
        setTip1("danger");
        setPoruka1("ERROR in code! Krivi tip.");
      }

      //r.current.style.display = "flex";
      //r1.current = setTimeout(()=>{r.current.style.display = "none"}, 3000);

      setTimeout(()=>{
        setFlashPoruke((prev)=>{return prev.filter((el)=>{if (el.id === id) return false; return true;})})
      }, 3000);

    }, [tip, poruka]);

    function klik() {
        r.current.style.display = "none";
        clearTimeout(r1.current);
    }

    return (
      <div ref={r} className={"alert alert-"+tip1}>
        <p>{poruka1}</p>
        <div className="alert-close" onClick={klik}>
            <div className="alert-close-el1">
                <div className="alert-close-el2"></div>
                <div className="alert-close-el3"></div>
            </div>
        </div>
      </div>
    )
}

export function Manager2() {
    const [skladiste, setSkladiste] = React.useState("-");
    const [adresa, setAdresa] = React.useState("-");
    const [skladista, setSkladista] = React.useState([]);
    const [adrese, setAdrese] = React.useState([]);
    const [dodajSkladiste, setDodajSkladiste] = React.useState("");
    const [dodajAdresu, setDodajAdresu] = React.useState("");
    const [flashPoruke, setFlashPoruke] = React.useState([]);

    const [br, setBr] = React.useState(0);
    const [type, setType] = React.useState("RETURN_SKLADISTA");
    const [payload, setPayload] = React.useState({});
    const [loading, error, value] = useFetch(ADRESA + '/api/manager2', 
    {
      method: 'POST',
      body: JSON.stringify({
        "tip": type,  //RETURN_SKLADISTA, RETURN_ADRESE
        "payload": payload
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }, [br]);

    React.useEffect(()=>{
      //console.log("loading status: " + loading);
    }, [loading]);

    React.useEffect(()=>{
      if (value !== null && value !== undefined) {
        if (type === "RETURN_SKLADISTA") {
          setSkladista(value.value);
        } else if (type === "RETURN_ADRESE") {
          setAdrese(value.value);
        } else if (type === "ADD_SKLADISTE") {
          if (value.error) {
            //setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime(), poruka:value.errorCode, tip:"danger"}); return [...prev];});
            postaviFlashPoruku(value.errorCode, "danger");
          } else {
            //setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime(), poruka:"Unos novog skladista je uspjesan", tip:"success"}); return [...prev];});
            postaviFlashPoruku("Unos novog skladista je uspjesan", "success");
            setDodajSkladiste("");
            setSkladista(value.value);
            setSkladiste("-");
          }
        } else if (type === "REMOVE_SKLADISTE") {
          if (value.error) {
            postaviFlashPoruku(value.errorCode, "danger");
          } else {
            postaviFlashPoruku("Zadano skladiste je obrisano.", "success");
            setSkladista(value.value);
            setSkladiste("-");
          }
        } else if (type === "ADD_ADRESU") {
          if (value.error) {
            postaviFlashPoruku(value.errorCode, "danger");
          } else {
            postaviFlashPoruku("Adresa je uspijesno nadodana u odabrano skladiste.", "success");
            setAdrese(value.value);
            setAdresa(dodajAdresu);
            setDodajAdresu("");
          }
        } else if (type === "REMOVE_ADRESU") {
          if (value.error) {
            postaviFlashPoruku(value.errorCode, "danger");
          } else {
            postaviFlashPoruku("Adresa je uspijesno obrisana.", "success");
            setAdrese(value.value);
            setAdresa("-");
          }
        }
        console.log("Postavio sam " + value.value + " / " + value.error + " / " + value.errorCode);
      }
    }, [value]);

    function postaviFlashPoruku(poruka, tip="danger") {
      setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime(), poruka:poruka, tip:tip}); return [...prev];});
    }

    let datum = new Date();

    React.useEffect(()=>{
      if (false) {
      setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime(), poruka:"ovo je prva poruka " + (broj++), tip:"success"}); return [...prev];});
      setTimeout(()=>{setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime(), poruka:"ovo je druga poruka " + (broj++), tip:"danger"}); return [...prev];});}, 500);
      setTimeout(()=>{setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime(), poruka:"ovo je treca poruka " + (broj++), tip:"success"}); return [...prev];});}, 1000);
      setTimeout(()=>{setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime(), poruka:"ovo je cetvrta poruka " + (broj++), tip:"danger"}); return [...prev];});}, 1500);
      console.log(datum.getTime());
      }
    }, []);

    React.useEffect(()=>{
      console.log("Upravo smo promjenili polje poruka " + Math.random());
    }, [flashPoruke])

    React.useEffect(()=>{
      console.log("novi unos je " + skladiste + " / " + adresa);
    }, [skladiste, adresa]);
    React.useEffect(()=>{
        //console.log("novi unos1 je " + dodajSkladiste + " / " + dodajAdresu);
      }, [dodajSkladiste, dodajAdresu]);

    function change(e, fun) {
        //console.log("Mjenjas " + e.target.value);
        fun(e.target.value);
        //console.log(Math.random());
    }

    function selectKlik() {
      setType("RETURN_ADRESE");
      setPayload({"skladiste": skladiste});
      setBr((prev)=>{return prev+1});
    }

    function add1Klik() { // dodavanje skladista
      if (dodajSkladiste.trim().length === 0) {
        //setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime(), poruka:"Ne mozete dodati prazno skladiste", tip:"danger"}); return [...prev];});
        postaviFlashPoruku("Ne mozete dodati prazno skladiste", "danger");
      } else {
        setType("ADD_SKLADISTE");
        setPayload({"novoSkladiste": dodajSkladiste});
        setBr((prev)=>{return prev+1});
      }
    }

    function add2Klik() {
      if (skladiste === "-") {
        postaviFlashPoruku("Niste odabrali skladiste", "danger");
      } else if (dodajAdresu.trim().length === 0) {
        postaviFlashPoruku("Ne mozete dodati praznu adresu", "danger");
      } else {
        setType("ADD_ADRESU");
        setPayload({"skladiste": skladiste, "novaAdresa": dodajAdresu});
        setBr((prev)=>{return prev+1});
      }
    }

    function erase1Klik() {
      if (skladiste === "-") {
        postaviFlashPoruku("Niste odabrali skladiste", "danger");
      } else {
        setType("REMOVE_SKLADISTE");
        setPayload({"obrisiSkladiste": skladiste});
        setBr((prev)=>{return prev+1});
      }
      //console.log("odabrano skladiste je " + skladiste);
    }

    function erase2Klik() {
      if (adresa === "-" || adresa === "") {
        if (skladiste === "-") {
          postaviFlashPoruku("Prvo odaberite skladiste, pa potom adresu", "danger");
        } else {
          postaviFlashPoruku("Niste odabrali adresu", "danger");
        }
      } else {
        setType("REMOVE_ADRESU");
        setPayload({"obrisiAdresu": adresa, "skladiste": skladiste});
        setBr((prev)=>{return prev+1});
      }
    }

    return (
      <>
        <Navbar br={3}/>
        {loading ? <Ucitavam/> : null}
        <main id="manager2-main">
          <div id="manager1-flash-cont">
            {flashPoruke.map((el)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka}/>})}
          </div>
          <div id="manager2-polje1">
            <div className="manager2-polje1-polovica1">
              <form onSubmit={(e)=>{e.preventDefault()}} id="manager2-forma1" acceptCharset="UTF-8">
                <select value={skladiste} onChange={(e)=>{change(e,setSkladiste)}} className="manager2-forma1-el1" name="skladiste" size="5">
                  <option value="-">bez odabira</option>
                  {skladista.map((el)=>{return <option key={el} value={el}>{el}</option>})}
                </select>
              </form>
              <div className="manager2-polje1-div1">
                <div onClick={selectKlik} id="manager2-gumb1" className="manager2-gumb"><p>Select</p></div>
                <div onClick={erase1Klik} id="manager2-gumb2" className="manager2-gumb"><p>Erase</p></div>
              </div>
            </div>
            <div className="manager2-polje1-polovica2">
              <form onSubmit={(e)=>{e.preventDefault()}} id="manager2-forma2" acceptCharset="UTF-8"> 
                <label><div className="">Dodaj skladiste: <input onChange={(e)=>{change(e,setDodajSkladiste)}} type="text" name="novo_skladiste" value={dodajSkladiste} placeholder="upisi novo skladiste"/></div></label>
              </form> 
              <div onClick={add1Klik} id="manager2-gumb3" className="manager2-gumb"><p>Add</p></div>   
            </div>
          </div>

          <div id="manager2-polje2">
            <div className="manager2-polje1-polovica1">
              <form onSubmit={(e)=>{e.preventDefault()}} id="manager2-forma3" acceptCharset="UTF-8">
                <select value={adresa} onChange={(e)=>{change(e,setAdresa)}} className="manager2-forma1-el1" name="adresa" size="5">
                  <option value="-">bez odabira</option>
                  {adrese.map((el,index)=>{return <option key={el+index.toString()} value={el}>{el}</option>})}
                </select>
              </form>
              <div className="manager2-polje1-div1">
                <div onClick={erase2Klik} id="manager2-gumb5" className="manager2-gumb"><p>Erase</p></div>
              </div>
            </div>
            <div className="manager2-polje1-polovica2">
              <form onSubmit={(e)=>{e.preventDefault()}} id="manager2-forma4" acceptCharset="UTF-8"> 
                <label><div className="">Dodaj adresu: <input onChange={(e)=>{change(e,setDodajAdresu)}} type="text" name="nova_adresa" value={dodajAdresu} placeholder="upisi novu adresu"/></div></label>
              </form> 
              <div onClick={add2Klik} id="manager2-gumb6" className="manager2-gumb"><p>Add</p></div>   
            </div>
          </div>
        </main>
      </>
    )
}

export function Manager1({loading, error, value}) {
  const [flashPoruke, setFlashPoruke] = React.useState([]);
  const [skladista, setSkladista] = React.useState([]);
  const [adrese, setAdrese] = React.useState([]);
  const [skladiste, setSkladiste] = React.useState("-");
  const [adresa, setAdresa] = React.useState("-");
  const [vri1, setVri1] = React.useState([]);
  const [stranica, setStranica] = React.useState(1);
  const [brojKnjiga, setBrojKnjiga] = React.useState(0);

  const [a, b, c, d, vri, setVri] = React.useContext(Kontekst);

  const velStranice = 20;

  React.useEffect(()=>{
  
    console.log(Math.random());
    console.log("Loading je " + loading);
    console.log("Error je " + error);
    if (value !== undefined) {
      //console.log("Value je " + value[0].naslov);
      setVri(value);
      setBrojKnjiga(value.length);
    }

  }, [loading, error, value]);

  React.useEffect(()=>{
    if (vri !== undefined) {
      console.log("Duljina je " + vri.length);
      console.log(vri);
      setVri1(vri);
      //setBrojKnjiga(vri1.length);
    } else {
      setVri1([]);
      //setBrojKnjiga(0);
    }
  }, [vri]);

  React.useEffect(()=>{
    setBrojKnjiga(vri1.length);
  }, [vri1]);

  function uvjet(index, stranica) {
    if (index >= (stranica-1)*velStranice && index < stranica*velStranice) return true;
    return false;
  }

  function submitaj() {

  }

  return (
    <>
      <Navbar br={2}/>
      <main id="manager1-main">
        <div id="manager1-flash-cont">
          {flashPoruke.map((el)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka}/>})}
        </div>
        <div id="knjige-polje1">
          <div className="knjige-div4">
            <div id="bibID-4" className="knjige-button knjige-neaktivan">Filosofska biblioteka</div>
            <div id="bibID-5" className="knjige-button knjige-neaktivan">Faustovska biblioteka</div>
            <div id="bibID-6" className="knjige-button knjige-neaktivan">Filološka biblioteka</div>
            <div id="bibID-7" className="knjige-button knjige-neaktivan">Sybyllinska biblioteka</div>
            <div id="bibID-8" className="knjige-button knjige-neaktivan">Posebna izdanja</div>
            <div id="bibID-0" className="knjige-button knjige-neaktivan">Sve biblioteke</div>
          </div>
          <form onSubmit={(e)=>{e.preventDefault()}} id="knjige-forma" acceptCharset="UTF-8">
            <div className="knjige-div3">
              <div className="knjige-div1"><label htmlFor="idd">ID:</label></div>
              <input className="knjige-div2" type="text" id="idd" name="idd"/>
            </div>  
            <div className="knjige-div3">
              <div className="knjige-div1"><label htmlFor="autor">Author:</label></div>
              <input className="knjige-div2" type="text" id="autor" name="autor"/>
            </div>
            <div className="knjige-div3">
              <div className="knjige-div1"><label htmlFor="naslov">Title:</label></div>
              <input className="knjige-div2" type="text" id="naslov" name="naslov"/>
            </div>
            <div className="knjige-div3">
              <div className="knjige-div1"><label htmlFor="godina">Year:</label></div>
              <input className="knjige-div2" step="1" min="1990" max="2030" type="number" id="godina" name="godina"/>
            </div>
            <div className="knjige-div3">
              <div className="knjige-div1"><label htmlFor="isbn">ISBN:</label></div>
              <input className="knjige-div2" type="text" id="isbn" name="isbn"/>
            </div>
            <div id="knjige-div5">
              <div id="knjige-div6">
                <select value={skladiste} id="manager1-selekt" className="manager2-forma1-el1" name="skladiste" size="6">
                  <option value="-">bez odabira</option>
                  {skladista.map((el)=>{return <option key={el} value={el}>{el}</option>})}
                </select>
              </div>
              <div id="knjige-div7">
                <select value={adresa} className="manager2-forma1-el1" name="adresa" size="6">
                  <option value="-">sve adrese</option>
                  {adrese.map((el,index)=>{return <option key={el+index.toString()} value={el}>{el}</option>})}
                </select>
              </div>
            </div>
            <div className="knjige-div3 knjige-centriraj">
              <div id="knjige-gumb" className="knjige-centriraj">Search</div>
              <div id="knjige-gumb1">New book</div>
            </div>
          </form>  
        </div>
        <div id="knjige-polje2">
          {!loading && error === undefined && vri !== undefined ? 
            vri1.filter((e,i)=>{return uvjet(i,stranica)}).map((el)=>{return <Kartica key={el.id} id={el.id} naslov={el.naslov} 
                            cijena={el.cijena} slika={el.slika} autori={el.autori} klikFun={submitaj} />})
            
            : null}
        </div>
        <div id="knjige-polje3">
          <Pagination stranica={1} setStranica={setStranica} brojStranica={Math.floor((brojKnjiga-0.1)/velStranice+1)}/>
        </div>
      </main>
    </>
  )
}

export function Pokus() {
  const [opcija, setOpcija] = React.useState({"method": 'GET', 'body': JSON.stringify({}), headers: {'Content-type': 'application/json; charset=UTF-8'}});
  const [br, setBr] = React.useState(0);
  const [type, setType] = React.useState("tip requesta");
  const [payload, setPayload] = React.useState({});
  const [loading, error, value] = useFetch(ADRESA + '/api/pokus', 
  {
    method: 'POST',
    body: JSON.stringify({
      "tip": type,
      //"payload": null
      "payload": payload
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }, [br]);

  /*React.useEffect(()=>{
    console.log(ADRESA + '/api/pokus?' + (new URLSearchParams({"action":"i am genious."})));
  }, []);*/

  React.useEffect(()=>{
    console.log(value);
    console.log("error je " + error);
    console.log(Math.random());
  }, [value, error]);

  React.useEffect(()=>{
    document.addEventListener("keydown", pritisakGumba);

    function pritisakGumba(ev) {
      ev.preventDefault();
      if (ev.code === "KeyW") {
        console.log("Sirina ekrana je " + document.querySelector("html").clientWidth + "px");
      } else if (ev.code === "KeyS") {
        setBr((prev)=>{return prev+1});
        setType("RETURN_SKLADISTA");
        console.log("Ucitaj " + Math.random());
      } else if (ev.code === "KeyD") {
        setBr((prev)=>{return prev+1});
        setType("RETURN_ADRESE");
        setPayload({"skladiste":"Zeleni trg 28"});
      } else if (ev.code === "KeyF") {
        setBr((prev)=>{return prev+1});
        setType("RETURN_ADRESE");
        setPayload({"skladiste":"Zeleni trg 80"});
      }

    }
  }, []);

  return (
    <>
    {!loading && error === undefined ?
      <p>pokus...</p> :
      <p>ucitavamo...</p>
    }
    </>
  )
}


