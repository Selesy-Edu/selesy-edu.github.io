import React, {Suspense, useEffect, useState}  from 'react';
import {connect} from 'react-redux'
import { useFirebaseApp, StorageImage } from 'reactfire'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import '../styles/activity.scss'

const ActivityDisplay = (props) => {

  const [indexInit, setIndexInit] = useState(0)
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [guideMap, setGuideMap] = useState([])


  useEffect(()=>{
    setIndex(props.contentToDiplay['structure']['intro']+1)
    setIndexInit(props.contentToDiplay['structure']['intro']+1)
    setDone(true)

    let temp = []
    for(let i = props.contentToDiplay['guide'].start; i <= props.contentToDiplay['guide'].end; i++){
      temp.push(i)
    }
    setGuideMap(temp)

  },[])


  const Guide = guideMap.map((val,i) => {
      if(i !== (index-props.contentToDiplay['guide'].start)){
        return(
            <button
              onClick={() => setIndex(props.contentToDiplay['guide'].start + i)}
              className="btn-guide-content"></button>
          )
      }
      return(
          <button className="btn-guide-content-active"></button>
        )
    })

  const Bubbles = done && props.contentToDiplay[index]['bubblesState']
  ?  props.contentToDiplay[index]['bubbles'].map((b)=>{
      return (
        <PopupInfo
          id={b.text}
          text={b.text}
          x={b.x}
          y={b.y}
          />
      )
    })
  : null

  const Buttons = done && props.contentToDiplay[index]['btnsState']
  ?  props.contentToDiplay[index]['btns'].map((b)=>{
      return (
        <BtnTransparent
          x={b.x}
          y={b.y}
          w={b.width}
          h={b.height}
          targetIndex={b.target}
          setIndex={setIndex}
          />
      )
    })
  : null

  return(
    <>
    {done &&
      <>
      <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <ActivityTemplate
        bg={props.contentToDiplay[index].imgPathBG}
        front={props.contentToDiplay[index].imgPath}
        setIndex={setIndex}
        index={index}
        >
        {Bubbles}
        {Buttons}
        {props.contentToDiplay[index].mainTextStatus &&
          <Text
            mainText={props.contentToDiplay[index].mainText}
            />
        }
        {index >= props.contentToDiplay['guide'].start &&
          <span className="container-btn-guide-activity" style={{transform:`translate(-${guideMap.length * 16}px,200px)`}}>
              <div style={{display:'flex'}}>
                {Guide}
              </div>
          </span>
        }
      </ActivityTemplate>
    </Suspense>
      </>
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
          className="bg-img-activity"
            storagePath={props.bg}
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
      onClick={() => props.setIndex(props.targetIndex)}
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

const Text = (props) => {
  return (
    <Container className="container-mainText-activity">
      <p className="p-mainText-activity">{props.mainText}</p>
    </Container>
  )
}


const mapStateToProps = (state) => {
  return {
    contentToDiplay: state.loadContent,
    userInfo: state.loadUserInfo
  };
}

export default connect(mapStateToProps)(ActivityDisplay);
