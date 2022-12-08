import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import useFetch from "./useFetch.js";

const ADRESA = "http://localhost:3000"

const root = ReactDOM.createRoot(document.querySelector('#cont'));

function dodajStilove(el, stilovi) {
  for (let key in stilovi) {
      el.style[key] = stilovi[key];
  }
}

const Kontekst = React.createContext();

function Navbar() {

  const [toggle, setToggle] = React.useState(false);

  const r1 = React.useRef();
  //const r2 = React.useRef();
  
  function klik() {
    if (toggle) {
      dodajStilove(r1.current, {height:"0px"});
      setToggle(false);
    } else {
      dodajStilove(r1.current, {height:"200px"});
      setToggle(true);
    }
  }
  
  return (
    <nav>
      <div id="header">
          <img src="slika_demetre8bit_mala1.png" id="el1-header" alt="slika Demetre"/>
          <img src="element2.png" id="el2-header" alt="logo"/>
          <img src="slika_demetre8bit_mala1.png" id="el3-header" alt="slika Demetre"/>
          <div id="izbornik-header">
            <Link to="/knjige" className="link-header">Knjige</Link>
            <Link to="/" className="link-header">Izdvajamo</Link>
            <Link to="/onama" className="link-header">O nama</Link>
            <Link to="/kontakt" className="link-header">Kontakt</Link>
          </div>
          <div id="gumb-header" onClick={klik}>
            <div className="gumb-el"></div>
            <div className="gumb-el"></div>
            <div className="gumb-el"></div>
          </div>
        </div>
        <div ref={r1} id="collapsing-menu-header">
          <Link to="/knjige" className="collapsing-link"><p>Knjige</p></Link>
          <Link to="/" className="collapsing-link"><p>Izdvajamo</p></Link>
          <Link to="/onama" className="collapsing-link"><p>O nama</p></Link>
          <Link to="/kontakt" className="collapsing-link"><p>Kontakt</p></Link>
        </div>
    </nav>

  )
}

function ONama() {
  return (
    <main id="onama-main">
      <p id="onama-el1">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.  Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
      <img src="cayton_sa_okvirom_prozirni.gif" id="onama-el2" alt="slika Caytona" />
      <Link to="/" id="onama-el3">Natrag na glavnu stranicu</Link>
    </main>
  )
}

function Kontakt() {
  return (
    <main id="kontakt-main">
      <p id="kontakt-naslov">Demetra</p>
      <table id="kontakt-tablica">
        <tr>
            <td className="kontakt-tablica-stupac1">e-mail:</td>
            <td className="kontakt-tablica-stupac2"><a href="mailto:savic.slobodan@mail.com">savic.slobodan@mail.com</a></td>
        </tr>
        <tr>
            <td className="kontakt-tablica-stupac1">mobitel:</td>
            <td className="kontakt-tablica-stupac2">099 654 3442</td>
        </tr>
        <tr className="">
            <td className="kontakt-tablica-stupac1">telefon:</td>
            <td className="kontakt-tablica-stupac2">6522 296</td>
        </tr>
        <tr>
            <td className="kontakt-tablica-stupac1">Adresa:</td>
            <td className="kontakt-tablica-stupac2"><a href="https://www.google.com/maps/place/Sortina+ul.+1B,+10000,+Zagreb/@45.7755872,15.9791067,17z/data=!3m1!4b1!4m5!3m4!1s0x4765d677dc061cad:0x316751d6e8c4914d!8m2!3d45.7756401!4d15.9791055" target="_blank">Sortina 1b</a></td>
        </tr>
      </table>
      <img src="slikamalak.jpg" id="kontakt-slika1" alt="slika knjizare" />
      <div id="kontakt-el">
        <Link to="/" id="kontakt-link" className="link-header">Natrag na glavnu stranicu</Link>
      </div>
      <img src="slika_demetre8bit_mala.png" id="kontakt-slika" alt="slika Demetre"/>
    </main>
  )
}

