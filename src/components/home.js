import {React, useState} from 'react'
import { Redirect } from "react-router-dom"
import MainScreen from '../animations/MainScreen'
import Profile from './Profile'
import Landing from './landing'

import {connect} from 'react-redux'
import {loadUserData,loginFirstStage} from '../actions'

import avatar from '../assets/images/avatar.jpg'

let s = undefined;

const Home = (props) => {
  const [clickedPlace, setClickedPlace] = useState([]);
  const [elapsedTime, setElapsetTime] = useState([]);
  const [profileToggle, setProfileToggle] = useState(false);

  if(profileToggle){
    return(
      <Profile
        onReturnToMap={setProfileToggle}
      />
    );
  }
    return(
      <div className="container">
        <Instructions
          text={`Instrucciones:

            Puedes dar click en el mapa
            para obtener pistas.
            `}
        />
        <div className="container img-fluid">
          <MainScreen
            onClick={setClickedPlace}
            onTime={setElapsetTime}
          />
        </div>
        <MainPanel
          clickedPlace={clickedPlace[0]}
          clickedPos={clickedPlace[1]}
          delta={elapsedTime}
          onAvatar={setProfileToggle}
        />
      </div>
    );
}

const MainPanel = (props) => {
  const [mainPanelState, setMainPanelState] = useState(false);

  let days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  let date = new Date();
  let text = `Elapsed time ${props.delta[0]}:${props.delta[1]}:${props.delta[2]} ${days[date.getDay()]} ${date.getDate()}`;

  return(
    <div className="container">
      <TextField
        active={mainPanelState}
      />
      <div className={`container-panel-${mainPanelState}`}>
        <div className={`top-panel-${mainPanelState}`}>
          <button className="panel" onClick={()=>setMainPanelState(!mainPanelState)}></button>
          <label className="panel-text-place-label" htmlFor="place-panel">Info.</label>
          <p className="panel-text" id="place-panel">{props.clickedPlace}</p>
          <label  className="panel-text-place-label rightPanel" htmlFor="place-pos">Ubicación</label>
          <p className="panel-text panel-text-pos" id="place-pos">{props.clickedPos}</p>
        </div>
        <div className="main-panel">
          <button className="panel button-main-panel" onClick={()=>setMainPanelState(!mainPanelState)}></button>
          <p className={`panel-text panel-text-date-${mainPanelState}`}>{text}</p>
          <button className={`avatar-home-${mainPanelState}`} onClick={()=>props.onAvatar(true)}>
            <img  src={avatar} width="75px" style={{borderRadius: "50%"}} />
          </ button>
        </div>
      </div>
    </div>
  );
}

const TextField = (props) => {
  return (
    <div className="container">
      <textarea className={`command-textarea command-textarea-${props.active}`}/>
    </div>
  );
}

const Instructions = (props) => {
  return (
    <div className="container">
      <p className="p-instruct-true">{props.text}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userData: state.loadUserData
  };
}

export default connect(mapStateToProps,{loadUserData,loginFirstStage})(Home);
