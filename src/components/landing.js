import React from 'react';

import HomePuzzle from '../animations/HomePuzzle'

import '../styles/landing.css'

import background from '../assets/images/Background.png'
import footer from '../assets/images/Trazado.png'
import tablero from '../assets/images/tableroBack.png'
import symbol from '../assets/images/symbol.png'
import selecu from '../assets/images/Selecu.png'


const App = () => {
  return (
    <section >
      <div id="container">
        <header>
          <nav>
            <div id="nav">
              <ul className="navi-list">
                <li className="nav-items item-1"><a href="#"><img src={selecu} alt="..." /></a> </li>
                <li className="nav-items item-rest">QUIÉNES SOMOS</li>
                <li className="nav-items item-rest">QUÉ HACEMOS</li>
                <li className="nav-items item-rest">COMUNIDAD</li>
                <li className="nav-items item-rest">CONTACTO</li>
                <li className="nav-items item-rest">FILOSOFÍA</li>
                <li className="nav-items item-7"><a href="#"><img width="20rem" src={symbol} alt="..." /></a></li>
              </ul>
              <img className="symbol-background" src={symbol} alt="..." />
            </div>
          </nav>
        </header>
        <main>
          <div className="container index-container img-fluid">
            <img className="tablero-background img-fluid-1" src={tablero} alt="..." />
            <h1 id="slogan"><p>CULTURE<br /> SELF LEARNING</p></h1>
            <HomePuzzle />
          </div>
        </main>
        <footer >
          <div className="container index-container img-fluid-1">
            <img className="index-background" src={background} alt="..." />
            <div className="index-footer">
              <img className="img-fluid-1" src={footer} alt="..."/>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default App;
