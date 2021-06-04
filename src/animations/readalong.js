import React from 'react';
import p5 from 'p5';
import ReactHowler, {onStop} from 'react-howler'

let s = undefined;

class Readalong extends React.Component {

state = {
  text: this.props.text,
  done: true
};

componentDidMount(){

  const code = (sketch) => {

    let word = 0
    let audio
    let divMain
    let offsets
    let pText
    let p

    sketch.update = () => {
      document.querySelectorAll('.temporal').forEach(function(a) {
        a.remove()
      })
      p = []
      pText = this.state.text.split(' ')
      for(let i = 0; i < pText.length; i++){
        let t = sketch.createSpan(pText[i])
        let space = sketch.createSpan(' ')
        t.class('temporal')
        space.class('temporal')
        p.push(t)
        p.push(space)
      }
      for(let i = 0; i < p.length; i++){
        p[i].parent(divMain)
      }
      this.setState({done: false})
    }

    sketch.setup = () => {
      divMain = document.getElementById('main-container-text')
      sketch.noCanvas()
      sketch.frameRate(120)
    };

    sketch.draw = () => {
      if(this.state.done){
        sketch.update()
      }
      if(!this.player.howler.playing()){
        word = 0
        this.props.setPlay(false)
        p.map((word)=>{
          word.removeAttribute('style')
        })
      }
      if(this.player.howler.playing()){
        let currentTime = Math.round(this.player.howler.seek() * 1000)
        for(let i = 0; i < pText.length; i++){
          p[i].removeAttribute('style')
          if(currentTime >= Math.round(this.props.offsets[i]) && currentTime < Math.round(this.props.offsets[i+1])){
            word = i*2;
          }
        }
        p[pText.length-1].removeAttribute('style')
        p[word].style('color','#0000ff');
        p[word].style('text-decoration','underline');
        p[word].style('background-color','lightblue');
        if(word >= 2){
          p[word - 2].removeAttribute('style');
        }
      }
    };
  };
  s = new p5(code,'defaultP5');
}

componentDidUpdate(){
    if(this.state.text !== this.props.text){
      this.setState({done:true, text: this.props.text})
    }
}
  componentWillUnmount(){
    s.remove();
  }
  render(){
    return (
      <ReactHowler
        src={this.props.audio}
        playing={this.props.play}
        ref={(ref) => (this.player = ref)}
      />
    );
  }
}

export default Readalong;
