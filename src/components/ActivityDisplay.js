import React, {useEffect, useState}  from 'react';
import {connect} from 'react-redux'
import { useFirebaseApp, StorageImage } from 'reactfire'

import Container from 'react-bootstrap/Container'
import '../styles/activity.scss'

const ActivityDisplay = (props) => {

  const [indexInit, setIndexInit] = useState(0)
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(()=>{
    setIndex(props.contentToDiplay['structure']['intro']+1)
    setIndexInit(props.contentToDiplay['structure']['intro']+1)
    setDone(true)
  },[])

  const Bubbles = done
  ?  props.contentToDiplay[index]['bubbles'].map((b)=>{
      return (
        <PopupInfo
          text={b.text}
          x={b.x}
          y={b.y}
          />
      )
    })
  : null

  const Buttons = done
  ?  props.contentToDiplay[index]['btns'].map((b)=>{
      return (
        <BtnTransparent
          x={b.x}
          y={b.y}
          w={b.width}
          h={b.height}
          setIndex={setIndex}
          />
      )
    })
  : null

  return(
    <>
    {done &&
      <ActivityTemplate
        bg={props.contentToDiplay[index].imgPathBG}
        front={props.contentToDiplay[index].imgPath}
        setIndex={setIndex}
        index={index}
        >
        {Bubbles}
        {Buttons}
      </ActivityTemplate>
    }
    </>
  )
}

const ActivityTemplate = (props) => {
  return(
    <>
      <div className="container-glass-full"></div>
        <>
        {props.children}
        <StorageImage
            storagePath={props.bg}
            style={{width:'100%', left:'0%',top:'0%',position:'absolute',zIndex:'-1000',overflow:'hidden'}}
            />
        <StorageImage
          storagePath={props.front}
          className="frontImg-activity"
          />
        </>
    </>
  )
}

const BtnTransparent = (props) => {
  return(
    <button
      style={{transform:`translate(${props.x}px, ${props.y}px)`, height:`${props.h}px`,width:`${props.w}px`}}
      onClick={() => props.setIndex(props.index + 1)}
      className="btn-glass-intro" />
  )
}



const PopupInfo = (props) => {
  return (
    <span
      style={{transform:`translate(${props.x}px, ${props.y}px)`}}
      className="bubble-info">{props.text}</span>
  )
}

const mapStateToProps = (state) => {
  return {
    contentToDiplay: state.loadContent,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(ActivityDisplay);