function Kartica({id="neki id", naslov="neki naslov", cijena="neka cijena", slika=null, autori=[]}) {
  const [aut, setAut] = React.useState("--");
  const [idk, setIdk] = React.useContext(Kontekst);

  React.useEffect(()=>{
    if (autori.length === 1) {
      setAut(autori[0]);
    } else if (autori.length > 1)  {
      let rez = "";
      for (let i = 0; i < autori.length-1; i++) {
        rez += autori[i] + "; ";
      }
      rez += autori[autori.length-1];
      setAut(rez);
    }
  }, [])

  function klik() {
    console.log("Upravo si kliknuo na " + id + " / " + Math.random());
    setIdk(id);
  }

  return (
    <Link to={"/detalji?id="+id} onClick={klik}>
      <div className="izdvajamo-element">
       <div className="element-el1">
          {slika === null ? <img src="nepoznata_knjiga.jpg" className="element-el1-img" alt="logo"/> 
                          : <img src={ADRESA+"/api/slika/"+id} className="element-el1-img" alt="logo" />
          }  
       </div>
       <div className="element-el2">
           <p className="element-el2-naslov">{naslov}</p>
           <p className="element-el2-autor">{aut}</p>
           <p className="element-el2-cijena">{cijena === null ? "?" : cijena} kn</p>
       </div>
      </div>
    </Link>
  )
}

function Izdvajamo({loading, error, value}) {
  //const {loading, error, value} = useFetch(ADRESA + '/api/izdvajamo', {}, []);

  //const {loading, error, value} = useFetch('http://localhost:3000/', {}, []);
  //const {loading, error, value} = useFetch('http://localhost:3000/api/izdvajamo', {}, []);

  const [id, setId, vri, setVri] = React.useContext(Kontekst);

  React.useEffect(()=>{
    console.log(Math.random());
    console.log("Loading je " + loading);
    console.log("Error je " + error);
    if (value !== undefined) {
      console.log("Value je " + value[0].naslov);
    }
    setVri(value);
    //setId(22);

  }, [loading, error, value])

  return (
    <main id="izdvajamo-main">
      <div id="izdvajamo-stupac1">
        <div id="izdvajamo-el4">
            <p>Možda će Vas zanimati:</p>
        </div>
        {!loading && error === undefined ?
          value.map((el)=>{return <Kartica key={el.id} id={el.id} naslov={el.naslov} 
                          cijena={el.cijena} slika={el.slika} autori={el.autori}/>})
          : null}
        
      </div>
      <div id="izdvajamo-stupac2">
        <p id="izdvajamo-el1">Filosofska biblioteka Dimitrija Savića</p>
        <p id="izdvajamo-el2">email: <a href="mailto:dimitrije.savic@zg.t-com.hr">dimitrije.savic@zg.t-com.hr</a></p>
        <img id="izdvajamo-el3" src="cayton_sa_okvirom_prozirni.gif" alt="Cayton"/>
      </div>
    </main>
  )
}

