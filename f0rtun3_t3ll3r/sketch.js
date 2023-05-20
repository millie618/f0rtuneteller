let button; 
let rebutton;
let img;
let angle = 0
let vid;
let vid2;

let port;
let connectBtn;
let data = [];
let c = 0;
let proximity =100;
let touch = "no touch";
let lastTouch ="";
let index = 0;



let max;
let  fortunes = ["Your future is full of possibilities and exciting adventures.",
  "Your intuition will guide you towards success and happiness.",
  "You have the power to make your dreams a reality. Believe in yourself.",
  "A new chapter in your life is about to begin. Embrace it.",
  "Your inner strength will help you overcome any obstacles.",
  "An important decision is coming your way. Trust your instincts.",
  "You will meet someone who will change your life for the better.",
  "Good things come to those who work hard. Keep pushing forward.",
  "Your creative talents will lead you towards great success.",
  "The universe is on your side. Everything will work out in your favor.",
  "Your kindness and generosity will be rewarded tenfold.",
  "Opportunities are coming your way. Be ready to seize them.",
  "Your persistence and dedication will pay off in the long run.",
  "Your greatest dreams are within reach. Keep reaching for the stars.",
  "You will make new and meaningful connections with people.",
  "Success and happiness are just around the corner. Keep going.",
  "A new adventure is waiting for you. Embrace the unknown.",
  "You are capable of achieving great things. Never give up.",
  "The future is bright and full of promise. Embrace it.",
  "Your hard work and determination will lead you to success.",
  "You will find peace and happiness within yourself.",
  "Your positive attitude and outlook will lead you to success.",
  "Believe in yourself and your abilities. You are capable of great things.",
  "Your unique talents and abilities will lead you to success.",
  "The universe has great things in store for you. Keep an open mind.",
  "Your greatest achievements are yet to come. Keep pushing forward.",
  "Your kindness and compassion will attract abundance into your life.",
  "Your perseverance and resilience will lead you towards great success.",
  "You have the power to make a difference in the world. Use it wisely.",
  "Your future is full of exciting opportunities and adventures.",
  "Your success is just around the corner. Keep moving forward.",
  "You will soon discover a new passion that will lead you towards success.",
  "Your optimism and positivity will attract success and abundance.",
  "You have the strength and courage to overcome any challenge.",
  "Your dedication and hard work will lead you to great things.",
  "Your creativity and imagination will lead you towards great success.",
  "Believe in yourself and your abilities. You are capable of achieving anything.",
  "Your unique talents and abilities will lead you towards great success.",
  "Your future is full of promise and possibility. Embrace it.",
  "You will soon discover a new path that will lead you towards success and happiness.",
  "Your hard work and determination will pay off in the long run.",
  "Your positive attitude and outlook will lead you towards great success.",
  "Your intuition and inner wisdom will guide you towards success and happiness.",
  "You have the power to make a difference in the world. Use it wisely.",
  "Your creativity and imagination will lead you towards great things.",
  "Your success is just around the corner. Keep pushing forward.",
  "You will soon meet someone who will have a profound impact on your life.",
  "Your dedication and hard work will lead you to success and fulfillment.",
  "Believe in yourself and your abilities. You are capable of achieving anything.",
  "Your perseverance and resilience will lead you towards success and happiness."]

  function preload(){

  }

function setup() {
  createCanvas(windowWidth, windowHeight);
  

 
  port = createSerial();


  // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)

  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(10, 20);
  connectBtn.mousePressed(connectBtnClick);


max = fortunes.length;


vid = createVideo(['fortuneBGvid.mp4'],
vidLoad);
vid.size(1920,1080);

vid2 = createVideo(['tellvid.mp4']);

}

function draw() {
background(0);
image(vid,0,0);

push()
fill(255);
rectMode(CENTER);
rect(windowWidth/2, windowHeight/2, 600,200);
pop()


textSize(60);
fill(179,255,63);
text('place_palm_on_the_orb', windowWidth/2,111);
textAlign(CENTER,CENTER);

// read the serial data. 
let str = port.readUntil("\n");
serialRead(str); //this example uses a slightly more complex function to control the data

push();
fill(0);
textSize(32);
textAlign(LEFT,CENTER);
text(touch,50,300);
text(proximity,50,350);
pop();

//do something with the data



if(touch=="touch"){ //if touched
if(touch != lastTouch) { //make sure it doesn't repeat
index = round(random(0,max));
console.log("index: "+index);

}
}
else if (touch=="no touch"){ //if not touched
  console.log ('no touch');
}

lastTouch = touch;
  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.html("Connect to Arduino");
  } else {
    connectBtn.html("Disconnect");
  }

  tell();
}









function tell(){


 
//console.log(fortune);
//refresh white rectangle 
push()
fill(255);
rectMode(CENTER);
rect(windowWidth/2, windowHeight/2, 600,200);
pop()



//text
push()
fill(0);
textAlign(CENTER, CENTER);
textSize(16);
text(fortunes[index], windowWidth/2, windowHeight/2);
console.log(fortunes[index]);

pop();
}




//------------------------------------------
// Read Serial (this controls the data sent from Arduino a bit more closely)
function parseSerialBuffer(buffer)
{
  //console.log("Parsing " + buffer);
    try {
    // Parse string to extract  information
    let inString = trim(buffer); // remove whitespaces from beginning/end
    let values=[];
    values = split(inString, ","); // Split string using space as a delimiter and cast to int
   console.log(values);
   
    for(let i = 0; i < values.length; i++) {
      proximity = int(values[0]); //returns a number
      touch = String(values[1]);  //returns a String
    }
  }
  catch(e) {
    e.printStackTrace();
  }
}

/// Read Serial and control new line return buffer
let inputBuffer = "";
function serialRead(data) {
  // Read data from the serial buffer
  for(let n = 0; n < data.length; ++n)
  {
    let c = data[n];
    // copy data to temp buffer
    inputBuffer += c;
    if('\n' == c){
      // when we find a newline, we process what we have so far
      parseSerialBuffer(inputBuffer);
      // and then start over
      inputBuffer = "";
    }
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open("Arduino", 9600);
  } else {
    port.close();
  }
}


function vidLoad() {
  vid.loop();
  vid.volume(0);
}

