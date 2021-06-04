import React, {Suspense, useEffect, useState}  from 'react';
import {connect} from 'react-redux'
import { useFirebaseApp, StorageImage, useStorage } from 'reactfire'
import PreCacheImg from 'react-precache-img'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

import '../styles/activity.scss'

import image0 from '../assets/temp/cuado-capsula.png'
import image1 from '../assets/temp/lacasa-delsilencio.png'
import image2 from '../assets/temp/lacasa-delsilencio-completa.png'
import image3 from '../assets/temp/interior-casa-indonesia.png'
import image4 from '../assets/temp/interior-casa-indonesia-completa.png'
import image5 from '../assets/temp/casa-extraterrestre-triste-completa.png'
import image6 from '../assets/temp/casa-extraterrestre-triste.png'
import image7 from '../assets/temp/casa-extraterrestre-feliz.png'

import Secuencer from '../animations/secuenciador.js'

const ActivityDisplay = (props) => {

  const [indexInit, setIndexInit] = useState(0)
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [guideMap, setGuideMap] = useState([])


  const [images,setImages] = useState([])
  const [imagesDone,setImagesDone] = useState(false)
  const [loading,setLoading] = useState(true)

  const fstore = useStorage()

  useEffect(()=>{
    // if(imagesDone && loading){
      preloadImages([image0,image1,image2,image3,image4,image5,image6,image7])
      console.log(0)
    // }
  },[])

  // useEffect(()=>{
  //   if(!imagesDone){
  //     let temp = []
  //     for(let i = 0; i < props.contentToDiplay['images'].length; i++){
  //       fstore.ref().child(props.contentToDiplay['images'][i]).getDownloadURL().then((snap)=>{
  //         temp[i] = snap
  //       })
  //     }
  //     setImages(temp)
  //     setImagesDone(true)
  //   }
  // })

  useEffect(()=>{
    if(!done){
      setIndex(props.contentToDiplay['structure']['intro']+1)
      setIndexInit(props.contentToDiplay['structure']['intro']+1)
      setDone(true)

      let temp = []
      for(let i = props.contentToDiplay['guide'].start; i <= props.contentToDiplay['guide'].end; i++){
        temp.push(i)
      }
      setGuideMap(temp)
    }
  })

  useEffect(()=>{
    let t = typeof props.contentToDiplay[index] !== 'undefined' ? props.contentToDiplay[index] : []
  })
const setAction = (val) => {
  return val < 100 ? setIndex(val) : console.log(val)
}


  const preloadImages = async (srcArray) => {
    const promises = await srcArray.map((src)=> {
      return new Promise(function (resolve,reject) {
        const img = new Image()
        img.src = src
        img.onload = resolve()
        img.onrerror = reject()
      })
    })
    await Promise.all(promises)
    setLoading(false)
  }

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
          id={b.x}
          x={b.x}
          y={b.y}
          w={b.width}
          h={b.height}
          targetIndex={b.target}
          action={setAction}
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
            content={props.contentToDiplay[index]}
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
            {props.contentToDiplay[index].appStatus &&
              <Container className="justify-content-center" style={{display:'flex'}}>
                <Secuencer/>
              </Container>
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
          <img
            className="bg-img-activity"
            src={mapVariable(props.bg)}/>
          <img
            className="frontImg-activity"
            src={mapVariable(props.front)}/>
        </>
    </>
  )
}
//style={{transform:`translate(${props.x}vw, ${props.y}vh)`, width:`${props.h}vw`,height:`${props.w}vh`}}
//
//style={{transform:`translate(15vw, -35vh)`}}
const BtnTransparent = (props) => {
  return(
    <button
      style={{transform:`translate(-20vw, -8vh)`, width:`6vw`,height:`18vh`}}
      onClick={() => props.action(props.targetIndex)}
      className="btn-glass-intro" />
  )
}

const PopupInfo = (props) => {
  return (
    <span
      style={{transform:`translate(${props.x}vw, ${props.y}vh)`}}
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

const mapVariable = (text) => {
    switch (text) {
      case 0:
        return image0
        break;
      case 1:
        return image1
        break;
      case 2:
        return image2
        break;
      case 3:
        return image3
        break;
      case 4:
        return image4
        break;
      case 5:
        return image5
        break;
      case 6:
        return image6
        break;
      case 2:
        return image7
        break;
      default:
        return
    }
}

export default connect(mapStateToProps)(ActivityDisplay);