function Detalji() {
  
  const [params, setParams] = useSearchParams();
  const [a, aa, vri, setVri, vri1, setVri1] = React.useContext(Kontekst);
  
  const [naslov, setNaslov] = React.useState("-");
  const [autori, setAutori] = React.useState("-");
  const [cijena, setCijena] = React.useState("-");
  const [biblioteka, setBiblioteka] = React.useState("-");
  const [godina, setGodina] = React.useState("-");
  const [brojStranica, setBrojStranica] = React.useState("-");
  const [isbn, setIsbn] = React.useState("-");
  const [slika, setSlika] = React.useState(null);

  const [id, setId] = React.useState();

  React.useEffect(()=>{
    //console.log("ID je " + id);
    //console.log(vri);
    setId(parseInt(params.get("id")));


  }, []);

  React.useEffect(()=>{
    let e = undefined;
    //let id = parseInt(params.get("id"));
    console.log("id je " + id);

    if (vri !== undefined) {
      e = vri.find((el)=>{return el.id === id});
    }
    
    if (e === undefined && vri1 !== undefined) {
      e = vri1.find((el)=>{return el.id === id});
    }

    console.log("Odabrani element je " + e);

      e === undefined || !e.naslov ? setNaslov("-") : setNaslov(e.naslov);
      e === undefined || !e.cijena ? setCijena("-") : setCijena(e.cijena + "kn");
      e === undefined || !e.biblioteka ? setBiblioteka("-") : setBiblioteka(e.biblioteka);
      e === undefined || !e.godina ? setGodina("-") : setGodina(e.godina);
      e === undefined || !e.brojstranica ? setBrojStranica("-") : setBrojStranica(e.brojstranica);
      e === undefined || !e.isbn ? setIsbn("-") : setIsbn(e.isbn);
      e === undefined || e.slika === null ? setSlika(null) : setSlika(e.id);
      let brAutora = undefined;
      if (e === undefined) {
        brAutora = 0;
      } else {
        brAutora = e.autori.length;
      }
      console.log("broj autora je " + brAutora);
      if (brAutora === 0) {
        setAutori("-");
      } else if (brAutora === 1) {
        setAutori(e.autori[0]);
      } else {
        let rez = "";
        for (let i = 0; i < brAutora-1; i++) {
          rez += e.autori[i] + "; ";
        }
        rez += e.autori[brAutora-1];
        setAutori(rez);
      }
      console.log(e);
    
  }, [id,vri,vri1]);


  const navigate = useNavigate();

  function klik() {
    navigate(-1);
  }

  return (
    <main id="opisknjige-main">
      <div id="opisknjige-stupac1">
        {slika === null ? <img src="nepoznata_knjiga.jpg" id="opisknjige-img" alt="slika knjige"/> 
                          : <img src={ADRESA+"/api/slika/"+slika} id="opisknjige-img" alt="slika knjige"/>
        } 
      </div>
      <div id="opisknjige-stupac2">
        <table id="opisknjige-tablica"><tbody>
          <tr className="opisknjige-neparnired">
            <td className="opisknjige-elementi2">Naslov:</td>
            <td className="opisknjige-elementi1">{naslov}</td>
          </tr>
          <tr>
            <td className="opisknjige-elementi2">Autor:</td>
            <td className="opisknjige-elementi1">{autori}</td>
          </tr>
          <tr className="opisknjige-neparnired">
            <td className="opisknjige-elementi2">Cijena:</td>
            <td className="opisknjige-elementi1">{cijena}</td>
          </tr>
          <tr>
            <td className="opisknjige-elementi2">Biblioteka:</td>
            <td className="opisknjige-elementi1">{biblioteka}</td>
          </tr>
          <tr className="opisknjige-neparnired">
            <td className="opisknjige-elementi2">Godina izdanja:</td>
            <td className="opisknjige-elementi1">{godina}</td>
          </tr>
          <tr>
            <td className="opisknjige-elementi2">Broj stranica:</td>
            <td className="opisknjige-elementi1">{brojStranica}</td>
          </tr>
          <tr className="opisknjige-neparnired">
            <td className="opisknjige-elementi2">ISBN:</td>
            <td className="opisknjige-elementi1">{isbn}</td>
          </tr>
        </tbody></table>
        <img src="slika_demetre8bit_mala.png" id="opisknjige-img1" alt="slika Demetre"/>
        <div id="opisknjige-div-link">
          <p className="link-header" style={{cursor:"pointer"}} onClick={klik}>Natrag na glavnu stranicu</p>
        </div>
      </div>
    </main>
  )
}

