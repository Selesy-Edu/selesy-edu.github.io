import React, {useState} from 'react';
import p5 from 'p5';
import ReactHowler from 'react-howler'

import Img from "react-cool-img"

import audio1 from '../assets/audio/sq/1.ogg'
import audio2 from '../assets/audio/sq/2.ogg'
import audio3 from '../assets/audio/sq/3.ogg'
import audio4 from '../assets/audio/sq/4.ogg'
import audio5 from '../assets/audio/sq/5.ogg'
import audio6 from '../assets/audio/sq/6.ogg'
import audio7 from '../assets/audio/sq/7.ogg'
import audio8 from '../assets/audio/sq/8.ogg'

import img1 from '../assets/audio/tambor-icn.png'
import img2 from '../assets/audio/agua-icn.png'
import img3 from '../assets/audio/campana-icn.png'
import img4 from '../assets/audio/cadenas-icn.png'
import img5 from '../assets/audio/buda-icn.png'

import img6 from '../assets/audio/grillo-icn.png'
import img8 from '../assets/audio/extraterrestre-icn.png'
import img7 from '../assets/audio/madera-icn.png'

import { IconContext } from "react-icons"
import { FaStop } from "react-icons/fa"
import { FaPlay } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { BiShuffle } from "react-icons/bi";

import btnBG from '../assets/images/icons/fondo.png'

import {shuffle} from '../helpers.js'

import '../styles/secuenciadorOne.scss'

let s = undefined;
//secuenciador FULL

class Secuencer extends React.Component {

  state = {
    p1: false,
    p2: false,
    p3: false,
    p4: false,
    p5: false,
    p6: false,
    p7: false,
    p8: false,
    shuffled: [1,2,3,4,5,6,7,8],
    randomGrid: [1,2,3,4,5,6,7,8],
    x:0,
    y:0,
    submenu: false,
    current: -1
  }

  stopAll = () => {
    this.setState({
      p1: false
    })
  }
  setShuffled = () => {
    this.setState({shuffled:shuffle(this.state.shuffled)})
  }
  setSQ = (e) => {
    var t = this.state.shuffled
    t[this.state.current] = e+1
  }

