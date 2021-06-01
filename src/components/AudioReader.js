import React, {useState, useEffect} from 'react';
import { IconContext } from "react-icons";
// import {useStorage} from 'reactfire'
import button from '../assets/images/icons/fondo.png'
import { ReactSVG } from 'react-svg'
import Img from "react-cool-img"
import next from '../assets/images/icons/next.svg'
import { BsFillVolumeUpFill } from "react-icons/bs";

import Readalong from '../animations/readalong.js'

const AudioReader = (props) => {
  const [player, setPlay] = useState(false)
  const [url, setUrl] = useState('')

  // const storageRef = useStorage().ref()

  // useEffect(()=>{
  //   storageRef.child(props.audio).getDownloadURL().then((url)=>{
  //     setUrl(url)
  //   })
  // },[])

  return(
    <button
      onClick={() => setPlay(true)}
      className="button-pages btn-audioReader">
      <Img src={button} style={{width:'3rem',display:'inline'}}/>
      <IconContext.Provider
        value={{ color: 'white', size: '30px' }}
      >
        <BsFillVolumeUpFill className="center-icons-c"/>
      </IconContext.Provider >
      <Readalong
        play={player}
        text={props.text}
        offsets={props.offsets}
        audio={props.audio}
        setPlay={setPlay}
      />
    </button>
  )
}

export default AudioReader;