function Knjige({loading, error, value}) {
  const [autor, setAutor] = React.useState("");
  const [naslov, setNaslov] = React.useState("");
  const [godina, setGodina] = React.useState("");
  const [brojKnjiga, setBrojKnjiga] = React.useState(0);
  const [biblioteka, setBiblioteka] = React.useState("0");
  const [stranica, setStranica] = React.useState(1);
  const [vri1, setVri1] = React.useState([]);

  const [a, b, c, d, vri, setVri] = React.useContext(Kontekst);

  //const {loading, error, value} = useFetch(ADRESA + '/api/sveknjige', {}, []);

  const velStranice = 20

  const r4 = React.useRef();
  const r5 = React.useRef();
  const r6 = React.useRef();
  const r7 = React.useRef();
  const r8 = React.useRef();
  const r0 = React.useRef();

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
    setBrojKnjiga(vri1.length);
  }, [vri1])

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

  function inputFun(e) {
    console.log("upravo si unio slovo " + Math.random());
    console.log(e.target.id);
    console.log(e.target.value);
    let idd = e.target.id;
    if (idd === "knjige-input1") {
      setAutor(e.target.value);
    } else if (idd === "knjige-input2") {
      setNaslov(e.target.value);
    } else {
      setGodina(e.target.value);
    }
  }

  function vratiRef(kod) {
    switch (kod) {
      case ("0"):
        return r0;
      case ("4"):
        return r4;
      case ("5"):
        return r5;
      case ("6"):
        return r6;
      case ("7"):
        return r7;
      case ("8"):
        return r8;
    }
  }

  function gumbKlik(e) {
    if (vri === undefined) return false;

    let kod = e.target.id.split("-")[1];
    console.log("kliknuo si na " + kod);

    //if (kod !== biblioteka) {
      setBiblioteka((prev)=>{
        let r = vratiRef(prev);
        r.current.classList.remove("knjige-aktivan");
        r.current.classList.add("knjige-neaktivan");

        r = vratiRef(kod);
        r.current.classList.remove("knjige-neaktivan");
        r.current.classList.add("knjige-aktivan");
        setBiblioteka(kod);

        // filtriramo zbog pritiska gumba
        setVri1(vri.filter((el,index)=>{
          let rez = true;
          let id1 = "";

          // prvi filter je po biblioteci
          if (el.biblioteka_id !== null) {
            id1 = el.biblioteka_id.toString();
            if (kod !== "0" && id1 !== kod) {
              console.log("element sa " + id1 + " ne prolazi " + kod);
              return false;
            } else {
              
            }
          } else {
            if (kod !== "0")  return false;
          }

          //drugi filter je po naslovu
          if (!el.naslov.toLowerCase().includes(naslov.toLowerCase())) return false;

          //treci filter je po godini
          if (godina !== "" && godina !== el.godina) {
            return false;
          }
        
          //cetvrti filter je po autoru
          if (autor.length !== 0) {
            let vel = el.autori.length;
            let rez1 = false;
            for (let i = 0; i < vel; i++) {
              if (el.autori[i].toLowerCase().includes(autor.toLowerCase())) {
                rez1 = true;
                break;
              }
            }
            if (!rez1) return false;
          }
  

          //console.log("element sa " + id1 + " prolazi " + kod);
          return rez;
        }));

        //setBrojKnjiga(vri1.length);
        return kod;
      });
    //}
  }

  React.useEffect(()=>{
    r0.current.classList.remove("knjige-neaktivan");
    r0.current.classList.add("knjige-aktivan");
  }, []);

  function uvjet(index, stranica) {
    if (index >= (stranica-1)*velStranice && index < stranica*velStranice) return true;
    return false;
  }

  function submitKlik(e) {
    e.preventDefault();

    // filtriramo zbog pritiska gumba
    setVri1(vri.filter((el,index)=>{
      let id1 = "";

      // prvi filter je po biblioteci
      if (el.biblioteka_id !== null) {
        id1 = el.biblioteka_id.toString();
        if (biblioteka !== "0" && id1 !== biblioteka) {
          console.log("element sa " + id1 + " ne prolazi " + biblioteka);
          return false;
        } else {
          
        }
      } else {
        if (biblioteka !== "0")  return false;
      }

      //drugi filter je po naslovu
      if (!el.naslov.toLowerCase().includes(naslov.toLowerCase())) return false;

      //treci filter je po godini
      if (godina !== "" && godina !== el.godina) {
        return false;
      }
    
      //cetvrti filter je po autoru
      if (autor.length !== 0) {
        let vel = el.autori.length;
        let rez1 = false;
        for (let i = 0; i < vel; i++) {
          if (el.autori[i].toLowerCase().includes(autor.toLowerCase())) {
            rez1 = true;
            break;
          }
        }
        if (!rez1) return false;
      }


      //console.log("element sa " + id1 + " prolazi " + kod);
      return true;
    }));
//}
  }



  return (
    <main id="knjige-main">
      <div id="knjige-polje1">
        <div className="knjige-div4">
        <div ref={r4} id="bibID-4" onClick={gumbKlik} className="knjige-button knjige-neaktivan">Filosofska biblioteka</div>
          <div ref={r5} id="bibID-5" onClick={gumbKlik} className="knjige-button knjige-neaktivan">Faustovska biblioteka</div>
          <div ref={r6} id="bibID-6" onClick={gumbKlik} className="knjige-button knjige-neaktivan">Filološka biblioteka</div>
          <div ref={r7} id="bibID-7" onClick={gumbKlik} className="knjige-button knjige-neaktivan">Sybyllinska biblioteka</div>
          <div ref={r8} id="bibID-8" onClick={gumbKlik} className="knjige-button knjige-neaktivan">Posebna izdanja</div>
          <div ref={r0} id="bibID-0" onClick={gumbKlik} className="knjige-button knjige-neaktivan">Sve biblioteke</div>
        </div>
        <form id="knjige-forma" onSubmit={submitKlik}>
          <div className="knjige-div3">
            <div className="knjige-div1">
              <label htmlFor="knjige-input1">Autor:</label>
            </div>
            <input id="knjige-input1" onChange={inputFun} type="text" value={autor} className="knjige-div2"/>
          </div>

          <div className="knjige-div3">
            <div className="knjige-div1">
              <label htmlFor="knjige-input2">Naslov:</label>
            </div>
            <input id="knjige-input2" onChange={inputFun} type="text" value={naslov} className="knjige-div2"/>
          </div>

          <div className="knjige-div3">
            <div className="knjige-div1">
              <label htmlFor="knjige-input3">Godina:</label>
            </div>
            <input id="knjige-input3" onChange={inputFun} type="text" value={godina} className="knjige-div2"/>
          </div>

          <div className="knjige-div5">
            <input id="knjige-gumb" value="Search" type="submit"/>
          </div>
        </form>

        <p>{brojKnjiga} knjiga</p>

      </div>

      <div id="knjige-polje2">
        {!loading && error === undefined && vri !== undefined ? 
          vri1.filter((e,i)=>{return uvjet(i,stranica)}).map((el)=>{return <Kartica key={el.id} id={el.id} naslov={el.naslov} 
                          cijena={el.cijena} slika={el.slika} autori={el.autori}/>})
          
          : null}
        
      </div>

      <div id="knjige-polje3">
        <Pagination stranica={stranica} setStranica={setStranica} brojStranica={Math.floor((brojKnjiga-0.1)/velStranice+1)}/>
      </div>

    </main>
  )
}

