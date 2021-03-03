import React, {useState, useEffect} from 'react'
import SignOut from './SignOut'
import Home from './home'
import 'firebase/auth'
import { useFirebaseApp, useUser } from 'reactfire'
import {connect} from 'react-redux'

import '../styles/general.css'

const Auth = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [emailNotFound, setEmailNotFound] = useState('')
  const [newUser, setNewUser] = useState('')
  const [userData, setUserData] = useState({})
  const [logged, setLogged] = useState(false);

  const firebase = useFirebaseApp();
  const user = useUser();

  const login = async () => {
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

  const createUser = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email,password).then(
      (s) => setNewUser(s.message),
      (e) => setNewUser(e.message)
    );
  }

  const verifyPass = (input1, input2) => {
    if(input1 === input2  && input1 != ''){
      document.getElementById("auth-button").disabled = false;
    }
    if(input1 != input2){
      document.getElementById("auth-button").disabled = true;
    }
  }

  useEffect(() => {
    if(user.data != null){
      setLogged(true);
    }
    if(!logged){
      verifyPass(password,passwordVal);
    }

    if(logged){
      return(
        <Home />
      );
    }
  },[logged,password,passwordVal]);

  const pushUserData = (d) => {
    console.log(d);
  }

  if(logged){
    return <Home />;
  }
  if(!props.admin && !logged){
    return (
      <div className="card selectCard" style={{width: "25rem"}}>
        <div className="card-body">
          <h6 className="card-title text-spaced-2">{props.roll}</h6>
          <div style={{display:"block"}}>
            <label className="text-spaced-3">Email</label>
            <input type="email" id="email" className="input-card" onChange={(e) => setEmail(e.target.value)} />
            <p><strong>{emailNotFound}</strong></p>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Password</label>
            <input type="password" className="input-card" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-3">Repeat password</label>
            <input type="password" className="input-card" onChange={(e) => setPasswordVal(e.target.value)}/>
          </div>
          <button id="auth-button" onClick={login} className="buttonSubmit">login</button>
          <SignOut />
        </div>
      </div>
    )
  }
  if(props.admin){
    return (
      <div className="card selectCard" style={{width: "25rem"}}>
        <div className="card-body">
          <h5 className="card-title">ADMIN</h5>
          <div style={{display:"block"}}>
            <label className="text-spaced-3">Email</label>
            <input type="email" id="email" className="input-card" onChange={(e) => setEmail(e.target.value)} />
            <p><strong>{newUser}</strong></p>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Password</label>
            <input type="password" className="input-card" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-3">Repeat password</label>
            <input type="password" className="input-card" onChange={(e) => setPasswordVal(e.target.value)}/>
          </div>
          <button id="auth-button" onClick={createUser} className="buttonSubmit">create user</button>
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
