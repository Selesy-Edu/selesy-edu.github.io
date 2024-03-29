import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'

const List = (props) => {
  const [typeOfUser, setTypeOfUser] = useState('');
  const [userToDisplay, setUserToDisplay] = useState('');

  const users = props.usersList;
  const fullInfo = props.fullInfo;
  const keys = Object.keys(users);

  const names = keys.map((name)=>{
    if(fullInfo[users[name]['UI']]['access'][typeOfUser]){
      return(
        <Container key={name}>
          <Card style={{width: "18rem"}}>
            <Card.Body>
              <span onClick={() => setUserToDisplay(name)}><h6 className="card-link">{name}</h6></span>
            </Card.Body>
          </Card>
        </Container>
      );
    }
    return null
  });

  return(
    <>
      <Card style={{width: "26rem"}}>
        <Nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav sm">
            <li className={`list-group-item ${typeOfUser === 'Gestores' ? 'active': ' '}`}>
              <p className="nav-link" onClick={()=>setTypeOfUser('Gestores')}>Gestores</p>
            </li>
            <li className={`list-group-item ${typeOfUser === 'Mentores' ? 'active': ' '}`}>
              <p className="nav-link" onClick={()=>setTypeOfUser('Mentores')}>Mentores</p>
            </li>
            <li className={`list-group-item ${typeOfUser === 'Aprendices' ? 'active': ' '}`}>
              <p className="nav-link" onClick={()=>setTypeOfUser('Aprendices')}>Aprendices</p>
            </li>
          </ul>
        </Nav>
        {names}
      </Card>
        {userToDisplay &&
        <Card style={{width: "26rem"}}>
          <Card.Body>
            <Reg
              set={userToDisplay}
              name={`${userToDisplay}`}
              email={`Email: ${fullInfo[users[userToDisplay]['UI']]['registry']['emailParents']}`}
              institution={`Colegio: ${fullInfo[users[userToDisplay]['UI']]['registry']['institution']}`}
              position={`Cargo: ${fullInfo[users[userToDisplay]['UI']]['registry']['year']}`}
              validation={`IUM: ${fullInfo[users[userToDisplay]['UI']]['access']['verification']}`}
            />
          </Card.Body>
        </Card>
        }
      </>
  );
}

const Reg = (props)=>{
  if(props.set !== undefined){
    return(
      <Container>
        <Card style={{width: "22rem"}}>
          <Card.Title>Información de registro</Card.Title>
          <hr/>
            <Card.Body>
              <h5>{props.name}</h5>
              <br />
              <p>{props.email}</p>
              <p>{props.institution}</p>
              <p>{props.position}</p>
              <p>{props.validation}</p>
            </Card.Body>
        </Card>
      </Container>
    );
  }
};


export default List;
