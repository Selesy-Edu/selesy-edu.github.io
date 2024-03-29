import React, {useState, useEffect} from 'react'

import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

const ButtonMenu = (props) => {
  const [state, setState] = useState(false);

  useEffect(()=>{
    props.setMenuNumber(state);
  },[state]);

  return(
    <Accordion >
      <Card style={{border:'none'}}style={{border:'none'}}>
          <p className="card-link" onClick={e => setState(0)}>
            Perfil
          </p>
      </Card>
      <Card style={{border:'none'}}>
          <p className="collapsed card-link" onClick={e => setState(1)}>
            Panel administración
          </p>
      </Card>
      <Card style={{border:'none'}}>
          <p className="collapsed card-link" onClick={e => setState(2)}>
            Listas
          </p>
      </Card>
    </Accordion>
  );
}

export default ButtonMenu;
