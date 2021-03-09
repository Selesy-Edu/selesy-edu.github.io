import React, {useState, useEffect} from 'react'
import Landing from './landing'
import 'firebase/auth'
import { useFirebaseApp} from 'reactfire'
import {connect} from 'react-redux'

import {loadUserData,loginFirstStage, userRollPass} from '../actions'

const SignOut = (props) => {
  const firebase = useFirebaseApp();

  const signOutFB = async () =>{
    await firebase.auth().signOut().then(
      () => {
        props.loginFirstStage(false);
        props.loadUserData({});
        props.userRollPass(null);
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

export default connect(mapStateToProps,{loadUserData,loginFirstStage, userRollPass})(SignOut);
