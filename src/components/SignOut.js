import React, {useState, useEffect} from 'react'
import 'firebase/auth'
import { useFirebaseApp} from 'reactfire'
import {connect} from 'react-redux'

import {loadUserData,loginFirstStage} from '../actions'

const SignOut = (props) => {
  const firebase = useFirebaseApp();

  const signOutFB = async () =>{
    await firebase.auth().signOut().then(
      () => {
        props.loginFirstStage(false);
        window.open("http://www.selecu.net","_self");
      }
    );
  }
  return (
    <button
      id="signout-button"
      onClick={signOutFB}
      className="buttonSubmit"
      >sign out
    </button>
  );
}

const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData,loginFirstStage})(SignOut);
