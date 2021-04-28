import React from 'react'
import Profile from './Profile'
import Container from 'react-bootstrap/Container'
import Img from "react-cool-img";

import fondo from '../assets/images/pixelapp/fondo-colors.png'

const MainProfile = () => {
  return (
    <Container fluid>
      <Container className="justify-content-center container-center-flex">
        <Img style={{width:"60%",height:'100vh'}} src={fondo}/>
        <Profile />
      </Container>
    </Container>
  )
}

export default MainProfile