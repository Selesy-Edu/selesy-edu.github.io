import React, {Suspense, useEffect, useState}  from 'react';
import {connect} from 'react-redux'
import { useFirebaseApp, StorageImage, useStorage } from 'reactfire'
import PreCacheImg from 'react-precache-img'
import ReactHowler from 'react-howler'

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

import audio1 from '../assets/audio/1.1.1-1.ogg'
import audio2 from '../assets/audio/1.1.1-2.ogg'
import audio3 from '../assets/audio/1.1.1-3.ogg'
import audio4 from '../assets/audio/1.1.1-4.ogg'
import audio5 from '../assets/audio/1.1.1-5.ogg'
import audio6 from '../assets/audio/1.1.1-6.ogg'
import audio7 from '../assets/audio/1.1.1-7.ogg'
import audio8 from '../assets/audio/1.1.1-8.ogg'
import audio9 from '../assets/audio/1.1.1-9.ogg'
import audio10 from '../assets/audio/1.1.1-10.ogg'
import audio11 from '../assets/audio/1.1.1-11.ogg'

import a1 from '../assets/audio/sq/1.ogg'
import a2 from '../assets/audio/sq/2.ogg'
import a3 from '../assets/audio/sq/3.ogg'
import a4 from '../assets/audio/sq/4.ogg'
import a5 from '../assets/audio/sq/5.ogg'
import a6 from '../assets/audio/sq/6.ogg'
import a7 from '../assets/audio/sq/7.ogg'
import a8 from '../assets/audio/sq/8.ogg'

import Secuencer from '../animations/secuenciador.js'
import SecuencerOne from '../animations/secuenciadorOne.js'
import SecuencerTwo from '../animations/secuenciadorTwo.js'
import AudioReader from './AudioReader'

import Img from "react-cool-img"
import { ReactSVG } from 'react-svg'
import next from '../assets/images/icons/next.svg'
import back from '../assets/images/icons/back.svg'
import button from '../assets/images/icons/fondo.png'

const ActivityDisplay = (props) => {

  const [indexInit, setIndexInit] = useState(0)
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [guideMap, setGuideMap] = useState([])
  const [playAudio, setPlayAudio] = useState(false)
  const [toPlay, setToPlay] = useState(100)

  const [images,setImages] = useState([])
  const [imagesDone,setImagesDone] = useState(false)
  const [loading,setLoading] = useState(true)

  const fstore = useStorage()

  useEffect(()=>{
    // if(imagesDone && loading){
      preloadImages([image0,image1,image2,image3,image4,image5,image6,image7])
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

  const previewSound = (val) => {
    setPlayAudio(true)
    setToPlay(val)
    console.log(val)
  }

  const setAction = (val) => {
    return val < 100 ? setIndex(val) : previewSound(val)
  }

  const setIndexUp = () => {
    setIndex(index + 1)
  }
  const setIndexDown = () => {
    setIndex(index - 1)
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
        <ReactHowler
          onEnd={()=>setPlayAudio(false)}
          playing={playAudio}
          src={mapSoundVariable(toPlay)}
        />
          <ActivityTemplate
            content={props.contentToDiplay[index]}
            bg={props.contentToDiplay[index].imgPathBG}
            front={props.contentToDiplay[index].imgPath}
            setIndex={setIndex}
            index={index}
            setIndexDown={setIndexDown}
            setIndexUp={setIndexUp}
            start={props.contentToDiplay['guide'].start}
            end={props.contentToDiplay['guide'].end}
            hideGuide={props.contentToDiplay[index].hideGuide}
            >
            {Bubbles}
            {Buttons}
            {props.contentToDiplay[index].mainTextStatus &&
              <Text
                mainText={props.contentToDiplay[index].mainText}
                audio={mapAudioVariable(props.contentToDiplay[index].audio)}
                offsets={parseOffsets(props.contentToDiplay[index].offsets)}
                />
            }
            {props.contentToDiplay[index].appStatus &&
              <Container className="justify-content-center" style={{display:'flex'}}>
                {props.contentToDiplay[index].app === 1 &&
                  <SecuencerOne/>
                }
                {props.contentToDiplay[index].app === 2 &&
                  <SecuencerTwo/>
                }
                {props.contentToDiplay[index].app === 3 &&
                  <Secuencer/>
                }
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
      {props.index >= props.start && !props.hideGuide &&
        <>
        {props.index > props.start &&
          <button
            onClick={()=>props.setIndexDown()}
            className="button-pages bt-back-activity">
            <Img src={button} style={{width:'3rem'}}/>
            <ReactSVG className="center-icons-tn" src={back}/>
          </button>
        }
        {props.index < props.end &&
          <button
            onClick={()=>props.setIndexUp()}
            className="button-pages bt-next-activity">
            <Img src={button} style={{width:'3rem',display:'inline'}}/>
            <ReactSVG className="center-icons-tn" src={next}/>
          </button>
        }
        </>
      }
    </>
  )
}
//
//style={{transform:`translate(15vw, -2vh)`, width:`1.3vw`,height:`14vh`}}
//style={{transform:`translate(5vw, -32vh)`}}
const BtnTransparent = (props) => {
  return(
    <button
      style={{transform:`translate(${props.x}vw, ${props.y}vh)`, width:`${props.w}vw`,height:`${props.h}vh`}}
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
    <div id="main-container-text" className="p-content-main">
      {/*<p className="p-mainText-activity">{props.mainText}</p>*/}
      <AudioReader
        text={props.mainText}
        offsets={props.offsets}
        audio={props.audio}
        />
    </div>
  )
}

const parseOffsets = (ofs) => {
  let array = []
  let t = ofs.split(',')
  t.map((o)=>{
    array.push(parseFloat(o))
  })
  return array
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
      case 7:
        return image7
        break;
      default:
        return
    }
}

const mapAudioVariable = (text) => {
    switch (text) {
      case 1:
        return audio1
        break;
      case 2:
        return audio2
        break;
      case 3:
        return audio3
        break;
      case 4:
        return audio4
        break;
      case 5:
        return audio5
        break;
      case 6:
        return audio6
        break;
      case 7:
        return audio7
        break;
      case 8:
        return audio8
        break;
      case 9:
        return audio9
        break;
      case 10:
        return audio10
        break;
      case 0:
        return audio11
        break;
      default:
        return
    }
}

const mapSoundVariable = (text) => {
    switch (text) {
      case 100:
        return a1
        break;
      case 101:
        return a6
        break;
      case 102:
        return a3
        break;
      case 103:
        return a3
        break;
      case 104:
        return a5
        break;
      case 105:
        return a2
        break;
      case 106:
        return a7
        break;
      case 107:
        return a8
        break;
      case 108:
        return a4
        break;
      default:
        return
    }
}

export default connect(mapStateToProps)(ActivityDisplay);
