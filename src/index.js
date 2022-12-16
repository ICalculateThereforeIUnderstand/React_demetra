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
import {ONama, Kontakt, Navbar, Manager1Help, Manager2Help} from "./staticne.js";
import { Knjige, Izdvajamo, Detalji, ADRESA } from "./dinamicke.js"
import { Manager1, Manager2, Pokus } from "./manager.js";

const root = ReactDOM.createRoot(document.querySelector('#cont'));

export const Kontekst = React.createContext();


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
        <Routes>
          
            <Route path="/kontakt" element={<Kontakt/>} />
            <Route path="/onama" element={<ONama/>} />
         
            <Route path="/knjige" element={<Knjige loading={loading1} error={error1} value={value1}/>} />
            <Route path="/" element={<Izdvajamo loading={loading} error={error} value={value}/>} />
            <Route path="/detalji" element={<Detalji/>} />
            
            <Route path="/manager1" element={<Manager1 loading={loading1} error={error1} value={value1}/>} />
            <Route path="/manager2" element={<Manager2/>} />
            <Route path="/manager1_help" element={<Manager1Help/>} />
            <Route path="/manager2_help" element={<Manager2Help/>} />
        </Routes>
      </div>
    </Router>
    </Kontekst.Provider>
  )
}

root.render(
    <>
    <App/>
    {/*<Pokus/>*/}
    </>
);


