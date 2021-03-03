import React, {useState} from 'react';
import {connect} from 'react-redux'

import Auth from './Auth'

const grades = ['Tercero','Cuarto'];

const Login = (props) => {

  if(!props){
    return (
      <div>
        <Auth
          roll={`Login - Resolviste el acertijo de: ${grades[props.userRoll]}`}
          admin={false}
         />
      </div>
    );
  }
  return (
    <div>
    <Auth
      roll={props.name}
      admin={false}
     />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userRoll: state.userRollPass,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps)(Login);
