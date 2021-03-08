import React, {useState} from 'react';

import '../../styles/landing.css'

import symbol from '../../assets/images/symbol.png'
import selecu from '../../assets/images/Selecu.png'


const NavBar = () => {
  const [menu, setMenu] = useState(true);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark z-top">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navi-list navbar-nav me-auto mb-2 mb-lg-0 bg-dark">
                  <li className="nav-items item-1 nav-item"><a href="https://www.selecu.net"><img src={selecu} alt="..." /></a> </li>
                  <li className="nav-items item-rest">
                    <a href="https://www.selecu.net/sobrenosotros" className="nav-items">SOBRE NOSOTROS</a>
                  </li>
                  <li className="nav-items item-rest">
                    <a href="https://www.selecu.net/nuestrafilosofia" className="nav-items">NUESTRA FILOSOFÍA</a>
                  </li>
                  <li className="nav-items item-rest">
                      <a href="#" className="nav-items">COMUNIDAD</a>
                  </li>
                  <li className="nav-items item-rest">
                    <a href="https://www.selecu.net/contacto" className="nav-items">CONTACTO</a>
                  </li>
                  <li className="nav-items item-7">
                    <img width="20rem" src={symbol} alt="..." />
                  </li>
                </ul>
              </div>
            </div>
        </nav>
        </React.Fragment>
    );
  }

  export default NavBar;
