import React from 'react';
import NavBar from './navbar.js';

import '../../styles/mainlinks.css'
import '../../styles/landing.css'

const Contacto = () => {

  return (
    <React.Fragment>
      <div className="fluid-container">
        <NavBar />
      </div>
        <div className="container">
          <div class="card margin-top overflow translate-top" style={{width: "20rem;"}}>
            <div class="card-body">
              <h5 class="card-title">Queremos saber de ti</h5>
              <h6 class="card-subtitle mb-2 text-muted">¡Nos encantaría saber de ti!</h6>
              <p class="card-text">
                Si estás interesado en conocer más sobre nuestra plataforma, sobre nuestros centros de experiencia aliados, sobre nuestra filosofía o quisieras ser parte de nuestro equipo de trabajo, escríbenos a este correo hola@selecu.net
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
  );
}

export default Contacto;
