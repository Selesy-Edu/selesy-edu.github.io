import React from 'react';
import p5 from 'p5';

import '../../styles/milecu.scss'

let s = undefined;

class ColorPicker extends React.Component {

  state = {
    color:{r:0,g:0,b:0,o:0}
  }

  setColor = () => {
    this.props.setColor(this.state.color);
  }

  componentDidMount(){

    const code = (sketch) => {

      let width = 150
      let height = 150
      let cnv
      let r,g,b,o
      let lr,lg,lb,lo
      let color = []

      sketch.setup = () => {
        r = sketch.createSlider(0,255,255)
        g = sketch.createSlider(0,255,255)
        b = sketch.createSlider(0,255,255)
        o = sketch.createSlider(1,255,0)
        r.class('colorPicker-slider red')
        r.id('slider-red')
        g.class('colorPicker-slider green')
        g.id('slider-green')
        b.class('colorPicker-slider blue')
        b.id('slider-blue')
        o.class('colorPicker-slider op')
        o.id('slider-opacity')
        r.parent("slidersColorPicker")
        g.parent("slidersColorPicker")
        b.parent("slidersColorPicker")
        o.parent("slidersColorPicker")
        r.mouseReleased(this.setColor)
        g.mouseReleased(this.setColor)
        b.mouseReleased(this.setColor)
        o.mouseReleased(this.setColor)
        cnv = sketch.createCanvas(width, height)
        cnv.parent('divColorPicker')
        cnv.id('canvasColorPicker')
      };

      sketch.draw = () => {
        sketch.background(255);
        color = [r.value(),g.value(),b.value(),o.value()];
        this.setState({color:{r:color[0],g:color[1],b:color[2],o:color[3]}});
        sketch.fill(color[0],color[1],color[2],color[3]);
        sketch.stroke(color[0],color[1],color[2],color[3]);
        sketch.rect(0,0,width,height);
      };
    }
    s = new p5(code,'defaultP5');
  }

  componentWillUnmount(){
    s.remove();
  }

  render(){
    return (
      <div className="divColorPicker-border">
        <div id="divColorPicker">
          <div id='div-canvas-colorPicker' draggable></div>
          <div id="slidersColorPicker" ></div>
          <label htmlFor="slider-red" style={{position:'absolute', right:'9px',top:'8px',fontFamily:'Learners',fontSize:'1.4rem'}}>{this.state.color.r}</label>
          <label htmlFor="slider-green" style={{position:'absolute', right:'9px',top:'40px',fontFamily:'Learners',fontSize:'1.4rem'}}>{this.state.color.g}</label>
          <label htmlFor="slider-blue" style={{position:'absolute', right:'9px',top:'73px',fontFamily:'Learners',fontSize:'1.4rem'}}>{this.state.color.b}</label>
          <label htmlFor="slider-opacity" style={{position:'absolute', right:'9px',top:'108px',fontFamily:'Learners',fontSize:'1.4rem'}}>{this.state.color.o}</label>
        </div>
      </div>
    );
  }
}

export default ColorPicker;
