import React, {useEffect, useState}  from 'react';
import {connect} from 'react-redux'

import Img from "react-cool-img";
import Container from 'react-bootstrap/Container'
import { ReactSVG } from 'react-svg'
import { ReactFitty } from "react-fitty";
import AudioReader from './AudioReader'

import CDialogo from '../assets/images/content/CuadroDialogo.png'

import next from '../assets/images/icons/next.svg'
import back from '../assets/images/icons/back.svg'
import button from '../assets/images/icons/fondo.png'

import audio1 from '../assets/audio/1.1-1.ogg'
import audio2 from '../assets/audio/1.1-2.ogg'
import audio3 from '../assets/audio/1.1-3.ogg'
import audio4 from '../assets/audio/1.1-4.ogg'

const ContentDisplay = (props) => {
  const [index, setIndex] = useState(0)
  const [inputText, setInputText] = useState('')
  const [guideMap, setGuideMap] = useState([])
  const [doneLoading, setDoneLoading] = useState(false)

  const checkInput = (text) => {
    const posible = ['COMO','CÓMO','¿COMO','¿CÓMO','PUEDO','AYUDAR','AYUDAR?']
    let counter = 0;
    for (let word of text.toUpperCase().split(' ')){
      if(posible.includes(word)){
        counter++;
      }
    }
    if(counter === 3){
      setIndex(1)
    }
  }

  const setIndexUp = () => {
    setIndex(index+1)
  }
  const setIndexDown = () => {
    setIndex(index-1)
  }

  useEffect(()=>{
    if(typeof props.contentToDiplay['structure'] !== 'undefined'){
      let temp = []
      for(let i = 0; i < props.contentToDiplay['structure']['intro']; i++){
        temp.push(i)
      }
      setGuideMap(temp)
      setDoneLoading(true)
    }
  },[props.contentToDiplay['structure']])

  useEffect(()=>{
    const timer = setTimeout(() => {
      checkInput(inputText)
    }, 3000);
    return () => clearTimeout(timer);
  },[inputText])

  useEffect(()=>{
    if(typeof props.contentToDiplay['structure'] !== 'undefined'){
      if(index > props.contentToDiplay['structure']['intro']){
        props.setSetContentActive(false)
      }
    }
  })

  const guide = guideMap.map((val,i) => {
      if(i !== index-1){
        return(
            <button
              onClick={()=> setIndex(i+1)}
              className="btn-guide-content"></button>
          )
      }
      return(
          <button className="btn-guide-content-active"></button>
        )
    })

  return(
      <>
        {index === 0 &&
          <ContainerBack>
            <Intro
              setInputText={setInputText}
              nick={props.userInfo.info.nick}
              audio={audio1}
              index={index}
            />
          </ContainerBack>
        }
        {doneLoading && index >= 1 && index <= props.contentToDiplay['structure']['intro'] &&
          <ContainerBack>
            <TxtAlone
              text={props.contentToDiplay[index].mainText}
              offsets={[20.0,120.0,230.0,1000.0,1150.0,1230.0,2000.0,2100.0,2180.0,3240.0]}
              audio={audio2}
              index={index}
              setIndexUp={setIndexUp}
              setIndexDown={setIndexDown}
            />
          <span className="container-btn-guide" style={{transform:`translate(-${props.contentToDiplay['structure']['intro'] * 12}px,0px)`}}>
              <div style={{display:'flex'}}>
                {guide}
              </div>
            </span>
          </ContainerBack>
        }
      </>
  )
}

const ContainerBack = (props) => {
  return (
    <div className="container-text-background">
      <Img src={CDialogo} className="img-text-background" />
      {props.children}
    </div>
  )
}

const Intro = (props) => {
  return(
    <>
      <p className="p-content-main">
        {props.nick}
        <br />
          <TxtAlone
            text={'¡El mundo te necesita!'}
            offsets={[40.0,242.0,552.0,900.0,1200.0]}
            audio={props.audio}
            index={props.index}
          />
      </p>
      <input
        onChange={e => props.setInputText(e.target.value)}
        className="input-content-enter"
        type="text"/>
    </>
  )
}

const TxtAlone = (props) => {
  return(
    <>
    <div className="p-content-main" id="main-container-text">
      <AudioReader
        text={props.text}
        offsets={props.offsets}
        audio={props.audio}
        />
    </div>

      {props.index > 1 &&
        <button
          onClick={()=>props.setIndexDown()}
          className="button-pages bt-back">
          <Img src={button} style={{width:'3rem'}}/>
          <ReactSVG className="center-icons-tn" src={back}/>
        </button>
      }
      {props.index !== 0 &&
        <button
          onClick={()=>props.setIndexUp()}
          className="button-pages bt-next">
          <Img src={button} style={{width:'3rem',display:'inline'}}/>
          <ReactSVG className="center-icons-tn" src={next}/>
        </button>
      }
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    contentToDiplay: state.loadContent,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(ContentDisplay);
