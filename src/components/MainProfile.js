import React from 'react'
import Profile from './Profile'
import Container from 'react-bootstrap/Container'
import Img from "react-cool-img";

import fondo from '../assets/images/pixelapp/fondo-colors.png'

const MainProfile = (props) => {
  return (
    <Container className="bg-img-main" fluid
      style={{backgroundImage: `url(${fondo})`,position:'absolute', zIndex:'1000'}}>
        <Profile
          updateState={props.updateState}
          setUpdateState={props.setUpdateState}
          />
    </Container>
  )
}

export default MainProfile
