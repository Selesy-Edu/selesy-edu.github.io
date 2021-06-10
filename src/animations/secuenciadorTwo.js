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

import '../styles/secuenciador.scss'

let s = undefined;

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

  next1 = () => {
    this.setState({p1:false,p2:true})
  }
  next2 = () => {
    this.setState({p2:false,p3:true})
  }
  next3 = () => {
    this.setState({p3:false,p4:true})
  }
  next4 = () => {
    this.setState({p4:false,p5:true})
  }
  next5 = () => {
    this.setState({p5:false,p6:true})
  }
  next6 = () => {
    this.setState({p6:false,p7:true})
  }
  next7 = () => {
    this.setState({p7:false,p8:true})
  }
  stopAll = () => {
    this.setState({
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
      p7: false,
      p8: false
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
      let sc = 1.2
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
        if(!this.state.p2){
          x[1] = 0
          y[1] = 0
        }
        if(!this.state.p3){
          x[2] = 0
          y[2] = 0
        }
        if(!this.state.p4){
          x[3] = 0
          y[3] = 0
        }
        if(!this.state.p5){
          x[4] = 0
          y[4] = 0
        }
        if(!this.state.p6){
          x[5] = 0
          y[5] = 0
        }
        if(!this.state.p7){
          x[6] = 0
          y[6] = 0
        }
        if(!this.state.p8){
          x[7] = 0
          y[7] = 0
        }
        for(let i = 0; i < 8; i++){
          if(this.state.p1){
            x[0] = sketch.cos(sketch.radians(sketch.millis())*speed)*68*sc
            y[0] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed)*68*sc
          }
          if(this.state.p2){
            x[1] = sketch.cos(sketch.radians(sketch.millis())*speed)*68*sc
            y[1] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed)*68*sc
          }
          if(this.state.p3){
            x[2] = sketch.cos(sketch.radians(sketch.millis())*speed)*68*sc
            y[2] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed)*68*sc
          }
          if(this.state.p4){
            x[3] = sketch.cos(sketch.radians(sketch.millis())*speed)*68*sc
            y[3] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed)*68*sc
          }
          if(this.state.p5){
            x[4] = sketch.cos(sketch.radians(sketch.millis())*speed)*68*sc
            y[4] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed)*68*sc
          }
          if(this.state.p6){
            x[5] = sketch.cos(sketch.radians(sketch.millis())*speed)*68*sc
            y[5] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed)*68*sc
          }
          if(this.state.p7){
            x[6] = sketch.cos(sketch.radians(sketch.millis())*speed)*68*sc
            y[6] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed)*68*sc
          }
          if(this.state.p8){
            x[7] = sketch.cos(sketch.radians(sketch.millis())*speed)*68*sc
            y[7] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed)*68*sc
          }
        }

        sketch.background(255,255,255,80)
        sketch.stroke(255)

        sketch.push()
        sketch.translate(100,98)
        Samp(sketch.color(107, 0,100),0,1,this.state.p1,mapImgVariable(this.state.shuffled[0]))
        sketch.pop()
        sketch.push()
        sketch.translate(340,98)
        Samp(sketch.color(65, 72, 218),1,1,this.state.p2,mapImgVariable(this.state.shuffled[1]))
        sketch.pop()
        sketch.push()
        sketch.translate(580,98)
        Samp(sketch.color(65, 202, 218),2,1,this.state.p3,mapImgVariable(this.state.shuffled[2]))
        sketch.pop()
        sketch.push()
        sketch.translate(820,98)
        Samp(sketch.color(98, 218, 65),3,1,this.state.p4,mapImgVariable(this.state.shuffled[3]))
        sketch.pop()
        sketch.push()
        sketch.translate(100,300)
        Samp(sketch.color(255, 255, 0),4,1,this.state.p5,mapImgVariable(this.state.shuffled[4]))
        sketch.pop()
        sketch.push()
        sketch.translate(340,300)
        Samp(sketch.color(255, 110, 2),5,1,this.state.p6,mapImgVariable(this.state.shuffled[5]))
        sketch.pop()
        sketch.push()
        sketch.translate(580,300)
        Samp(sketch.color(225, 0, 25),6,1,this.state.p7,mapImgVariable(this.state.shuffled[6]))
        sketch.pop()
        sketch.push()
        sketch.translate(820,300)
        Samp(sketch.color(176, 65, 218),7,1,this.state.p8,mapImgVariable(this.state.shuffled[7]))
        sketch.pop()
        sketch.fill(255,0,0)
        // sketch.rect(100-(54*sc/2),98-(54*sc/2),54*sc,54*sc)
      }

      const clickable = (xP,yP,xOffset,yOffset,st) => {
        if(sketch.mouseX > (xP) && sketch.mouseX < (xP)+xOffset && sketch.mouseY > (yP) && sketch.mouseY < (yP)+yOffset){
          this.setState({x:sketch.mouseX,y:sketch.mouseY})
          this.setState({submenu:true, current:st})
        }
      }

      sketch.mousePressed = () => {
        clickable(100-(54*sc/2),98-(54*sc/2),54*sc,54*sc,0)
        clickable(340-(54*sc/2),98-(54*sc/2),54*sc,54*sc,1)
        clickable(580-(54*sc/2),98-(54*sc/2),54*sc,54*sc,2)
        clickable(820-(54*sc/2),98-(54*sc/2),54*sc,54*sc,3)
        clickable(100-(54*sc/2),300-(54*sc/2),54*sc,54*sc,4)
        clickable(340-(54*sc/2),300-(54*sc/2),54*sc,54*sc,5)
        clickable(580-(54*sc/2),300-(54*sc/2),54*sc,54*sc,6)
        clickable(820-(54*sc/2),300-(54*sc/2),54*sc,54*sc,7)
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
          onEnd={() => this.next1()}
          playing={this.state.p1}
          src={mapAudioVariable(this.state.shuffled[0])}
          ref={(ref) => (this.player1 = ref)}
        />
        <ReactHowler
          onEnd={() => this.next2()}
          playing={this.state.p2}
          src={mapAudioVariable(this.state.shuffled[1])}
          ref={(ref) => (this.player2 = ref)}
        />
        <ReactHowler
          onEnd={() => this.next3()}
          playing={this.state.p3}
          src={mapAudioVariable(this.state.shuffled[2])}
          ref={(ref) => (this.player3 = ref)}
        />
      <ReactHowler
          onEnd={() => this.next4()}
          playing={this.state.p4}
          src={mapAudioVariable(this.state.shuffled[3])}
          ref={(ref) => (this.player4 = ref)}
        />
        <ReactHowler
          onEnd={() => this.next5()}
          playing={this.state.p5}
          src={mapAudioVariable(this.state.shuffled[4])}
          ref={(ref) => (this.player5 = ref)}
        />
        <ReactHowler
          onEnd={() => this.next6()}
          playing={this.state.p6}
          src={mapAudioVariable(this.state.shuffled[5])}
          ref={(ref) => (this.player6 = ref)}
        />
        <ReactHowler
          onEnd={() => this.next7()}
          playing={this.state.p7}
          src={mapAudioVariable(this.state.shuffled[6])}
          ref={(ref) => (this.player7 = ref)}
        />
        <ReactHowler
          playing={this.state.p8}
          onEnd={() => this.setState({p8:false})}
          src={mapAudioVariable(this.state.shuffled[7])}
          ref={(ref) => (this.player8 = ref)}
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
