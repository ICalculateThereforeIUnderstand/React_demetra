import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const root = ReactDOM.createRoot(document.querySelector('#cont'));

function dodajStilove(el, stilovi) {
  for (let key in stilovi) {
      el.style[key] = stilovi[key];
  }
}

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

function Izdvajamo() {
  return (
    <p>ovdje dolazi stranica izdvajamo</p>
  )
}

function App() {
  return (
    <Router>
      <div id="tijelo">
        <Navbar/>
        <Routes>
          <Route exact path="/kontakt" element={<Kontakt/>} />
          <Route exact path="/onama" element={<ONama/>} />

          <Route exact path="/knjige" element={<Knjige/>} />
          <Route exact path="/" element={<Izdvajamo/>} />
        </Routes>
      </div>
    </Router>
  )
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