function Pagination({stranica=1,brojStranica=1, setStranica=(e)=>{return true;}}) {
  const [brstr, setBrstr] = React.useState(18);
  const [str, setStr] = React.useState(1);

  React.useEffect(()=>{
    setStr(stranica);
    setBrstr(brojStranica);
    console.log("str je " + stranica + ", a brstr je " + brojStranica);
  }, [stranica, brojStranica]);

  function klik(e) {
    let vr = e.currentTarget.innerHTML;
    console.log("kliknuo si na " + vr);

    setStr(parseInt(vr));
    setStranica(parseInt(vr));
  }

  function klik1(e) {
    if (e.currentTarget.classList.contains("prev")) {
      if (str > 1) {
        setStr((prev)=>{setStranica(prev-1); return prev-1});
        console.log("smanjujes na " + (str-1));
      }
    } else {
      if (str < brstr) {
        setStr((prev)=>{setStranica(prev+1); return prev+1});
        console.log("povecavas na " + (str+1));
      }
    }
  }

  function postaviElemente(str, brstr) {
    let rez = [];
    if (brstr === 0) {
      rez.push(<li key={0} onClick={klik} className="active">{1}</li>);
    }
    for (let i = 0; i < brstr; i++) {
      if (i == str-1) {
        rez.push(<li key={i} onClick={klik} className="active">{i+1}</li>);
      } else if (i < 2) {
        rez.push(<li key={i} onClick={klik} >{i+1}</li>);
      } else if (i > brstr-3) {
        rez.push(<li key={i} onClick={klik} >{i+1}</li>);
      } else if (i > str-4 && i < str+2) {
        rez.push(<li key={i} onClick={klik} >{i+1}</li>);
      } else if (i === str-4) {
        rez.push(<li key={i}>{"..."}</li>);
      } else if (i === str+2) {
        rez.push(<li key={i}>{"..."}</li>);
      }
    }
    return rez;
  }


  return (
    <div className="pagination">
      <ul className="pagination">
        {brstr > 1 ? <li onClick={klik1} className="prev previous_page disabled"><p className="knjige-pagination-velikiekran">prethodna</p><p className="knjige-pagination-maliekran">{"<<"}</p></li> : null}               
        {/*<li className="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>*/}
        {postaviElemente(str, brstr)}
        {brstr > 1 ? <li onClick={klik1} className="next next_page"><p className="knjige-pagination-velikiekran">sljedeca</p><p className="knjige-pagination-maliekran">{">>"}</p></li> : null}
      </ul>
    </div>

  )
}

function App() {
  const [id, setId] = React.useState();
  const [vri, setVri] = React.useState();
  const [vri1, setVri1] = React.useState();

  const [loading, error, value] = useFetch(ADRESA + '/api/izdvajamo', {}, []);
  //const loading = true; const value = undefined; const error = undefined;
  const [loading1, error1, value1] = useFetch(ADRESA + '/api/sveknjige', {}, []);

  return (
    <Kontekst.Provider value={[id, setId, vri, setVri, vri1, setVri1]}>
    <Router>
      <div id="tijelo">
        <Navbar/>
        <Routes>
          <Route exact path="/kontakt" element={<Kontakt/>} />
          <Route exact path="/onama" element={<ONama/>} />
         
          {/*<Route exact path="/knjige" element={<Knjige/>} />*/}
          <Route exact path="/knjige" element={<Knjige loading={loading1} error={error1} value={value1}/>} />
          <Route exact path="/" element={<Izdvajamo loading={loading} error={error} value={value}/>} />
          <Route exact path="/detalji" element={<Detalji/>} />
        </Routes>
      </div>
    </Router>
    </Kontekst.Provider>
  )
}

root.render(
  
    <App />
  
);


