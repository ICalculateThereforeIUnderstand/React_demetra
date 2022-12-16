import React from 'react';
import './index.css';
import { Link } from "react-router-dom";
//import { Navbar1 } from "./manager.js";

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
        el.style[key] = stilovi[key];
    }
}

export function Manager1Help() {
    return (
      <>
        <Navbar br={2}/>
        <p className="manager-help-tekst">Na ovom panelu “Books” mozemo pretrazivati knjige pritiskom gumba “Search”, zatim unositi nove knjige gumbom “New Book”, ili klikom na neku od nize prikazanih knjiga im mozemo modificirati podatke. Pretrazivati mozemo po podacima o knjizi ili/i po skladistima i/ili adresama. Pretrazivanje je case-insensitive, sto znaci da nema razlike izmedu malih I velikih slova. Takoder se pretrazuje po substringovima (npr. unosom u polje “naslov” stringa “kNj” algoritam ce izlistati naslov “Knjiga o slovima”) Klikom na “New book” otvara se nova stranica gdje unosimo podatke o novoj knjizi. Slicno je I za slucaj modifikacije vec postojece knjige.</p>
        <Link to="/manager1" className="link-header">Natrag na glavnu stranicu</Link>
      </>
    )
}

export function Manager2Help() {
    return (
      <>
        <Navbar br={3}/>
        <p className="manager-help-tekst">Na ovom panelu “Warehouses” mozemo menegirati skladista I adrese. Knjige se nalaze u odredenim kolicinama po pojedinim adresama, a adrese su pridruzene skladistima. Na taj nacin je moguce lako pronaci knjigu u bilo kojem skladistu, ma kako veliko bilo. U prvom izborniku biramo skladiste. Ukoliko ga zelimo obrisati, kliknemo na gumb “oduzmi”. Ako skladiste ima pridruzene adrese, nije ga moguce obrisati, prvo je potrebno ukloniti pridruzene adrese. Na taj nacin se cuva konzistentnost baze podataka. Ukoliko zelimo dodati novo skladiste, u desnom input elementu upisemo ime te kliknemo na gumb “Add”. Ukoliko se zelimo baviti adresama, prvo je potrebno odabrati njihovo skladiste, zatim kliknemo gumb select pa se adrese pridruzene odabranom skladistu pokazu u donjem izborniku. Ukoliko neku od njih zelimo izbrisati, odaberemo je u izborniku pa kliknemo gumb “Erase”. Nije moguce izbrisati adresu na kojoj se nalaze knjige. U tom slucaju potrebno je prvo otici na svaki naslov s te adrese, pa ih ukloniti s nje, pa se potom vratiti na ovaj izbornik I izbrisati adresu. Ukoliko zelimo dodati novu adresu, u desnom input elementu unesemo njeno ime I kliknemo gumb “Add”.</p>
        <Link to="/manager2" className="link-header">Natrag na glavnu stranicu</Link>
      </>
    )
}

export function Navbar({br=1}) {

    const [toggle, setToggle] = React.useState(false);
  
    const r1 = React.useRef();
    //const r2 = React.useRef();
    
    function klik() {
      if (toggle) {
        dodajStilove(r1.current, {height:"0px"});
        setToggle(false);
      } else {
        if (br === 1) {
          dodajStilove(r1.current, {height:"200px"});
        } else {
          dodajStilove(r1.current, {height:"150px"});  
        }
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
              {br == 1 ? [
              <Link key={0} to="/knjige" className="link-header">Knjige</Link>,
              <Link key={1} to="/" className="link-header">Izdvajamo</Link>,
              <Link key={2} to="/onama" className="link-header">O nama</Link>,
              <Link key={3} to="/kontakt" className="link-header">Kontakt</Link>
              ] : [
                <Link key={4} to="/manager1" className="link-header lijevi-link-header">Books</Link>,
                <Link key={5} to="/manager2" className="link-header">Warehouses</Link>,
                <Link key={6} to={br === 2 ? "/manager1_help" : "/manager2_help"} className="link-header desni-link-header">Help</Link>
              ]
              }
            </div>
            <div id="gumb-header" onClick={klik}>
              <div className="gumb-el"></div>
              <div className="gumb-el"></div>
              <div className="gumb-el"></div>
            </div>
          </div>
          <div ref={r1} id="collapsing-menu-header">
            {br == 1 ? [
              <Link key={7} to="/knjige" className="collapsing-link"><p>Knjige</p></Link>,
              <Link key={8} to="/" className="collapsing-link"><p>Izdvajamo</p></Link>,
              <Link key={9} to="/onama" className="collapsing-link"><p>O nama</p></Link>,
              <Link key={10} to="/kontakt" className="collapsing-link"><p>Kontakt</p></Link>
              ] : [
                <Link key={11} to="/manager1" className="collapsing-link"><p>Books</p></Link>,
                <Link key={12} to="/manager2" className="collapsing-link"><p>Warehouses</p></Link>,
                <Link key={13} to={br === 2 ? "/manager1_help" : "/manager2_help"} className="collapsing-link"><p>Help</p></Link>  
              ]
            }
          </div>
      </nav>
  
    )
  }

export function ONama() {
    return (
    <>
      <Navbar/>
      <main id="onama-main">
        <p id="onama-el1">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.  Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
        <img src="cayton_sa_okvirom_prozirni.gif" id="onama-el2" alt="slika Caytona" />
        <Link to="/knjige" id="onama-el3">Natrag na glavnu stranicu</Link>
      </main>
    </>
    )
  }
  
export function Kontakt() {
    return (
    <>
      <Navbar/>
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
          <Link to="/knjige" id="kontakt-link" className="link-header">Natrag na glavnu stranicu</Link>
        </div>
        <img src="slika_demetre8bit_mala.png" id="kontakt-slika" alt="slika Demetre"/>
      </main>
    </>
    )
  }