  componentDidMount(){

    const code = (sketch) => {

      let s = []
      let sc = 2.2
      let x = [0,0,0,0,0,0,0,0]
      let y = [0,0,0,0,0,0,0,0]
      let speed = 0.25
      let image1, image2, image3, image4, image5, image6, image7, image8
      let back
      let cnvX, cnvY

      sketch.setup = () => {
        this.setState({randomGrid: shuffle(this.state.randomGrid)})
        let cnv = sketch.createCanvas(914, 400)
        cnv.parent('secuencer')
        cnv.id('secuencerCanvas')
        cnv.style('border-radius','7rem')

        image1 = sketch.loadImage(img1)
        image2 = sketch.loadImage(img2)
        image3 = sketch.loadImage(img3)
        image4 = sketch.loadImage(img4)
        image5 = sketch.loadImage(img5)
        image6 = sketch.loadImage(img6)
        image7 = sketch.loadImage(img7)
        image8 = sketch.loadImage(img8)
        cnvX = document.getElementById('secuencerCanvas').getBoundingClientRect().x
        cnvY = document.getElementById('secuencerCanvas').getBoundingClientRect().y
      }

      sketch.draw = () => {
        if(this.state.p1){
          this.setState({submenu:false})
        }
        if(!this.state.p1){
          x[0] = 0
          y[0] = 0
        }

        for(let i = 0; i < 8; i++){
          if(this.state.p1){
            x[0] = sketch.cos(sketch.radians(sketch.millis())*speed)*68*sc
            y[0] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed)*68*sc
          }
        }

        sketch.background(255,255,255,80)
        sketch.stroke(255)

        sketch.push()
        sketch.translate(sketch.width/2,sketch.height/2)
        Samp(sketch.color(107, 0,100),0,1,this.state.p1,mapImgVariable(this.state.shuffled[0]))
        sketch.pop()
      }

      const clickable = (xP,yP,xOffset,yOffset,st) => {
        if(sketch.mouseX > (xP) && sketch.mouseX < (xP)+xOffset && sketch.mouseY > (yP) && sketch.mouseY < (yP)+yOffset){
          this.setState({x:sketch.mouseX,y:sketch.mouseY})
          this.setState({submenu:true, current:st})
        }
      }

      sketch.mousePressed = () => {
        clickable(sketch.width/2-(54*sc/2),sketch.height/2-(54*sc/2),54*sc,54*sc,0)
      }

      const mapImgVariable = (text) => {
          switch (text) {
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
            case 8:
              return image8
              break;
            default:
              return
          }
      }

      const Samp = (col,pos,tempo,state,i) => {

          sketch.stroke(255)
          sketch.strokeWeight(0.2);
          sketch.fill(col)
          if(state){
            sketch.ellipse(x[pos],y[pos],20,20)
          }
          sketch.stroke(0)
          sketch.fill(sketch.lerpColor(col,sketch.color(255,255,255),0.6))
          sketch.ellipse(0,1*sc,100*sc,100*sc)
          sketch.fill(col)
          sketch.ellipse(0,1*sc,90*sc,90*sc)
          sketch.drawingContext.shadowOffsetX = 0;
          sketch.drawingContext.shadowOffsetY = 5;
          sketch.drawingContext.shadowBlur = 10;
          sketch.drawingContext.shadowColor = 'black';
          sketch.fill(64,64,115)
          sketch.ellipse(0,1*sc,54*sc,54*sc)
          sketch.drawingContext.shadowOffsetX =0;
          sketch.drawingContext.shadowOffsetY = 0;
          sketch.drawingContext.shadowBlur = 0;
          sketch.drawingContext.shadowColor = 'black';
          sketch.image(i,-25,-25,50,50)
      }
    };
    s = new p5(code,'defaultP5');
  }
  componentWillUnmount(){
    s.remove();
  }
  render(){
    return(
      <>
      <MenuGrid
          x={this.state.x}
          y={this.state.y}
          state={this.state.submenu}
          action={e => this.setSQ(e)}
         />
      <div className="music-app-panel">
        <span>
          <Img
            onClick={() => this.stopAll()}
            className="seq-main-controls"
            src={btnBG}></Img>
            <IconContext.Provider
              value={{ color: 'white', size: '30px' }}
            >
            <FaStop
              onClick={() => this.stopAll()}
              style={{display:'inline',transform:'translate(18px,-51px)' , cursor:'pointer'}}/>
            </ IconContext.Provider>
      </span>
      <span>
        <Img
          onClick={() => this.setState({p1: true})}
          className="seq-main-controls play-btn"
          src={btnBG}></Img>
          <IconContext.Provider
            value={{ color: 'white', size: '30px' }}
          >
          <FaPlay
            onClick={() => this.setState({p1: true})}
            style={{display:'inline',transform:'translate(20px,-51px)', cursor:'pointer'}}/>
          </ IconContext.Provider>
      </span>
      <span>
        <Img
          onClick={this.setShuffled}
          className="seq-main-controls random-btn"
          src={btnBG}></Img>
          <IconContext.Provider
            value={{ color: 'white', size: '30px' }}
          >
          <BiShuffle
            onClick={this.setShuffled}
            style={{display:'inline',transform:'translate(20px,-51px)', cursor:'pointer'}}/>
          </ IconContext.Provider>
      </span>
    </div>
      <div id="secuencer"></div>
        <ReactHowler
          onEnd={()=>this.setState({p1:false})}
          playing={this.state.p1}
          src={mapAudioVariable(this.state.shuffled[0])}
          ref={(ref) => (this.player1 = ref)}
        />
      </>
    );
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
      default:
        return
    }
}

const MenuGrid = (props) =>{
  return (
    <div className="menuGrid-container" style={{display: !props.state ? 'none' : '' ,transform:`translate(${props.x}px,${props.y}px)`}}>
      <div style={{display:'block'}}>
        <button
          onClick={() => props.action(0)}
          >
          <Img
            style={{width:'40px',height:'40px'}}
            src={img1} />
        </button>
        <button
          onClick={() => props.action(1)}
          >
          <Img
            style={{width:'40px',height:'40px'}}
            src={img2} />
        </button>
        <button
          onClick={() => props.action(2)}
          >
          <Img
            style={{width:'40px',height:'40px'}}
            src={img3} />
        </button>
        <button
          onClick={() => props.action(3)}
          >
          <Img
            style={{width:'40px',height:'40px'}}
            src={img4} />
        </button>
      </div>
      <div style={{display:'block'}}>
        <button
          onClick={() => props.action(4)}
          >
          <Img
            style={{width:'40px',height:'40px'}}
            src={img5} />
        </button>
        <button
          onClick={() => props.action(5)}
          >
          <Img
            style={{width:'40px',height:'40px'}}
            src={img6} />
        </button>
        <button
          onClick={() => props.action(6)}
          >
          <Img
            style={{width:'40px',height:'40px'}}
            src={img7} />
        </button>
        <button
          onClick={() => props.action(7)}
          >
          <Img
            style={{width:'40px',height:'40px'}}
            src={img8} />
        </button>
      </div>
    </div>
  )
}

export default Secuencer;
