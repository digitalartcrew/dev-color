var mic, fft;



function setup() {
  createCanvas(windowWidth, windowHeight);

  devcolor = loadImage('img/devcolor.png');

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  colorMode(HSB, 360);
  m = new Logo();
}

function draw() {
  background(0);


  var spectrum = fft.analyze();
  var circRad = 500;
  var circThick = 50;
  var maxSpectrum = 400; //spectrum.length

  m.display();
  // m.move();

  for(i = 0; i < maxSpectrum; i+=1) {
    var circi = map(i, 0, maxSpectrum, 0, 360);
    var dist = spectrum[i]; //map(spectrum[i/2], 0, 255, 0, 360);
    stroke(spectrum[i], 360, 360);
    line(width/2 - CircleX(circi, circRad+dist+circThick), height/2 + CircleY(circi, circRad+dist+circThick), width/2 - CircleX(circi, circRad-dist-circThick), height/2 + CircleY(circi, circRad-dist-circThick));
  }  
}

function CircleX(degrees, radius) {
  return sin(radians(degrees))*radius;
}
 
function CircleY(degrees, radius) {
  return cos(radians(degrees))*radius;
}

function Logo(){
  var imgX = 0;
  var imgY = 0;
  var offset = 0;
  var easing = 0.05;

    this.display = function(){
      image(devcolor, imgX,imgY);
      var dx = (mouseX-devcolor.width/2) - offset;
      offset += dx * easing;
      tint(255, 127);  // Display at half opacity
      image(devcolor, offset, 0);
    },
    this.move = function(){
       imgX = imgX - 1.5;
       if(imgX < -100){
        imgX = 400;
        }  
       },

       this.mouseClicked = function(){
        offset = 0;

       }

    }
  



