import React from 'react';
import p5 from 'p5';
import ReactHowler from 'react-howler'

import audio1 from '../assets/audio/sq/1.ogg'
import audio2 from '../assets/audio/sq/2.ogg'
import audio3 from '../assets/audio/sq/3.ogg'
import audio4 from '../assets/audio/sq/4.ogg'
import audio5 from '../assets/audio/sq/5.ogg'
import audio6 from '../assets/audio/sq/6.ogg'
import audio7 from '../assets/audio/sq/7.ogg'
import audio8 from '../assets/audio/sq/8.ogg'

import playBtn from '../assets/images/audioapp/boton-play.png'
import stopBtn from '../assets/images/audioapp/boton-stop.png'

let s = undefined;

class Secuencer extends React.Component {

  componentDidMount(){

    const code = (sketch) => {

      let s = []
      let sc = 1.2
      let x = [0,0,0,0,0,0,0,0]
      let y = [0,0,0,0,0,0,0,0]
      let speed = [0.25,0.25,0.25,0.25,0.25,0.25,0.25,0.25]
      let vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8
      let btnP, btnS
      let back

      sketch.setup = () => {
        let cnv = sketch.createCanvas(914, 460)
        cnv.parent('secuencer')
        cnv.style('border-radius','7rem')
        vol1 = sketch.createSlider(0, 255, 125)
        vol1.position(36, 230)
        vol2 = sketch.createSlider(0, 255, 125)
        vol2.position(278, 230)
        vol3 = sketch.createSlider(0, 255, 125)
        vol3.position(520, 230)
        vol4 = sketch.createSlider(0, 255, 125)
        vol4.position(760, 230)
        vol5 = sketch.createSlider(0, 255, 125)
        vol5.position(36, 480)
        vol6 = sketch.createSlider(0, 255, 125)
        vol6.position(278, 480)
        vol7 = sketch.createSlider(0, 255, 125)
        vol7.position(520, 480)
        vol8 = sketch.createSlider(0, 255, 125)
        vol8.position(760, 480)

        btnP = sketch.loadImage(playBtn)
        btnS = sketch.loadImage(stopBtn)
      }

      sketch.draw = () => {
        this.player1.howler.volume(sketch.map(vol1.value(),0,255,0,1))
        this.player2.howler.volume(sketch.map(vol2.value(),0,255,0,1))
        this.player3.howler.volume(sketch.map(vol3.value(),0,255,0,1))
        this.player4.howler.volume(sketch.map(vol4.value(),0,255,0,1))
        this.player5.howler.volume(sketch.map(vol5.value(),0,255,0,1))
        this.player6.howler.volume(sketch.map(vol6.value(),0,255,0,1))
        this.player7.howler.volume(sketch.map(vol7.value(),0,255,0,1))
        this.player8.howler.volume(sketch.map(vol8.value(),0,255,0,1))

        for(let i = 0; i < 8; i++){
          x[i] = sketch.cos(sketch.radians(sketch.millis())*speed[i])*68*sc
          y[i] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed[i])*68*sc
        }
        if(y[0] > -2 && y[0] < 2 && x[0] > 0){
          this.player1.howler.play()
        }
        if(y[1] > -4 && y[1] < 4 && x[1] > 0){
          this.player2.howler.play()
        }
        if(y[2] > -4 && y[2] < 4 && x[2] > 0){
          this.player3.howler.play()
        }
        if(y[3] > -4 && y[3] < 4 && x[3] > 0){
          this.player4.howler.play()
        }
        if(y[4] > -4 && y[4] < 4 && x[4] > 0){
          this.player5.howler.play()
        }
        if(y[5] > -4 && y[5] < 4 && x[5] > 0){
          this.player6.howler.play()
        }
        if(y[6] > -4 && y[6] < 4 && x[6] > 0){
          this.player7.howler.play()
        }
        if(y[7] > -4 && y[7] < 4 && x[7] > 0){
          this.player8.howler.play()
        }

        sketch.background(250,222,159,40)
        sketch.stroke(255)

        sketch.push()
        sketch.translate(100,100)
        Samp(sketch.color(107, 0,100),0,1,'tambor')
        sketch.pop()
        sketch.push()
        sketch.translate(340,100)
        Samp(sketch.color(65, 72, 218),1,1,'agua')
        sketch.pop()
        sketch.push()
        sketch.translate(580,100)
        Samp(sketch.color(65, 202, 218),2,1,'metal')
        sketch.pop()
        sketch.push()
        sketch.translate(820,100)
        Samp(sketch.color(98, 218, 65),3,1,'cadena')
        sketch.pop()
        sketch.push()
        sketch.translate(100,350)
        Samp(sketch.color(255, 255, 0),4,1,'buda')
        sketch.pop()
        sketch.push()
        sketch.translate(340,350)
        Samp(sketch.color(255, 110, 2),5,1,'grillo')
        sketch.pop()
        sketch.push()
        sketch.translate(580,350)
        Samp(sketch.color(225, 0, 25),6,1,'madera')
        sketch.pop()
        sketch.push()
        sketch.translate(820,350)
        Samp(sketch.color(176, 65, 218),7,1,'grito')
        sketch.pop()

      }

      const Samp = (col,pos,tempo,audio) => {

          sketch.stroke(255)
          sketch.strokeWeight(0.2);
          sketch.fill(col)
          sketch.ellipse(x[pos],y[pos],20,20)
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
          sketch.image(btnP,-8,13,17,17)
          sketch.fill(200)
          sketch.rect(-18,-7,38,16)
          sketch.ellipse(1,-19,16,16)
          sketch.fill(0)
          sketch.text(tempo,-3,-14)
          sketch.textSize(10)
          sketch.text(audio,-16,5)

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
      <div id="secuencer"></div>
        <ReactHowler
          src={audio1}
          ref={(ref) => (this.player1 = ref)}
        />
        <ReactHowler
          src={audio2}
          ref={(ref) => (this.player2 = ref)}
        />
        <ReactHowler
          src={audio3}
          ref={(ref) => (this.player3 = ref)}
        />
        <ReactHowler
          src={audio4}
          ref={(ref) => (this.player4 = ref)}
        />
        <ReactHowler
          src={audio5}
          ref={(ref) => (this.player5 = ref)}
        />
        <ReactHowler
          src={audio6}
          ref={(ref) => (this.player6 = ref)}
        />
        <ReactHowler
          src={audio7}
          ref={(ref) => (this.player7 = ref)}
        />
        <ReactHowler
          src={audio8}
          ref={(ref) => (this.player8 = ref)}
        />
      </>
    );
  }
}

export default Secuencer;
