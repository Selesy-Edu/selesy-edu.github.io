import React, {useState} from 'react';

import HomePuzzle from '../animations/HomePuzzle'
import NavBar from './Main/navbar.js'

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
        <NavBar />
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
