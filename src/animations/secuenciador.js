let s = []
let counter = 0
let btn
let btn2

let sc = 2.2

function setup() {
  btn = createButton('+')
  btn.position(10,10)
  btn.mousePressed(add)

  btn = createButton('-')
  btn.position(40,10)
  btn.mousePressed(sus)

  s[0] = new Samp(color(255,0,0,100),0.5,1,sc)
  s[1] = new Samp(color(0,0,0,100),0.25,2,sc)
  s[2] = new Samp(color(0,255,0,100),0.3,3,sc)
  s[3] = new Samp(color(255,255,0,100),0.25,4,sc)
  s[4] = new Samp(color(255,0,255,100),0.1,5,sc)
  s[5] = new Samp(color(0,0,255,100),0.2,6,sc)
  s[6] = new Samp(color(100,50,155,100),0.75,7,sc)
  createCanvas(1400, 800);
}

function draw() {
  background(255,255,255,20)
  stroke(255)
  translate(50,-10)
  for(let i = 0; i < counter; i++){
    s[i].draw()
  }
  if(counter <= 0){
    background(255)
  }
}

class Samp {
  constructor(col,speed,pos,sc){
    this.col = col
    this.speed = speed
    this.pos = pos
    this.sc = sc
  }

  draw(){
    fill(this.col)
    ellipse(this.pos*140+cos(radians(millis())*this.speed)*60*sc,100*sc+sin(radians(millis())*this.speed)*60*sc,20,20)
    ellipse(this.pos*140,100*sc,80*sc,80*sc)
    fill(0)
    ellipse(this.pos*140,100*sc,70*sc,70*sc)
    fill(this.col)
    ellipse(this.pos*140,100*sc,30*sc,30*sc)
  }
}

function add (){
  counter++
}
function sus (){
  counter--
}
