import React, {useState, useEffect} from 'react'
import SignOut from './SignOut'
import Home from './home'
import Landing from './landing'
import Gestores from './Gestores'
import Mentores from './Mentores'
import 'firebase/auth'
import firebaseAuth from "firebase/app";
import { useFirebaseApp, useUser } from 'reactfire'
import {connect} from 'react-redux'

import icon from '../assets/images/eye.png'

import '../styles/general.css'

const Auth = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [emailNotFound, setEmailNotFound] = useState('')
  const [newUser, setNewUser] = useState('')
  const [userData, setUserData] = useState({})
  const [logged, setLogged] = useState(false);
  const [loggedAdmin, setLoggedAdmin] = useState(false);
  const [adminAccess, setAdminAccess] = useState(false);
  const [loggedMentor, setLoggedMentor] = useState(false);
  const [mentorAccess, setMentorAccess] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailParents, setEmailParents] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [loginReady, setLoginReady] = useState(false);
  const [seePass, setSeePass] = useState(false);

  const firebase = useFirebaseApp();
  const user = useUser();
  const db = firebase.database();

  const fbPersistance = () => {
   firebaseAuth.auth().setPersistence(firebaseAuth.auth.Auth.Persistence.NONE).then(
      ()=> {
        setLoginReady(true);
      }
    );
  }

  const login = async () => {
    fbPersistance();
    await firebase.auth().signInWithEmailAndPassword(email,password).then(
      () => {
        setUserData(user);
        setLogged(true);
      },
      (e) => {
        setEmailNotFound(e.code);
      }
    );
  }

  const loginAdmin = () => {
    firebase.auth().signInWithEmailAndPassword(email,password).then(
      () => {
        checkLoginAdmin();
      },
      (e) => {
        setEmailNotFound(e.code);
      }
    );
  }

  const loginMentor = () => {
    firebase.auth().signInWithEmailAndPassword(email,password).then(
      () => {
        checkLoginMentor();
      },
      (e) => {
        setEmailNotFound(e.code);
      }
    );
  }

  const createUser = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email,password).then(
      (s) => setNewUser(s.message),
      (e) => setNewUser(e.message)
    );
  }

  const checkLoginAdmin = () => {
    if(user.data !== null && props.roll === "Gestores"){
      db.ref().child(user.data.uid).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          let access = snap.access;
          setAdminAccess(access.Gestores);
          setUserData(user);
          setLoggedAdmin(true);
        }
      );
    }
  }
  const checkLoginMentor = () => {
    if(user.data !== null && props.roll === "Mentores"){
      db.ref().child(user.data.uid).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          let access = snap.access;
          setMentorAccess(access.Mentores);
          setLoggedMentor(true);
          setUserData(user);
        }
      );
    }
  }

  const seePassIcon = () => {
    setSeePass(!seePass);
  }

  useEffect(() => {

  },[loginReady,loginAdmin,loginMentor]);


  if(logged && props.roll !== "Gestores" && props.roll !== "Mentores"){
    return <Home />;
  }

  if(adminAccess){
    return(
      <Gestores />
    );
  }
  if(mentorAccess){
    return(
      <Mentores />
    );
  }

  if(props.roll === 'Gestores' && !logged){
    return(
      <div className="container">
        <div className="card selectCard" style={{width: "25rem"}}>
          <div className="card-body">
            <h6 className="card-title text-spaced-2">
              <p>Hola Gestor, realiza tu login para poder ingresar a la plataforma</p>
            </h6>
            <div style={{display:"block"}}>
              <label className="text-spaced-3">Email</label>
              <input type="email" id="email" className="input-card" onChange={(e) => setEmail(e.target.value)} />
              <p><strong>{emailNotFound}</strong></p>
            </div>
            <div style={{display:"block"}}>
              <label className="text-spaced-1">Password</label>
              <input type={seePass ? 'text' : 'password'} className="input-card" onChange={(e) => setPassword(e.target.value)}/>
              <img src={icon} id="togglePassword" onClick={(e)=> seePassIcon()}/>
            </div>
            <button id="auth-button" onClick={e => loginAdmin()} className="buttonSubmit">login</button>
            <SignOut />
          </div>
        </div>
      </div>
    );
  }

  if(props.roll === 'Mentores' && !logged){
    return(
      <div className="container">
        <div className="card selectCard" style={{width: "25rem"}}>
          <div className="card-body">
            <h6 className="card-title text-spaced-2">
              <p>Hola Mentor, realiza tu login para poder ingresar a la plataforma</p>
            </h6>
            <div style={{display:"block"}}>
              <label className="text-spaced-3">Email</label>
              <input type="email" id="email" className="input-card" onChange={(e) => setEmail(e.target.value)} />
              <p><strong>{emailNotFound}</strong></p>
            </div>
            <div style={{display:"block"}}>
              <label className="text-spaced-1">Password</label>
              <input type={seePass ? 'text' : 'password'} className="input-card" onChange={(e) => setPassword(e.target.value)}/>
              <img src={icon} id="togglePassword" onClick={(e)=> seePassIcon()}/>
            </div>
            <button id="auth-button" onClick={e => loginMentor()} className="buttonSubmit">login</button>
            <SignOut />
          </div>
        </div>
      </div>
    );
  }

  if(props.roll !== 'Gestores' && props.roll !== 'Mentores' && !logged){
    return (
      <div className="card selectCard" style={{width: "30rem"}}>
        <div className="card-body">
          <h6 className="card-title text-spaced-2">{`Accediste con un password para: ${props.roll}`}</h6>
          <div style={{display:"block"}}>
            <label className="text-spaced-3">Email</label>
            <input type="email" id="email" className="input-card" onChange={(e) => setEmail(e.target.value)} />
            <p><strong>{emailNotFound}</strong></p>
          </div>
          <div style={{display:"block"}} className="container">
            <label className="text-spaced-1">Password </label>
            <input type={seePass ? 'text' : 'password'} className="input-card" onChange={(e) => setPassword(e.target.value)}/>
            <img src={icon} id="togglePassword" onClick={(e)=> seePassIcon()}/>
          </div>
          <button id="auth-button" onClick={login} className="buttonSubmit">login</button>
          <SignOut />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps)(Auth);

//
// if(props.roll === 'Gestores' && !logged){
//   // Init database registry
//   const ref = db.ref(user.data.uid + '/registry/').set({
//     name: fullName,
//     emailParents: emailParents,
//     institution: institution,
//     year: year
//   });
//   const infoInit = db.ref(user.data.uid + '/info/').set({
//     nick: '',
//     color: '',
//     animal: '',
//     hourPreference: '',
//     dayPreference: ''
//   });
