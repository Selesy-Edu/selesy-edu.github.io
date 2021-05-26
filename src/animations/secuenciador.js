import React from 'react';
import p5 from 'p5';
import ReactHowler from 'react-howler'

import audio1 from '../assets/audio/sq/1.wav'
import audio2 from '../assets/audio/sq/2.wav'
import audio3 from '../assets/audio/sq/3.wav'
import audio4 from '../assets/audio/sq/4.wav'
import audio5 from '../assets/audio/sq/5.wav'
import audio6 from '../assets/audio/sq/6.wav'
import audio7 from '../assets/audio/sq/7.wav'
import audio8 from '../assets/audio/sq/8.wav'

let s = undefined;

class Secuencer extends React.Component {

  state = {
    play1: false,
    play2: false,
    play3: false,
    play4: false,
    play5: false,
    play6: false,
    play7: false,
    play8: false
  }

  componentDidMount(){

    const code = (sketch) => {

      let s = []
      let sc = 1
      let x = [0,0,0,0,0,0,0,0]
      let y = [0,0,0,0,0,0,0,0]
      let speed = [0.2,0.4,0.1,1,1,1,1,1]

      sketch.setup = () => {

        let cnv = sketch.createCanvas(800, 600);
        cnv.parent('secuencer')
      }

      sketch.draw = () => {

        for(let i = 0; i < 8; i++){
          x[i] = sketch.cos(sketch.radians(sketch.millis())*speed[i])*58*sc
          y[i] = 1*sc+sketch.sin(sketch.radians(sketch.millis())*speed[i])*58*sc
        }
        if(y[0] > -2 && y[0] < 2 && x[0] > 0){
          this.setState({play1:true})
        }
        if(y[1] > -4 && y[1] < 4 && x[1] > 0){
          this.setState({play2:true})
        }
        if(y[2] > -4 && y[2] < 4 && x[2] > 0){
          this.setState({play3:true})
        }

        sketch.background(255,255,255,30)
        sketch.stroke(255)

        sketch.push()
        sketch.translate(100,100)
        Samp(sketch.color(107, 0,100),0)
        sketch.pop()
        sketch.push()
        sketch.translate(240,100)
        Samp(sketch.color(65, 72, 218),1)
        sketch.pop()
        sketch.push()
        sketch.translate(380,100)
        Samp(sketch.color(98, 218, 65),2)
        sketch.pop()
        // sketch.push()
        // sketch.translate(240,100)
        // Samp(sketch.color(65, 72, 218,100),0.4,2,sc)
        // sketch.pop()
        // sketch.push()
        // sketch.translate(380,100)
        // Samp(sketch.color(65, 202, 218,100),0.05,3,sc)
        // sketch.pop()
        // Samp(sketch.color(98, 218, 65,100),0.8,4,sc)

        // sketch.push()
        // sketch.translate(-540,160)
        // Samp(sketch.color(255, 255, 0,100),1.6,5,sc)
        // Samp(sketch.color(255, 110, 2,100),0.3,6,sc)
        // Samp(sketch.color(225, 0, 25,100),0.7,7,sc)
        // Samp(sketch.color(176, 65, 218,100),0.5,8,sc)
        // sketch.pop()
      }

      const Samp = (col,pos) => {

          sketch.stroke(255)
          sketch.strokeWeight(0.2);
          sketch.fill(col)
          sketch.ellipse(x[pos],y[pos],20,20)
          sketch.stroke(0)
          sketch.fill(sketch.lerpColor(col,sketch.color(255,255,255),0.6))
          sketch.ellipse(0,1*sc,80*sc,80*sc)
          sketch.fill(col)
          sketch.ellipse(0,1*sc,70*sc,70*sc)
          sketch.drawingContext.shadowOffsetX = 5;
          sketch.drawingContext.shadowOffsetY = 5;
          sketch.drawingContext.shadowBlur = 10;
          sketch.drawingContext.shadowColor = 'black';
          sketch.fill(col)
          sketch.ellipse(0,1*sc,44*sc,44*sc)
          sketch.drawingContext.shadowOffsetX =0;
          sketch.drawingContext.shadowOffsetY = 0;
          sketch.drawingContext.shadowBlur = 0;
          sketch.drawingContext.shadowColor = 'black';


          // if(pos === 2 && y > -2 && y < 2 && x > 0){
          //   this.setState({play2:true})
          // }
          // if(pos === 3 && y > -2 && y < 2 && x > 0){
          //   this.setState({play3:true})
          // }
          // if(pos === 4 && y > -2 && y < 2 && x > 0){
          //   this.setState({play4:true})
          // }
          // if(pos === 5 && y > -2 && y < 2 && x > 0){
          //   this.setState({play5:true})
          // }
          // if(pos === 6 && y > -2 && y < 2 && x > 0){
          //   this.setState({play6:true})
          // }
          // if(pos === 7 && y > -2 && y < 2 && x > 0){
          //   this.setState({play7:true})
          // }
          // if(pos === 8 && y > -2 && y < 2 && x > 0){
          //   this.setState({play8:true})
          // }
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
          playing={this.state.play1}
        />
        <ReactHowler
          src={audio2}
          playing={this.state.play2}
        />
        <ReactHowler
          src={audio3}
          playing={this.state.play3}
          loop={false}
        />
        <ReactHowler
          src={audio4}
          playing={this.state.play4}
        />
        <ReactHowler
          src={audio5}
          playing={this.state.play5}
        />
        <ReactHowler
          src={audio6}
          playing={this.state.play6}
        />
        <ReactHowler
          src={audio7}
          playing={this.state.play7}
        />
        <ReactHowler
          src={audio8}
          playing={this.state.play8}
        />
      </>
    );
  }
}

export default Secuencer;







// let s = []
//
// let sc = 1
//
// function setup() {
//
//   s[0] = new Samp(color(107, 0, 147,100),0.5,1,sc)
//   s[1] = new Samp(color(65, 72, 218,100),0.25,2,sc)
//   s[2] = new Samp(color(65, 202, 218,100),0.3,3,sc)
//   s[3] = new Samp(color(98, 218, 65,100),0.25,4,sc)
//   s[4] = new Samp(color(255, 255, 0,100),0.1,5,sc)
//   s[5] = new Samp(color(255, 110, 2,100),0.2,6,sc)
//   s[6] = new Samp(color(225, 0, 25,100),0.75,7,sc)
//   s[7] = new Samp(color(176, 65, 218,100),0.75,8,sc)
//   createCanvas(1400, 800);
// }
//
// function draw() {
//   background(255,255,255,30)
//   stroke(255)
//   push()
//   translate(20,10)
//   for(let i = 0; i < 4; i++){
//     s[i].draw()
//   }
//   pop()
//   push()
//   translate(-540,160)
//   for(let i = 4; i < 8; i++){
//     s[i].draw()
//   }
//   pop()
// }
//
// class Samp {
//   constructor(col,speed,pos,sc){
//     col = col
//     speed = speed
//     pos = pos
//     sc = sc
//   }
//
//   draw(){
//     stroke(255)
//     strokeWeight(0.2);
//     fill(col)
//     ellipse(pos*140+cos(radians(millis())*speed)*58*sc,100*sc+sin(radians(millis())*speed)*58*sc,20,20)
//
//     stroke(0)
//     fill(lerpColor(col,color(255,255,255),0.6))
//     ellipse(pos*140,100*sc,80*sc,80*sc)
//     fill(col)
//     ellipse(pos*140,100*sc,70*sc,70*sc)
//         drawingContext.shadowOffsetX = 5;
//   drawingContext.shadowOffsetY = 5;
//   drawingContext.shadowBlur = 10;
//   drawingContext.shadowColor = 'black';
//     fill(col)
//     ellipse(pos*140,100*sc,44*sc,44*sc)
//             drawingContext.shadowOffsetX =0;
//   drawingContext.shadowOffsetY = 0;
//   drawingContext.shadowBlur = 0;
//   drawingContext.shadowColor = 'black';
//   }
// }
