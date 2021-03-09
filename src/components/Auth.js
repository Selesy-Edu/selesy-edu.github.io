import React, {useState, useEffect} from 'react'
import SignOut from './SignOut'
import Home from './home'
import Gestores from './Gestores'
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
        console.log("SESSION");
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

  const loginAdmin = async () => {
    await firebase.auth().signInWithEmailAndPassword(email,password).then(
      () => {
        setUserData(user);
        setLoggedAdmin(true);
        checkLogin();
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

  const verifyPass = (input1, input2) => {
    if(props.roll !== "Gestores"){
      if(input1 === input2  && input1 != ''){
        document.getElementById("auth-button").disabled = false;
      }
      if(input1 != input2){
        document.getElementById("auth-button").disabled = true;
      }
    }
  }

  const checkLogin = () => {
    if(user.data !== null && props.roll === "Gestores"){
      db.ref().child(user.data.uid).on(
        'value',(snapshot) => {
          let snap = snapshot.val();
          let access = snap.access;
          setAdminAccess(access.Gestores);
        }
      );
    }
  }

  const seePassIcon = () => {
    setSeePass(!seePass);
  }

  useEffect(() => {
    if(user.data != null && props.roll !== "Gestores"){
      setLogged(true)
    }
    if(!logged){
      verifyPass(password,passwordVal);
    }
  },[logged,password,passwordVal,loggedAdmin]);

  if(logged && props.roll !== "Gestores" && props.roll !== "Mentores"){
    return <Home />;
  }
  if(adminAccess){
    return(
      <Gestores />
    );
  }
  if(props.roll !== 'Gestores' && !logged){
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
          <div style={{display:"block"}}>
            <label className="text-spaced-3">Repeat password</label>
            <input type={seePass ? 'text' : 'password'} className="input-card" onChange={(e) => setPasswordVal(e.target.value)}/>
            <img src={icon} id="togglePassword" onClick={(e)=> seePassIcon()}/>
          </div>
          <button id="auth-button" onClick={login} className="buttonSubmit">login</button>
          <SignOut />
        </div>
      </div>
    )
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
              <input type="password" className="input-card" onChange={(e) => setPassword(e.target.value)}/>
              <img src={icon} id="togglePassword" onClick={(e)=> seePassIcon()}/>
            </div>
            <button id="auth-button" onClick={loginAdmin} className="buttonSubmit">login</button>
            <SignOut />
          </div>
        </div>
      </div>
    );
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
//   if(user.data === null){
//     return (
//       <div className="card selectCard" style={{width: "25rem"}}>
//         <div className="card-body">
//           <h5 className="card-title">ADMIN</h5>
//           <div style={{display:"block"}}>
//             <label className="text-spaced-3">Email</label>
//             <input type="email" id="email" className="input-card" onChange={(e) => setEmail(e.target.value)} />
//             <p><strong>{newUser}</strong></p>
//           </div>
//           <div style={{display:"block"}}>
//             <label className="text-spaced-1">Password</label>
//             <input type="text" className="input-card" onChange={(e) => setPassword(e.target.value)}/>
//           </div>
//           <div style={{display:"block"}}>
//             <label className="text-spaced-3">Repeat password</label>
//             <input type="text" className="input-card" onChange={(e) => setPasswordVal(e.target.value)}/>
//           </div>
//           <button id="auth-button" onClick={createUser} className="buttonSubmit">create user</button>
//         </div>
//       </div>
//     );
//   }
// }
