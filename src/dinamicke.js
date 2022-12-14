import React from 'react';
import './index.css';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Kontekst } from "./index.js";
import { Navbar } from "./staticne.js";

export const ADRESA = "http://localhost:3000"

export function Kartica({id="neki id", naslov="neki naslov", cijena="neka cijena", 
                  slika=null, autori=[], klikFun=()=>{return true}}) {
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
      klikFun();
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
  
export function Izdvajamo({loading, error, value}) {
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
    <>
      <Navbar/>
      <main id="izdvajamo-main">
        <div id="izdvajamo-stupac1">
          <div id="izdvajamo-el4">
              <p>Mo??da ??e Vas zanimati:</p>
          </div>
          {!loading && error === undefined ?
            value.map((el)=>{return <Kartica key={el.id} id={el.id} naslov={el.naslov} 
                            cijena={el.cijena} slika={el.slika} autori={el.autori}/>})
            : null}
          
        </div>
        <div id="izdvajamo-stupac2">
          <p id="izdvajamo-el1">Filosofska biblioteka Dimitrija Savi??a</p>
          <p id="izdvajamo-el2">email: <a href="mailto:dimitrije.savic@zg.t-com.hr">dimitrije.savic@zg.t-com.hr</a></p>
          <img id="izdvajamo-el3" src="cayton_sa_okvirom_prozirni.gif" alt="Cayton"/>
        </div>
      </main>
    </>
    )
  }
  
export function Detalji() {
    
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
    <>
    <Navbar/>
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
    </>
    )
  }
  
export function Knjige({loading, error, value}) {
    const [autor, setAutor] = React.useState("");
    const [naslov, setNaslov] = React.useState("");
    const [godina, setGodina] = React.useState("");
    const [brojKnjiga, setBrojKnjiga] = React.useState(0);
    const [biblioteka, setBiblioteka] = React.useState("0");
    const [stranica, setStranica] = React.useState(1);
    const [skrolY, setSkrolY] = React.useState(0);
    const [vri1, setVri1] = React.useState([]);
    const [params, setParams] = useSearchParams();
  
    const [a, b, c, d, vri, setVri] = React.useContext(Kontekst);
    const [br, setBr] = React.useState(0);
    const navigate = useNavigate();
  
    //const {loading, error, value} = useFetch(ADRESA + '/api/sveknjige', {}, []);
  
    const velStranice = 20
  
    const r4 = React.useRef();
    const r5 = React.useRef();
    const r6 = React.useRef();
    const r7 = React.useRef();
    const r8 = React.useRef();
    const r0 = React.useRef();

    React.useEffect(()=>{
      console.log("trenutni autor je " + params.get("autor"));
      let v = params.get("naslov");
      v !== null ? setNaslov(v) : setNaslov("");
      v = params.get("autor");
      v !== null ? setAutor(v) : setAutor("");
      v = params.get("godina");
      v !== null ? setGodina(v) : setGodina("");
      v = params.get("biblioteka");
      v !== null ? postaviBiblioteku(v) : postaviBiblioteku("0");
      v = params.get("scroll");
      v !== null ? setSkrolY(parseInt(v)) : setSkrolY(0);
      v = params.get("stranica");
      v !== null ? setStranica(parseInt(v)) : setStranica(1);
      setBr((prev)=>{return prev+1});
    }, [params, vri]);

    React.useEffect(()=>{
        //window.scrollTo(0,skrolY);
        setTimeout(()=>{window.scrollTo(0,skrolY)}, 30);
    }, [skrolY]);
  
    function postaviBiblioteku(kod) {
      setBiblioteka((prev)=>{
        let r = vratiRef(prev);
        console.log("prethodna " + prev);
        r.current.classList.remove("knjige-aktivan");
        r.current.classList.add("knjige-neaktivan");
  
        r = vratiRef(kod);
        console.log("sljedeca " + kod);
        r.current.classList.remove("knjige-neaktivan");
        r.current.classList.add("knjige-aktivan");
        //setBiblioteka(kod);
  
        
  
        //setBrojKnjiga(vri1.length);
        return kod;
      });
    }
  
    React.useEffect(()=>{
      if (vri !== undefined) {
        // filtriramo zbog pritiska gumba
        console.log("autor JE " + autor);
        setVri1(vri.filter((el,index)=>{
          let id1 = "";
    
          // prvi filter je po biblioteci
          if (el.biblioteka_id !== null) {
            id1 = el.biblioteka_id.toString();
            if (biblioteka !== "0" && id1 !== biblioteka) {
              //console.log("element sa " + id1 + " ne prolazi " + biblioteka);
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
      };
    }, [br]);
  
    React.useEffect(()=>{
  
      console.log(Math.random());
      console.log("Loading je " + loading);
      console.log("Error je " + error);
      if (value !== undefined) {
        //console.log("Value je " + value[0].naslov);
        setVri(value);
        setBrojKnjiga(value.length);
      }
  
      //const params = new URLSearchParams({"foo":1,"goo":"ides"});
      //console.log("PARAMS JE " + params);
  
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
  
    function submitaj() {
      let params = new URLSearchParams({"autor":autor, "naslov":naslov, 
            "godina":godina, "stranica":stranica, "biblioteka": biblioteka,
            "scroll": Math.floor(window.scrollY)});
      navigate("/knjige?" + params, {replace: true});
    }
  
    function gumbKlik(e) {
      if (vri === undefined) return false;
  
      let kod = e.target.id.split("-")[1];
      console.log("kliknuo si na " + kod);
  
      let params = new URLSearchParams({"autor":autor, "naslov":naslov, 
            "godina":godina, "stranica":1, "biblioteka": kod,
            "scroll": 0});
      navigate("/knjige?" + params);
    }
  
  
    function uvjet(index, stranica) {
      if (index >= (stranica-1)*velStranice && index < stranica*velStranice) return true;
      return false;
    }
  
    function submitKlik(e) {
      e.preventDefault();
  
      let params = new URLSearchParams({"autor":autor, "naslov":naslov, 
            "godina":godina, "stranica":1, "biblioteka": biblioteka,
            "scroll": 0});
      navigate("/knjige?" + params);
  
    }
  
  
  
    return (
    <>
      <Navbar/>
      <main id="knjige-main">
        <div id="knjige-polje1">
          <div className="knjige-div4">
          <div ref={r4} id="bibID-4" onClick={gumbKlik} className="knjige-button knjige-neaktivan">Filosofska biblioteka</div>
            <div ref={r5} id="bibID-5" onClick={gumbKlik} className="knjige-button knjige-neaktivan">Faustovska biblioteka</div>
            <div ref={r6} id="bibID-6" onClick={gumbKlik} className="knjige-button knjige-neaktivan">Filolo??ka biblioteka</div>
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
                            cijena={el.cijena} slika={el.slika} autori={el.autori} klikFun={submitaj} />})
            
            : null}
          
        </div>
  
        <div id="knjige-polje3">
          <Pagination stranica={stranica} setStranica={setStranica} brojStranica={Math.floor((brojKnjiga-0.1)/velStranice+1)}/>
        </div>
  
      </main>
    </>
    )
  }
  
export function Pagination({stranica=1,brojStranica=1, setStranica=(e)=>{return true;}}) {
    const [brstr, setBrstr] = React.useState(18);
    const [str, setStr] = React.useState(1);
  
    React.useEffect(()=>{
      setStr(stranica);
      setBrstr(brojStranica);
      //console.log("str je " + stranica + ", a brstr je " + brojStranica);
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