import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
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

function Knjige() {
  return (
    <p>ovdje dolazi stranica knjige</p>
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
    <Link to="/detalji" onClick={klik}>
      <div className="izdvajamo-element">
       <div className="element-el1">
          {slika === null ? <img src="nepoznata_knjiga.jpg" className="element-el1-img" alt="logo"/> 
                          : <img src={"data:image/jpg;base64,"+slika} className="element-el1-img" alt="logo"/>
          }  
       </div>
       <div className="element-el2">
           <p className="element-el2-naslov">{naslov}</p>
           <p className="element-el2-autor">{aut}</p>
           <p className="element-el2-cijena">{cijena} kn</p>
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
  
  const [id, setId, vri, setVri] = React.useContext(Kontekst);
  
  const [naslov, setNaslov] = React.useState("-");
  const [autori, setAutori] = React.useState("-");
  const [cijena, setCijena] = React.useState("-");
  const [biblioteka, setBiblioteka] = React.useState("-");
  const [godina, setGodina] = React.useState("-");
  const [brojStranica, setBrojStranica] = React.useState("-");
  const [isbn, setIsbn] = React.useState("-");
  const [slika, setSlika] = React.useState(null);

  React.useEffect(()=>{
    //console.log("ID je " + id);
    //console.log(vri);
  }, []);

  React.useEffect(()=>{
    if (vri !== undefined) {
      let e = vri.find((el)=>{return el.id === id});
      console.log("Odabrani element je " + e.naslov);
      !e.naslov ? setNaslov("-") : setNaslov(e.naslov);
      !e.cijena ? setCijena("-") : setCijena(e.cijena + "kn");
      !e.biblioteka ? setBiblioteka("-") : setBiblioteka(e.biblioteka);
      !e.godina ? setGodina("-") : setGodina(e.godina);
      !e.brojstranica ? setBrojStranica("-") : setBrojStranica(e.brojstranica);
      !e.isbn ? setIsbn("-") : setIsbn(e.isbn);
      setSlika(e.slika);
      let brAutora = e.autori.length;
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
    }
  }, [id]);


  const navigate = useNavigate();

  function klik() {
    navigate(-1);
  }

  return (
    <main id="opisknjige-main">
      <div id="opisknjige-stupac1">
        {slika === null ? <img src="nepoznata_knjiga.jpg" id="opisknjige-img" alt="slika knjige"/> 
                          : <img src={"data:image/jpg;base64,"+slika} id="opisknjige-img" alt="slika knjige"/>
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

function App() {
  const [id, setId] = React.useState();
  const [vri, setVri] = React.useState();

  const {loading, error, value} = useFetch(ADRESA + '/api/izdvajamo', {}, []);

  return (
    <Kontekst.Provider value={[id, setId, vri, setVri]}>
    <Router>
      <div id="tijelo">
        <Navbar/>
        <Routes>
          <Route exact path="/kontakt" element={<Kontakt/>} />
          <Route exact path="/onama" element={<ONama/>} />

          <Route exact path="/knjige" element={<Knjige/>} />
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


