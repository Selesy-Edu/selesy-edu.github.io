import React, {useState, useEffect, Suspense} from 'react'
import { useFirebaseApp, StorageImage } from 'reactfire'
import PropTypes from 'prop-types';
import SignOut from './SignOut'
import App from '../App'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {connect} from 'react-redux'
import {loadUserData} from '../actions'

import {AuthCheck} from 'reactfire'

import '../styles/profiles.scss'

const Profile = (props) => {

  const [username, setUserName] = useState('');
  const [nickname, setNickName] = useState('');
  const [favoriteDay, setFavoriteDay] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [favoriteAnimal, setFavoriteAnimal] = useState('');
  const [parentsEmail, setParentsEmail] = useState('');
  const [school, setSchool] = useState('');
  const [level, setLevel] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileImageURL, setProfileImageURL] = useState('');
  const [pixelArtState, setPixelArtState] = useState(false);

  const firebase = useFirebaseApp();
  const db = firebase.database();

  const updateFirebase = (entry, value) => {
    let obj = {};
    obj[entry] = value;
    const ref = db.ref("/users/"+props.userData.data.uid.slice(0,10) + '/info/').update(
      obj
    );
  }

  const writeInfo = () => {
    updateFirebase('nick',nickname);
    updateFirebase('color',favoriteColor);
    updateFirebase('animal',favoriteAnimal);
    updateFirebase('dayPreference',favoriteDay);
  }

  useEffect(()=>{
    if(props.updateState){
      writeInfo()
      props.setUpdateState(false)
    }
  },[props.updateState])

  useEffect(()=>{
    db.ref().child("/users/"+props.userData.data.uid.slice(0,10)).on(
      'value',(snapshot) => {
        let snap = snapshot.val();
        let info = snap.info;
        let registry = snap.registry;

        setNickName(info.nick);
        setFavoriteColor(info.color);
        setFavoriteDay(info.dayPreference);
        setFavoriteAnimal(info.animal);
        setProfileImage(info.profileImage);
        setProfileImageURL(info.profileImageURL);
        setUserName(registry.name);
        setParentsEmail(registry.emailParents);
        setSchool(registry.institution);
        setLevel(registry.year);
      }
    );
  },[]);

  return(
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <AuthCheck fallback={<App />}>
        <Row>
          <Col className="justify-content-center" style={{display:'flex'}}>
            <Card className={`card-profile-${props.level} text-center`}>
              <Card.Body>
                <Card.Title as="h1">Mi perfil</Card.Title>
                  {profileImage &&
                    <StorageImage
                      className="image-mainprofile"
                      storagePath={"/users/"+props.userData.data.uid.slice(0,10)+'/picture/perfil.jpg'}
                      style={{width:'60%'}}
                      alt="Imagen de perfíl"/>
                  }
                <Card.Title as="h1">{nickname}</Card.Title>
              </ Card.Body>
            </Card>
          </Col>
          <Col className="justify-content-center" style={{display:'flex'}}>
            <Card className={`card-profile-${props.level}`}>
              <Card.Body>
                  <form>
                    <div>
                    <label className="mb-1">Cómo me gusta que me digan</label>
                    <input type="text" className="input-profile" value={nickname} required onChange={e => setNickName(e.target.value)}/>
                    </div>
                    <label className="mb-1">Mi nombre completo</label>
                    <input type="text" className="input-profile" value={username} disabled/>

                    <label className="mb-1">Correo de mi responsable</label>
                    <input type="text" className="input-profile" value={parentsEmail} disabled/>

                    <label className="mb-1">Mi grado</label>
                    <input type="text" className="input-profile" value={level} disabled/>

                    <label className="mb-1">Mi colegio</label>
                    <input type="text" className="input-profile" value={school} disabled/>

                    <label className="mb-1">Día favorito</label>
                    <input type="text" className="input-profile" value={favoriteDay} required onChange={e => setFavoriteDay(e.target.value)}/>

                    <label className="mb-1">El animal que más me gusta</label>
                    <input type="text" className="input-profile" value={favoriteAnimal} required onChange={e => setFavoriteAnimal(e.target.value)}/>

                    <label className="mb-1">Color que más me gusta</label>
                    <input type="text" className="input-profile"  value={favoriteColor} required onChange={e => setFavoriteColor(e.target.value)}/>
                  </form>
                  <Container className="justify-content-center container-buttons-center">
                    {props.functionsAvailable &&
                      <>
                        <Button className="mr-2 login-button" variant="dark" onClick={writeInfo}>¡Actualizate!</Button>
                        <a href="#/home"><Button className="mr-2 login-button" variant="dark">Regresar al mapa</Button></a>
                        <SignOut
                          className='login-button'
                          text="Salir"
                         />
                      </>
                    }
                  </Container>
                </Card.Body>
              </Card>
          </Col>
        </Row>
      </AuthCheck>
    </Suspense>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loadUserData,
    userRoll: state.userRollPass
  };
}

Profile.propTypes = {
  functionsAvailable: PropTypes.bool
}

Profile.defaultProps = {
  functionsAvailable: false,
  level: 'primero'
}

export default connect(mapStateToProps,{loadUserData})(Profile);
