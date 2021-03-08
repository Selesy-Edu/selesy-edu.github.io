import React, {useState} from 'react';

import HomePuzzle from '../animations/HomePuzzle'

import '../styles/landing.css'

import background from '../assets/images/Background.png'
import footer from '../assets/images/Trazado.png'
import tablero from '../assets/images/tableroBack.png'
import symbol from '../assets/images/symbol.png'
import selecu from '../assets/images/Selecu.png'


const Landing = () => {
  const [menu, setMenu] = useState(true);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  return (
      <React.Fragment>
        <nav class="navbar  navbar-expand-sm bg-dark navbar-dark z-top">
          <a class="navbar-brand" href="#">
            <img src={selecu} alt="..." />
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" onClick={toggleMenu}>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">QUIÉNES SOMOS</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">QUÉ HACEMOS</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">COMUNIDAD</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">CONTACTO</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">FILOSOFÍA</a>
              </li>
            </ul>
          </div>
        </nav>
        <img className="symbol-background z-top" src={symbol} alt="..." />
        <main>
          <div id="defaultP5" className="container index-container img-fluid">
            <img className="tablero-background img-fluid" src={tablero} alt="..." />
            <h1 id="slogan"><p>CULTURE<br /> SELF LEARNING</p></h1>
            <HomePuzzle
              onMenu={menu}
            />
          </div>
        </main>
        <footer >
          <div className="container index-container img-fluid">
            <img className="index-background" src={background} alt="..." />
            <div className="index-footer">
              <img className="img-fluid" src={footer} alt="..."/>
            </div>
          </div>
        </footer>
      </React.Fragment>
  );
}

export default Landing;

// <nav className="navbar navbar-expand-lg navbar-dark ">
//   <div className="container-fluid">
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navi-list navbar-nav me-auto mb-2 mb-lg-0 bg-dark">
//           <li className="nav-items item-1 nav-item"><a href="#"><img src={selecu} alt="..." /></a> </li>
//           <li className="nav-items item-rest">QUIÉNES SOMOS</li>
//           <li className="nav-items item-rest">QUÉ HACEMOS</li>
//           <li className="nav-items item-rest">COMUNIDAD</li>
//           <li className="nav-items item-rest">CONTACTO</li>
//           <li className="nav-items item-rest">FILOSOFÍA</li>
//           <li className="nav-items item-7"><a href="#"><img width="20rem" src={symbol} alt="..." /></a></li>
//         </ul>
//       </div>
//     </div>
// </nav>
