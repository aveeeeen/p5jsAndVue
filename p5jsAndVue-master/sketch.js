// thanks to Daniel Shiffman , p5js and Vue

let mySound;
let trackDur;
let timeCount = 0;
let flying = 0;
const width = 700;
const height = 700;
let xx,yy,xcor,ycor;


function preload() {
  soundFormats('mp3');
  mySound = loadSound('src/polycycle_9');
}

function thetime(n){
  n = Math.floor(n);
  
  function secondToMuinuts (input,memory) {
    
    let remainder = input % 60;
    console.log(remainder,input,memory)
      if(input  == remainder) return `${String(memory).padStart(2, "0")}:${String(remainder).padStart(2, "0")} `
      input = input - 60;
      memory += 1;
      if(input > 0) return secondToMuinuts(input,memory);
  
  }
  
   return secondToMuinuts (n,0);
  
  }

  function toSecond (input) {
  
    let output = 0;
    
    if(input.indexOf(":") == -1) return input;
    
    function remove(array, index) {
    return array.slice(0, index)
      .concat(array.slice(index + 1));
  }
    
    input = remove(input,input.indexOf(":"));
    
    if(input.length == 3){
       output = parseInt(input.slice(0,1),10);
       output *= 60;
       output += parseInt(input.slice(1),10);
       return output;
    }else if(input.length == 4){
       output = parseInt(input.slice(0,2),10);
       output *= 60;
       output += parseInt(input.slice(2),10);
       return output;
    }else{
      return parseInt(input,10);
    }
  
  }


function setup() {

  createCanvas(width, height);
  amplitude = new p5.Amplitude();

  background(50);

  trackDur = thetime(mySound.duration());

  const pB = new Vue({
    el: '#button',
    data: {
      duration: trackDur,
      input: "",
    },
    methods: {
      playsound: function () {
        if (mySound.isPlaying() == true) {
          return mySound.pause();
        }
        mySound.play();
      },
      jumpto: function () {
        if (mySound.isPlaying() != true){
          mySound.play();
          return mySound.jump(toSecond(pB.input), pB.trackDur);
        }
        return mySound.jump(toSecond(pB.input), pB.trackDur);
      }
    }
  })

  const trackmeta = new Vue({
    el: '#trackname',
    data: {
      title : "polycycles",
      album : "mori compilation 01"
    }
  })

}


let counter = 0;
const scale = 5;
let time = ""

function draw() {

  let level = amplitude.getLevel() ;//* 0.5 
  flying -= level * 0.02;
  var yoff = flying;

 if(mySound.currentTime() > 42.2) background(400*level*0.2);
 
  let r,X,ans;
  r = 3.798;
  X = level;
  time = `${mySound.currentTime()}`

  if (mySound.isPlaying() == true) {

    text(255)
    
    for(let i = 0;i < 100; i++){
      X = r * X * (1 - X);
      ans = X; 
      if(i == 96) xcor = ans * scale;
      if(i == 89) ycor = ans * scale;
    }

   
     translate(width / 2, height /2);
     
    if(level > 0.4){
      rotate(PI / level)
      noFill();
     
      stroke(255- (level*100+flying))
     beginShape();
     
        
        vertex(0,0);
        
        xcor = xcor*50+level;

        if(0 <= counter && counter < 25){
          vertex(xcor,ycor) ;
        }else if(25 < counter && counter < 50) {
          xcor *= -1;
           vertex(xcor,ycor);
        }else if(50 < counter && counter < 75) {
          xcor *= -1;
          ycor *= -1;
           vertex(ycor,xcor);
        }else if(counter > 75) {
          ycor *=-1;
          vertex(ycor,xcor);
        }

        ycor = ycor*50*level;

      endShape();
      counter += 1;
    }

        if(25 < counter && counter < 50) {
          xcor *= -1;
        }else if(50 < counter && counter < 75) {
          xcor *= -1; ycor *= -1;
        }else if(counter > 75) {
          ycor *=-1;
        }
    
    if(counter == 100) counter = 0; 

   
  }
    
  //console.log(counter,xcor,ycor,xx,yy)
  
}

function text (color) {
  fill(color);
  text(time,30,30);
  return
}






