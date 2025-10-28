import Vector from '../js/Vector.js';
import Signal from '../js/Signal.js';
import Color from '../js/Color.js';
import { mainHeight} from '../settings.js';
import { mainWidth } from '../settings.js';

class PVector extends Vector{
    constructor(x,y){
        super(x,y)
    }
    // override clone so that cloning a PVector preserves the subclass

    get(){
        return new PVector(this.x, this.y);
    }
    add(v){
        this.addS(v)
    }
    sub(v){
        this.subS(v)
    }
    mult(v){
        this.multS(v)
    }
    div(v){
        this.divS(v)
    }
    dist(v){
        return this.distanceTo(v)
    }
}
export function BlockDodger2(DrawRef, MouseRef, KeysRef, sessionTimer){
    // Khan-like functions
    let globalfillColor = color(255,255,255,1,'rgb');
    let globalStrokeColor = color(0,0,0,'1','rgb');
    let globalStroke = 2;
    let globalTextSize = 12;
    let CENTER = 'center'
    let TOPLEFT = 'topleft'
    let CORNER = 'topleft'
    let globalRectMode = TOPLEFT

function rectMode(value){
    globalRectMode = value
}
    
function frameRate(rate){
    // do nothing lol
}
function color(r,g,b,a=1){
    if(a>1){a=1}
    if(a<0){a=0}
    return new Color(r,g,b,a,'rgb');
}
function rect(x3,y3,w,h,d=0){
    let x;
    let y;
    let r = d/2
    if(globalRectMode === CENTER){
        x=   x3-w/2
        y =  y3-h/2
    }else{
        x=x3
        y=y3
    }
    if(r==0){
        DrawRef.rect(new Vector(x,y),new Vector(w,h), globalfillColor, true, true, globalStroke, globalStrokeColor);
        return;
    }
    let rad = Math.min(r, w, h);//ensures radius isn't bigger than width or height
    DrawRef.rect(new Vector(x,y+rad),new Vector(w,h-rad*2), globalfillColor, true, true, globalStroke, globalStrokeColor);
    DrawRef.rect(new Vector(x+rad,y),new Vector(w-rad*2,h), globalfillColor, true, true, globalStroke, globalStrokeColor);
    DrawRef.ellipse(new Vector(x+rad,y+rad), new Vector(rad*2,rad*2), globalfillColor, true, true, globalStroke, globalStrokeColor);
    DrawRef.ellipse(new Vector(x+w-rad,y+rad), new Vector(rad*2,rad*2), globalfillColor, true, true, globalStroke, globalStrokeColor);
    DrawRef.ellipse(new Vector(x+w-rad,y+h-rad), new Vector(rad*2,rad*2), globalfillColor, true, true, globalStroke, globalStrokeColor);
    DrawRef.ellipse(new Vector(x+rad,y+h-rad), new Vector(rad*2,rad*2), globalfillColor, true, true, globalStroke, globalStrokeColor);

    DrawRef.rect(new Vector(x+globalStroke/2,y+rad),new Vector(w-globalStroke,h-rad*2), globalfillColor, true, false, globalStroke, globalStrokeColor);
    DrawRef.rect(new Vector(x+rad-globalStroke/2,y+globalStroke/2),new Vector(w-rad*2,h-globalStroke), globalfillColor, true, false, globalStroke, globalStrokeColor);
    DrawRef.ellipse(new Vector(x+rad+globalStroke/2,y+rad+globalStroke/2), new Vector(rad*2,rad*2), globalfillColor, true, false, globalStroke, globalStrokeColor);
    DrawRef.ellipse(new Vector(x+w-rad-globalStroke/2,y+rad+globalStroke/2), new Vector(rad*2,rad*2), globalfillColor, true, false, globalStroke, globalStrokeColor);
    DrawRef.ellipse(new Vector(x+w-rad-globalStroke/2,y+h-rad-globalStroke/2), new Vector(rad*2,rad*2), globalfillColor, true, false, globalStroke, globalStrokeColor);
    DrawRef.ellipse(new Vector(x+rad+globalStroke/2,y+h-rad-globalStroke/2), new Vector(rad*2,rad*2), globalfillColor, true, false, globalStroke, globalStrokeColor);
}
function ellipse(x,y,w,h){
    DrawRef.ellipse(new Vector(x,y), new Vector(w,h), globalfillColor, true, true, globalStroke, globalStrokeColor);
}
function millis(){
    return sessionTimer.getTime()*1000;
}
let width = mainWidth;
let height = mainHeight;
function background(r,g,b,a=1){
    DrawRef.background(color(r,g,b,a,'rgb'));
}
function fill(r,g,b,a=100){
    globalfillColor = color(r,g,b,a/100,'rgb');
}
function stroke(r,g,b,a=1){
    globalStrokeColor = color(r,g,b,a,'rgb');
}
function strokeWeight(v){
    globalStroke = v
}
function noStroke(){
    globalStroke = 0;
}

function text(str,x,y,w,h){
    // Support optional bounding box: text(str, x, y, w, h)
    if (typeof w !== 'undefined' && typeof h !== 'undefined') {
        DrawRef.text(str, new Vector(x,y), globalfillColor, 1, globalTextSize, { box: new Vector(w,h), wrap: 'word' });
    } else {
        DrawRef.text(str, new Vector(x,y), globalfillColor, 1, globalTextSize);
    }
}
function textSize(size){
    globalTextSize = size;
}
function round(num){
    return Math.round(num);
}
function noLoop(){
    //do nothing
}
function line(x1,y1,x2,y2){
    DrawRef.line(new Vector(x1,y1), new Vector(x2,y2), globalStrokeColor, globalStroke)
}
function random(start=0,end=1){
    return Math.random()*(end-start)+start
}
function pushMatrix(){
    DrawRef.pushMatrix();
}
function transform(x,y){
    DrawRef.transform(new Vector(x,y));
}
function scale(sx,sy=sx){
    DrawRef.scale(new Vector(sx,sy));
}
function rotate(angle){
    DrawRef.rotate(angle);
}
function popMatrix(){
    DrawRef.popMatrix(true,true);
}

// Dummy functions
function mouseClicked(){} //dummy
function draw(){} //dummy
function keyReleased(){} //dummy
function mouseReleased(){} //dummy



// Warning: keyCode = VALUE will need to be replaced with KeysRef.pressed('keyname')
// replace 'var' with 'let' or 'const' as needed
// Example: var click = 0;  --> let click = 0;

// Redeclare these at start of draw()
let mouseIsPressed = MouseRef.held('left');
let mouseX = MouseRef.pos.x;
let mouseY = MouseRef.pos.y;
let keyPressed = KeysRef.held('any')
//blackout screen areas - paste at end of draw()
DrawRef.rect(new Vector(width,0), new Vector(mainWidth-width,height+2), color(0,0,0,1,'rgb'), true); //blackout right side
DrawRef.rect(new Vector(-1,height), new Vector(mainWidth+2,mainHeight-height+1), color(0,0,0,1,'rgb'), true); //blackout bottom

// Paste code below this line to use!



/**Break*/

/****
I have worked on this game for months. If you find any bugs/gliches please tell me in the questions tab.
****/
var timere = 0;
var ammo = 3;
var 
mastery = false,
phonesize=0,
PCsize=0,
pos = 0,
PX = pos*100,
score = 0,
hscore = 0,
topscore=0,
htopscore=0,
mpos1 = round(random(0,3)),
mpx1 = mpos1*100,
mpy1 = 0,
mpos2 = round(random(0,3)),
mpx2 = mpos2*100,
mpy2 = -200,
mpos3 = round(random(0,3)),
mpx3 = mpos3*100,
mpy3 = -400,
speed = 5,
hp = 1,
time = 0,
holeX = 0,
holeY = 0,
holeS = 5,
multis = 1,
holes = false;
var shootX = [0,200,100,300];
var shootY = [0,0,50,50];
var
falling = 3,
shootscore = 0,
shoothighscore = 0,
amoun = 8,
master = 0,
superpoints = 0,
upgrade1 = true,
upgrade2 = true,
upgrade3 = true,
upgrade4 = false,
upgrade5 = false,
upgrade6 = false, 
upgrade7 = false,
upgrade8 = false,
upgrade9 = false,
upgrade10 = false,
upgrade11 = false,
upgrade12 = false;
var
u1b = true,
u2b = true,
u3b = true,
u4b = false,
u5b = false,
u6b = false,
u7b = false,
u8b = false,
u9b = false,
u10b = false,
u11b = false,
u12b = false;
var upgrade = [true,true,true,false,false,false,false,false,false,false,false,false];
var ub = [true,true,true,false,false,false,false,false,false,false,false,false];
var
pactime=0,
points=0,
skillpoints=0,
afk = 0,
version = 1,
master_intro = true;
var
titlescene = true,
page = 1;
var drawing = [[-256, [141,260], [143,260], [143,259], [144,259], [145,259], [147,259], [148,259], [149,259], [150,259], [151,259], [151,259], [153,259], [154,259], [156,259], [157,259], [158,259], [159,259], [159,259], [159,259], [160,259], [161,259], [162,259], [163,259], [164,260], [164,260], [165,260], [165,260], [166,260], [167,260], [167,260], [167,260], [168,260], [168,260], [168,261], [169,261], [169,261], [170,261], [170,261], [170,261], [171,261], [171,261], [172,261], [172,261], [172,261], [173,261], [173,261], [173,261], [173,260], [173,260], [173,260], [173,259], [173,259], [173,259], [173,258], [173,258], [173,257], [173,257], [173,257], [173,256], [173,256], [173,256], [173,255], [173,255], [173,254], [173,254], [173,253], [173,253], [173,253], [173,252], [173,252], [173,251], [173,251], [173,251], [173,250], [173,250], [173,249], [173,249], [173,249], [173,248], [173,248], [173,248], [173,247], [173,245], [172,245], [172,244], [172,244], [172,243], [172,243], [172,242], [172,242], [172,241], [171,241], [171,241], [171,241], [171,241], [170,241], [170,242], [169,242], [169,243], [169,243], [168,244], [168,245], [168,245], [168,246], [168,247], [168,248], [168,249], [167,249], [167,250], [167,250], [167,250], [167,251], [167,251], [166,252], [166,252], [165,253], [165,253], [164,254], [164,254], [164,254], [163,254], [163,254], [163,254], [163,254], [163,253], [163,252], [163,251], [163,250], [163,250], [162,249], [162,249], [162,248], [162,248], [162,248], [161,247], [161,247], [161,246], [160,246], [160,245], [159,244], [159,244], [159,243], [159,243], [159,242], [159,242], [159,241], [159,241], [159,241], [159,240], [158,240], [158,240], [158,240], [158,240], [157,241], [157,241], [157,241], [156,242], [156,243], [155,244], [154,245], [154,246], [154,246], [153,247], [153,248], [153,248], [152,248], [152,249], [152,249], [151,250], [151,250], [151,251], [151,251], [151,251], [150,252], [150,252], [150,253], [150,252], [150,252], [150,252], [150,251], [150,251], [150,250], [150,249], [150,249], [150,248], [150,248], [150,248], [150,247], [150,247], [150,247], [150,246], [150,246], [149,245], [149,245], [148,244], [148,243], [147,242], [147,241], [147,241], [147,240], [147,240], [147,240], [147,239], [147,239], [146,239], [146,239], [146,239], [146,239], [145,240], [145,241], [145,241], [145,242], [145,244], [145,245], [145,246], [144,247], [144,248], [144,249], [144,250], [144,251], [143,252], [143,253], [143,255], [143,255], [142,256], [142,256], [142,257], [142,257], [142,258], [142,259], [142,259], [142,260], [142,260]],[-256, [148,252], [148,251], [148,250], [148,249], [147,249], [147,248], [147,247], [147,247], [146,246], [146,245], [146,245], [146,245], [146,244], [145,244], [145,244], [144,244], [144,244], [144,245], [144,247], [144,249], [144,250], [144,250], [144,251], [144,252], [144,253], [144,253], [144,254], [144,254], [144,255], [144,255], [144,256], [145,256], [145,256], [146,256], [147,256], [148,256], [150,256], [151,256], [152,256], [152,256], [153,256], [154,256], [155,256], [155,256], [156,256], [156,256], [156,256], [157,256], [158,256], [157,256], [156,255], [153,253], [152,253], [152,253], [151,253], [150,253], [150,253], [150,253], [149,253], [149,253], [148,253], [148,252], [147,252], [147,251], [146,251], [146,251], [146,251], [146,251], [147,251], [148,251], [150,252], [152,252], [155,254], [157,255], [158,256], [159,257], [160,257], [160,257], [160,256], [160,255], [160,254], [160,253], [159,252], [158,250], [158,249], [157,249], [156,248], [156,248], [156,248], [155,248], [155,248], [155,248], [155,249], [155,250], [155,250], [155,251], [156,251], [156,251], [157,251], [158,251], [158,250], [158,249], [158,249], [158,248], [158,248], [158,247], [158,246], [158,246], [158,245], [158,245], [159,246], [159,247], [161,250], [162,250], [162,252], [162,252], [162,253], [163,253], [164,254], [164,255], [165,255], [165,256], [165,256], [166,257], [169,258], [170,258], [170,258], [171,258], [172,258], [172,258], [172,258], [172,257], [172,257], [172,256], [172,256], [171,254], [169,250], [168,249], [168,249], [167,248], [167,247], [167,246], [167,245], [168,245], [169,245], [170,245], [172,246], [173,247], [173,248], [173,249], [173,249], [173,250], [173,251], [173,251], [172,252], [172,253], [171,254], [170,255], [169,255], [169,256], [169,257], [169,257], [169,256], [169,255], [169,253], [169,252], [169,252], [169,251], [169,250], [169,250], [169,250], [169,249], [169,249], [170,249], [170,250], [170,252], [170,253], [169,255], [168,255], [167,256], [163,256], [160,254], [159,254], [158,254], [157,254], [157,254], [156,254], [156,254], [155,254], [155,254], [155,254], [154,254], [154,254], [153,254], [153,254], [153,254], [152,253], [150,253], [150,253], [149,253], [147,253], [146,253], [146,253], [145,253], [144,253], [144,253], [143,253], [143,253], [143,253], [143,252], [144,250], [146,247], [146,247], [147,246], [147,246], [148,246], [148,246], [149,246], [150,246], [150,246], [152,247], [155,251], [157,253], [158,254], [159,254], [159,254], [159,254], [159,253], [159,253], [159,250], [159,248], [158,246], [158,245], [157,244], [157,244], [157,243], [157,242], [157,242], [157,241], [157,241], [157,242], [157,245], [157,248], [157,249], [157,250], [157,252], [158,253], [159,253], [160,254], [160,255], [161,255], [162,255], [163,255], [164,255], [164,255], [165,255], [166,255], [166,255], [167,255], [168,255], [168,255], [169,255], [170,254], [170,253], [170,252], [170,251], [170,250], [170,250], [170,249], [170,248], [170,248], [170,247], [170,247], [170,246], [170,246], [170,246], [170,245], [170,245], [170,245], [170,244]]];

var gametype=10;
var Particle = function(position) {
    this.acceleration = new PVector(0, 0.05);
    this.velocity = new PVector(random(-1, 1), random(-1, 0));
    this.position = position.get();
    this.timeToLive = 255;
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.timeToLive -= 4;
};

Particle.prototype.display = function() {
    strokeWeight(2);
    stroke(255,100,100,this.timeToLive);
    fill(255, 100, 100, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
};

Particle.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

var ParticleSystem = function(position,u) {
    this.origin = position.get();
    this.particles = [];
    this.u=false;
};

ParticleSystem.prototype.addParticle = function(a) {
    if(this.particles.length<10 &&this.u!==true && this.particles.length!==-1){
    this.particles.push(new Particle(this.origin));
    }else if(this.particles>=10){this.u=true;this.particles.length=-1;}
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.run();
      if (p.isDead()) {
          this.u=true;
        this.particles.splice(i, 1);
      }
    }
};
var systems = [];
var pParticle = function(position,hi) {
    this.acceleration = new PVector(0, 0.05);
    this.velocity = new PVector(random(-1, 1), random(-1, 0));
    this.position = position.get();
    this.timeToLive = 255;
    this.hi=0;
    if(hp===2){this.hi=2;}
};

pParticle.prototype.run = function() {
    this.update();
    this.display();
};

pParticle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.timeToLive -= 4;
};

pParticle.prototype.display = function() {
    strokeWeight(2);
    stroke(255,255,255,this.timeToLive);
    fill(100, 100, 100*1+this.hi, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
};

pParticle.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

var pParticleSystem = function(position,u) {
    this.origin = position.get();
    this.pparticles = [];
    this.u=false;
};

pParticleSystem.prototype.addpParticle = function(a) {
    if(this.pparticles.length<20 &&this.u!==true && this.pparticles.length!==-1){
    this.pparticles.push(new pParticle(this.origin));
    }else if(this.pparticles>=20){this.u=true;this.pparticles.length=-1;}
};

pParticleSystem.prototype.run = function() {
  for (let i = this.pparticles.length-1; i >= 0; i--) {
      var p = this.pparticles[i];
      p.run();
      if (p.isDead()) {
          this.u=true;
        this.pparticles.splice(i, 1);
      }
    }
    
};
var psystems = [];
var spawn = 5;
var backgroundParticle = function(position,hi) {
    this.acceleration = new PVector(0, 0.01);
    this.velocity = new PVector(random(-1, 1), random(-1, 0));
    this.position = position.get();
    this.timeToLive = 255;
};

backgroundParticle.prototype.run = function() {
    this.update();
    this.display();
};

backgroundParticle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.timeToLive -= 0.10;
    if(spawn===0){spawn=5;}
    spawn-=1;
};

backgroundParticle.prototype.display = function() {
    strokeWeight(2);
    stroke(100,100,100,this.timeToLive);
    fill(50, 50, 50, this.timeToLive);
    ellipse(this.position.x, this.position.y, 12, 12);
};

backgroundParticle.prototype.isDead = function() {
    if (this.timeToLive < 0) {
        return true;
    } else {
        return false;
    }
};

var backgroundParticleSystem = function(position,u) {
    this.origin = position.get();
    this.backgroundparticles = [];
};

backgroundParticleSystem.prototype.addbParticle = function(a) {
    if(spawn===0){
    this.backgroundparticles.push(new backgroundParticle(this.origin));
    }
};

backgroundParticleSystem.prototype.run = function() {
  for (let i = this.backgroundparticles.length-1; i >= 0; i--) {
      var p = this.backgroundparticles[i];
      p.run();
      if (p.isDead()) {
        this.backgroundparticles.splice(i, 1);
      }
    }
    
};
var backgroundsystems = [];

var block1 = function(){
        mpx1 = mpos1*100;
        if(upgrade2===true){
            fill(255, 0, 0);
        rect(mpx1,mpy1,100,50,30);
        }
        if(upgrade5===true){
        noStroke();
        fill(255, 0, 0);
        if(hp===2){
            fill(0, 0, 255);
            if(pactime>20){
                fill(255, 255, 255);
            }if(pactime>40){
                fill(255, 255, 255);
                pactime=0;
            }
        }
   ellipse(mpx1+50,mpy1,70,60); 
   ellipse(mpx1+50,mpy1+20,30,80); 
   ellipse(mpx1+30,mpy1+20,30,80); 
   ellipse(mpx1+70,mpy1+20,30,80); 
   fill(255, 255, 255);
   ellipse(mpx1+35,mpy1+10,20,20); 
   ellipse(mpx1+65,mpy1+10,20,20); 
   fill(0, 0, 0);
   ellipse(mpx1+40,mpy1+10,10,10); 
   ellipse(mpx1+60,mpy1+10,10,10);
}
        if(upgrade8===true){
            fill(255, 0, 0);
            rect(mpx1+25,mpy1,50,50);
            fill(255, 255, 255);
            ellipse(mpx1+50,mpy1+25,50,50);
        }
        if(upgrade11===true){
            fill(255, 0, 0);
        rect(mpx1,mpy1,100,50,30);
        fill(0, 0, 0,255);
        strokeWeight(5);
        line(mpx1+30,mpy1+10,mpx1+40,mpy1+15);
        line(mpx1+35,mpy1+20,mpx1+35,mpy1+20);
        line(mpx1+70,mpy1+10,mpx1+60,mpy1+15);
        line(mpx1+65,mpy1+20,mpx1+65,mpy1+20);
        strokeWeight(1);
        }
        if(mpy1>599&&pos!==mpos1){
            mpy1=round(random(-50,-400));
            mpos1 = round(random(0,3));
            speed+=0.1;
        }
        if(mpy1>550&&pos===mpos1){
            mpy1=round(random(-50,-400));
            mpos1 = round(random(0,3));
            if(mpos1===mpos2){
              mpos1 = round(random(0,3));  
            }
            if(hp===1){
                points+=score/3;
                speed=5;
                //playSound(getSound("retro/hit2"));
                psystems.push(new pParticleSystem(new PVector(PX+50, 550)));
                timere=-50;
                if(mastery===true){
        speed=10;
        points+=round(score/2);
    }
                score=0;
            }else{
                hp=1;
                
            }
        }
        mpy1+=speed*multis;
    };
var block2 = function(){
    fill(255, 100, 0);
    mpx2 = mpos2*100;
    if(upgrade2===true){
    rect(mpx2,mpy2,100,50,20);
    }
    if(upgrade5===true){
        noStroke();
        fill(94, 255, 247);
        if(hp===2){
            fill(0, 0, 255);
            if(pactime>20){
                fill(255, 255, 255);
            }if(pactime>40){
                fill(255, 255, 255);
                pactime=0;
            }
        } 
   ellipse(mpx2+50,mpy2,70,60); 
   ellipse(mpx2+50,mpy2+20,30,80); 
   ellipse(mpx2+30,mpy2+20,30,80); 
   ellipse(mpx2+70,mpy2+20,30,80); 
   fill(255, 255, 255);
   ellipse(mpx2+35,mpy2+10,20,20); 
   ellipse(mpx2+65,mpy2+10,20,20); 
   fill(0, 0, 0);
   ellipse(mpx2+40,mpy2+10,10,10); 
   ellipse(mpx2+60,mpy2+10,10,10);
}
    if(upgrade8===true){
            fill(255, 100, 0);
            rect(mpx2+25,mpy2,50,50);
            fill(255, 255, 255);
            ellipse(mpx2+50,mpy2+25,50,50);
        }
        if(upgrade11===true){
            fill(255, 100, 0);
        rect(mpx2,mpy2,100,50,30);
        fill(0, 0, 0,255);
        strokeWeight(5);
        line(mpx2+30,mpy2+10,mpx2+40,mpy2+15);
        line(mpx2+35,mpy2+20,mpx2+35,mpy2+20);
        line(mpx2+70,mpy2+10,mpx2+60,mpy2+15);
        line(mpx2+65,mpy2+20,mpx2+65,mpy2+20);
        strokeWeight(1);
        }
    if(mpy2>599&&pos!==mpos2&&upgrade8===false){
        mpy2=round(random(-50,-400));
        mpos2 = round(random(0,3));
        speed+=0.1;
    }
    
    if(mpy2>550&&pos===mpos2){
        mpy2=round(random(-50,-400));
        mpos2 = round(random(0,3));
    if(hp===1){
        speed=5;
        if(mastery===true){
        speed=10;
        points+=round(score/2);
    }
    points+=score/3;
        score=0;
        //playSound(getSound("retro/hit2"));
        psystems.push(new pParticleSystem(new PVector(PX+50, 550)));
        timere=-50;
    }else{
        hp=1;
    }
    }
    
    mpy2+=speed*multis;
};
var block3 = function(){
    fill(255, 255, 0);
    mpx3 = mpos3*100;
    if(upgrade2===true){
rect(mpx3,mpy3,100,50,10);
}
if(upgrade5===true){
   ellipse(mpx3+50,mpy3,20,20); 
}
 if(upgrade8===true){
            fill(0, 255, 0);
            rect(mpx3+25,mpy3,50,50);
            fill(255, 255, 255);
            ellipse(mpx3+50,mpy3+25,50,50);
        }
        if(upgrade11===true){
            fill(255, 255, 0);
        rect(mpx3,mpy3,100,50,30);
        fill(0, 0, 0,255);
        strokeWeight(5);
        line(mpx3+30,mpy3+10,mpx3+40,mpy3+10);
        line(mpx3+35,mpy3+20,mpx3+35,mpy3+20);
        line(mpx3+70,mpy3+10,mpx3+60,mpy3+10);
        line(mpx3+65,mpy3+20,mpx3+65,mpy3+20);
        strokeWeight(1);
        }
if(mpy3>599&&pos!==mpos3&&upgrade8===false){
        mpy3=-50;
        mpos3 = round(random(0,3));
        if(hp===1){
        speed=5;
        if(mastery===true){
        speed=10;
        points+=round(score/2);
    }
    points+=score/3;
        score=0;
        }else{hp=1;}
    }
if(mpy3>550&&pos===mpos3&&upgrade8===false){
        mpy3=-50;
        mpos3 = round(random(0,3));
        hp=2;
        score+=3;
        speed+=0.1;
        if(mastery===true){
            speed+=0.2;
        }
    }
    if(mpy3>599&&pos!==mpos3&&upgrade8===true){
        mpy3=-50;
        mpos3 = round(random(0,3));
        score+=2;
    }
    
if(mpy3>550&&pos===mpos3&&upgrade8===true){
        mpy3=-50;
        mpos3 = round(random(0,3));
        speed=5;
        if(mastery===true){
            speed=10;
        }
        points+=round(score/3);
        score=0;
    }

    mpy3+=speed*multis;
};
var hole = function(){
fill(255, 255, 255);
rect(0,holeY,400,50);
fill(0, 0, 0);
rect(holeX*100,holeY,100,50);
if(holeY>500&&holeX!==pos && hp===1){
    holeY=-50;
    holeX=round(random(0,3));
    holeS=5;
    if(mastery===true){
        holeS=10;
        points+=round(hscore/2);
    }
    points+=round(hscore);
    hscore=0;
    psystems.push(new pParticleSystem(new PVector(PX+50, 550)));
                timere=-50;
}
if(holeY>500&&holeX!==pos && hp===2){
    holeY=-50;
    holeX=round(random(0,3));
   hp=1;
}
if(holeY>600&&holeX===pos){
    holeY=-50;
    holeX=round(random(0,3));
    holeS+=0.3;
    hscore+=1;
    if(mastery===false){
        hp=2;
    }
}
holeY+=holeS*multis;
};
var subjects = [];
var subject = function(x,y,u,timetolive){
this.pos = new PVector(PX,600);
this.u = true;
this.timetolive=600;
};
subject.prototype.display = function(){
    if(this.u === true){
pushMatrix();
translate(this.pos.x+50,this.pos.y);
noStroke();
if(upgrade3===true){
    fill(this.timetolive/2.35294117647, 0, 0);
rect(-5,-25,10,50,10);
}
if(upgrade6===true){
    fill(247, 255, 0);
 ellipse(0,0,10,10);   
}
if(upgrade9===true){
        fill(255, 0, 0);
        ellipse(0,0,10,30);
    }
    if(upgrade11===true){
    fill(255, 0, 0);
        rect(-0,-25,10,50,10);
        rect(-15,-25,10,50,10);
    }
stroke(117, 117, 117);
popMatrix();
}
};
subject.prototype.update = function(){
    if(this.u === true){
this.pos.y-=10*multis;
this.timetolive-=1;
}
};
subject.prototype.colide = function(){
if(this.pos.y<shootY[0]+50 && this.pos.y>= shootY[0] &&this.pos.x <= shootX[0]+99&& this.pos.x>=shootX[0]-0){
    systems.push(new ParticleSystem(new PVector(this.pos.x+50, this.pos.y)));
    this.u = false; 
    shootY[0] = -300+falling;
    shootscore+=1;
    ammo+=1;
    shootX[0]=round(random(0,3));
    shootX[0]*=100;
}
if(this.pos.y<shootY[1]+50 && this.pos.y>= shootY[1] &&this.pos.x <= shootX[1]+99&& this.pos.x>=shootX[1]-0){
    systems.push(new ParticleSystem(new PVector(this.pos.x+50, this.pos.y)));
    this.u = false; 
    shootY[1] = -300+falling;
    shootscore+=1;
    ammo+=1;
    shootX[1]=round(random(0,3));
    shootX[1]*=100;
}
if(this.pos.y<shootY[2]+50 && this.pos.y>= shootY[2] &&this.pos.x <= shootX[2]+99&& this.pos.x>=shootX[2]-0){
    systems.push(new ParticleSystem(new PVector(this.pos.x+50, this.pos.y)));
    this.u = false; 
    shootY[2] = -300+falling;
    shootscore+=1;
    ammo+=1;
    shootX[2]=round(random(0,3));
    shootX[2]*=100;
}
if(this.pos.y<shootY[3]+50 && this.pos.y>= shootY[3] &&this.pos.x <= shootX[3]+99&& this.pos.x>=shootX[3]-0){
    systems.push(new ParticleSystem(new PVector(this.pos.x+50, this.pos.y)));
    this.u = false; 
    shootY[3] = -300+falling;
    shootscore+=1;
    ammo+=1;
    shootX[3]=round(random(0,3));
    shootX[3]*=100;
}

if(this.u === false){
    this.pos.y = -5000;
}
};
var drawsubjects = function(){
for(let a = 0;a<subjects.length;a++){
    subjects[a].display();
    subjects[a].update();
    subjects[a].colide();
}
};
var subjectCreate = function(){
subjects.push(new subject(200,400));
};
var hi = 0;
var shoot = function(){
    drawsubjects();
    fill(255, 255, 255);
rect(shootX[0],shootY[0],100,50,10);
rect(shootX[1],shootY[1],100,50,10);
rect(shootX[2],shootY[2],100,50,10);
rect(shootX[3],shootY[3],100,50,10);
for(let i = 0; i < systems.length; i++){
        systems[i].addParticle();
        systems[i].run();
    }
for(let a = 0; a < psystems.length; a++){
        psystems[a].addpParticle();
        psystems[a].run();
    }
    stroke(0, 0, 0);
if(shootY[0]>=550){
shootX[0] = 0;
shootY[0] = 0;
shootX[1] = 200;
shootY[1] = 0;
shootX[2] = 100;
shootY[2] = 50;
shootX[3] = 300;
shootY[3] = 50;
falling = 3;
ammo = 3;
points+=shootscore;
shootscore=0;
//playSound(getSound("retro/hit2"));
psystems.push(new pParticleSystem(new PVector(PX+50, 550)));
timere=-50;
subjects = [];
if(mastery===true){
    ammo=3;
    points+=round(shootscore/3);
}
}
if(shootY[1]>=550){
shootX[0] = 0;
shootY[0] = 0;
shootX[1] = 200;
shootY[1] = 0; 
shootX[2] = 100;
shootY[2] = 50;
shootX[3] = 300;
shootY[3] = 50;
falling = 3;
ammo = 3;
points+=shootscore;
shootscore=0;
playSound(getSound("retro/hit2"));
psystems.push(new pParticleSystem(new PVector(PX+50, 550)));
timere=-50;
subjects = [];
if(mastery===true){
    ammo=3;
    points+=round(shootscore/3);
    falling = 5;
    timere=-30;
}
}
if(shootY[2]>=550){
shootX[0] = 0;
shootY[0] = 0;
shootX[1] = 200;
shootY[1] = 0;
shootX[2] = 100;
shootY[2] = 50;
shootX[3] = 300;
shootY[3] = 50;
falling = 3;
ammo = 3;
points+=shootscore;
shootscore=0;
//playSound(getSound("retro/hit2"));
psystems.push(new pParticleSystem(new PVector(PX+50, 550)));
timere=-50;
subjects = [];
if(mastery===true){
    ammo=3;
    points+=round(shootscore/3);
    falling = 5;
    timere=-30;
}
}
if(shootY[3]>=550){
shootX[0] = 0;
shootY[0] = 0;
shootX[1] = 200;
shootY[1] = 0;
shootX[2] = 100;
shootY[2] = 50;
shootX[3] = 300;
shootY[3] = 50;
falling = 3;
ammo = 3;
points+=shootscore;
shootscore=0;
//playSound(getSound("retro/hit2"));
psystems.push(new pParticleSystem(new PVector(PX+50, 550)));
timere=-50;
subjects = [];
if(mastery===true){
    ammo=3;
    points+=round(shootscore/3);
    falling = 5;
    timere=-30;
}
}
if(timere>=0){
shootY[0]+=falling*multis;
shootY[1]+=falling*multis;
shootY[2]+=falling*multis;
shootY[3]+=falling*multis;

falling+=0.005;
}
if(shootscore>shoothighscore){
    shoothighscore = shootscore;
}
if(subjects.length<ammo){
    
}
};
backgroundsystems.push(new backgroundParticleSystem(new PVector(100, -100)));
backgroundsystems.push(new backgroundParticleSystem(new PVector(300, -100)));
keyReleased = function(){
    if(KeysRef.pressed('ArrowRight')){
        pos+=1;
    }
    if(KeysRef.pressed('ArrowLeft')){
        pos+=-1;
    }
    if(pos===4){
        pos=0;
    }
    if(pos===-1){
        pos=3;
    }

    if(KeysRef.pressed('ArrowDown')&&gametype===-1&&titlescene===true){gametype=1;}else
    if(KeysRef.pressed('ArrowUp')&&gametype===1&&titlescene===true){gametype=-1;}
    if(u4b===true||u5b===true||u6b===true){
    if(KeysRef.pressed('ArrowDown')&&gametype===1&&titlescene===true){gametype=2;}else
    if(KeysRef.pressed('ArrowDown')&&gametype===2&&titlescene===true){gametype=3;}else
    if(KeysRef.pressed('ArrowUp')&&gametype===2&&titlescene===true){gametype=1;}else
    if(KeysRef.pressed('ArrowUp')&&gametype===3&&titlescene===true){gametype=2;}
    }else if(KeysRef.pressed('ArrowUp')&&gametype!==1&&gametype!==-1 || KeysRef.pressed('ArrowDown') &&gametype!==-1){
        textSize(20);
        fill(255, 0, 0);
        text("Unlock tier 2 skins first!",20,200);
    }
    if(KeysRef.pressed('up')&&gametype===3&&titlescene===false){  
        if(subjects.length<=ammo){
    subjectCreate();
    //playSound(getSound("retro/laser2"));
        }}
        if(KeysRef.pressed('ArrowUp') && titlescene===false){
            //multis=2;
        }else{
            multis=1;
        }
        if(afk>=100){
            titlescene=true;
        }
        afk+=1;
        if(keyPressed){
            afk=0;
        }
    // (:
    if(upgrade10===true&&upgrade11===true&&upgrade12===true){
        mastery = true;
        master = 0;
    }else{mastery=false;}
};
mouseClicked = function(){
    if(phonesize>0){
        if(mouseX>200){
        pos+=1;
    }
    if(mouseX<200){
        pos+=-1;
    }
    if(pos===4){
        pos=0;
    }
    if(pos===-1){
        pos=3;
    }
    if(mouseY>550&&gametype===-1&&titlescene===true){gametype=1;}else
    if(mouseY<50&&gametype===1&&titlescene===true){gametype=-1;}else
    if(u4b===true&&u5b===true&&u6b===true){
    if(mouseY>550&&gametype===2&&titlescene===true){gametype=3;}else
    if(mouseY>550&&gametype===1&&titlescene===true){gametype=2;}else
    if(mouseY<50&&gametype===2&&titlescene===true){gametype=1;}else
    if(mouseY<50&&gametype===3&&titlescene===true){gametype=2;}
    }else if(mouseY<300&&gametype!==1&&gametype!==-1 || mouseY>300 &&gametype!==-1){
        textSize(20);
        fill(255, 0, 0);
        text("Unlock tier 2 skins first!",20,200);
    }
    if(mouseY<300&&gametype===3&&titlescene===false){  
        if(subjects.length<=ammo){
    subjectCreate();
    //playSound(getSound("retro/laser2"));
        }}
    if(KeysRef.pressed('d')&&master === 0 ){
        master=1;
    }
    if(KeysRef.pressed('o')&&master === 1 ){
        master=2;
    }
    if(KeysRef.pressed('d')&&master === 2){
        master=3;
    }
    if(KeysRef.pressed('g')&&master === 3 ){
        master=4;
    }

    if(KeysRef.pressed('e')&&master === 4 ){
        skillpoints+=1000;
    }



        if(mouseX>350 && page !==2){
            page += 1;
        }
        if(mouseX<50 && page !==0){
            page -= 1;
        }
        if(mouseX>150&&mouseX<250  && gametype===1 && titlescene === false){
            titlescene=true;
            page=1;
        }else
        if(mouseX>150&&mouseX<250  && gametype===2 && titlescene === false){
            titlescene=true;
            page=1;
        }else
        if(mouseX>150&&mouseX<250  && gametype===2 && titlescene === true){
            titlescene=false;
            page=1;
        }else
        if(mouseX>150&&mouseX<250  && gametype===1 && titlescene === true){
            titlescene=false;
            page=1;
        }else
        if(mouseX>150&&mouseX<250  && gametype===3 && titlescene === false){
            titlescene=true;
            page=1;
        }else
        if(mouseX>150&&mouseX<250 && gametype===3 && titlescene === true){
            titlescene=false;
            page=1;
        }
        if(afk>=100){
            titlescene=true;
        }
        afk+=1;
        if(keyPressed){
            afk=0;
        }
    
    
    
    }
};
        
draw = function() {

    let mouseIsPressed = MouseRef.held('left');
    let mouseX = MouseRef.pos.x;
    let mouseY = MouseRef.pos.y;

    timere+=1;
    if(titlescene===false&&gametype===1){
        //Block Dodger
    PX = pos*100;
    background(0, 0, 0);
    for(let a = 0; a < backgroundsystems.length; a++){
        backgroundsystems[a].addbParticle();
        backgroundsystems[a].run();
    }
    block1();
    block2();
    block3();
    for(let a = 0; a < psystems.length; a++){
        psystems[a].addpParticle();
        psystems[a].run();
    }
    if(upgrade1===true){
    fill(255, 255, 255);
    if(hp===2){
        fill(0, 119, 255);
    }
    if(timere>=0){
    rect(PX,550,100,100,10);
    }
    }
    if(upgrade4===true){
        fill(255, 221, 0);
        arc(PX+50, 570, 100, 50, -58, 250);
        fill(0, 0, 0);
        fill(255, 221, 0);
        if(hp===2){
            fill(255, 0, 0);
            if(pactime>20){
                fill(255, 255, 255);
            }if(pactime>40){
                fill(255, 255, 255);
                pactime=0;
            }
            pactime+=1;
        }
        arc(PX+50, 570, 100, 50, -58, 250);
        
    }
    if(upgrade7===true){
        fill(255, 255, 255);
        ellipse(PX+50,600,100,100);
    }
    if(upgrade10===true){
        pushMatrix();
translate(-100+PX,290);
    fill(255, 255, 255);
strokeWeight(2);
fill(0, 0, 0, 60);
for (let i = 0; i < drawing.length; i++) {
    stroke(drawing[i][0]);
    for (let ii = 1; ii < drawing[i].length-1; ii++) {
        line(drawing[i][ii][0], drawing[i][ii][1], drawing[i][ii + 1][0], drawing[i][ii + 1][1]);
    }
    
}
popMatrix();
    if(hp===2){
        fill(0, 119, 255);
strokeWeight(2);
pushMatrix();
translate(-200,0);
for (let i = 0; i < drawing.length; i++) {
    stroke(drawing[i][0]);
    for (let ii = 1; ii < drawing[i].length-1; ii++) {
        line(drawing[i][ii][0], drawing[i][ii][1], drawing[i][ii + 1][0], drawing[i][ii + 1][1]);
    }
}
popMatrix();
    }
    strokeWeight(1);
    stroke(0, 0, 0);
    fill(255, 255, 255);
    rect(PX,550,100,100,10);
    }
    stroke(66, 66, 66);
    line(100,0,100,600);
    line(200,0,200,600);
    line(300,0,300,600);
    fill(255, 255, 255);
    textSize(50);
    text(score,150,100);
    text(topscore,150,150);
    //hole in the wall
    }else if(titlescene===false && gametype===2){
        PX = pos*100;
         background(0, 0, 0);
         for(let a = 0; a < backgroundsystems.length; a++){
        backgroundsystems[a].addbParticle();
        backgroundsystems[a].run();
    }
        hole();
        for(let a = 0; a < psystems.length; a++){
        psystems[a].addpParticle();
        psystems[a].run();
    }
    if(upgrade1===true){
        fill(255, 255, 255);
        if(hp===2){
        fill(0, 119, 255);
    }
    if(timere>=0){
    rect(PX,550,100,100,10);
    }
    }
    if(upgrade4===true){
        fill(255, 221, 0);
        arc(PX+50, 570, 100, 50, -58, 250);
        fill(0, 0, 0);
        fill(255, 221, 0);
        if(hp===2){
            fill(255, 0, 0);
            if(pactime>20){
                fill(255, 255, 255);
            }if(pactime>40){
                fill(255, 255, 255);
                pactime=0;
            }
            pactime+=1;
        }
        arc(PX+50, 570, 100, 50, -58, 250);
        
    }
    if(upgrade7===true){
        fill(255, 255, 255);
        ellipse(PX+50,600,100,100);
    }
    if(upgrade10===true){
    fill(255, 255, 255);
    if(hp===2){
        fill(0, 119, 255);
    }
    
    rect(PX,550,100,100,10);
    
    }
    stroke(66, 66, 66);
    line(100,0,100,600);
    line(200,0,200,600);
    line(300,0,300,600);
    fill(255, 255, 255);
    textSize(50);
    text(hscore,150,100);
    text(htopscore,150,150);
    //titlescene
    }else if(titlescene===false && gametype===3){
    background(0, 0, 0);
    for(let a = 0; a < backgroundsystems.length; a++){
        backgroundsystems[a].addbParticle();
        backgroundsystems[a].run();
    }
    PX = pos*100;
        shoot();
        fill(255, 255, 255);
        if(upgrade1===true){
        if(hp===2){
        fill(0, 119, 255);
    }
    if(timere>=0){
    rect(PX,550,100,100,10);
    }
    fill(0, 0, 0);
    if(ammo-subjects.length===3){
        
        if(timere>=0){
               fill(130, 130, 130);
               rect(PX,550,100,50);
        }
        
    }
    if(ammo-subjects.length===2){
        fill(130, 130, 130);
        if(timere>=0){
        rect(PX,550,60,50);
        }
    }
    if(ammo-subjects.length===1){
        fill(130, 130, 130);
        if(timere>=0){
        rect(PX,550,30,50);
        }
    }
        }
        if(upgrade4===true){
            if(timere>=0){
        fill(255, 221, 0);
        arc(PX+50, 570, 100, 50, -58, 250);
        fill(0, 0, 0);
        fill(255, 221, 0);
        if(hp===2){
            fill(255, 0, 0);
            if(pactime>20){
                fill(255, 255, 255);
            }if(pactime>40){
                fill(255, 255, 255);
                pactime=0;
            }
            pactime+=1;
        }
        arc(PX+50, 570, 100, 50, -58, 250);
            }
    }
    if(upgrade7===true){
        if(timere>=0){
        fill(255, 255, 255);
        ellipse(PX+50,600,100,100);
        }
    }
    if(upgrade10===true){
        if(hp===2){
        fill(0, 119, 255);
    }
    if(timere>=0){
    rect(PX,550,100,100,10);
    }
    }
    stroke(66, 66, 66);
    line(100,0,100,600);
    line(200,0,200,600);
    line(300,0,300,600);
    fill(100, 150, 150);
    textSize(50);
    text(shootscore,150,100);
    text(shoothighscore,150,150);
    }else{
        background(0, 0, 0);
         fill(255, 255, 255);
            textSize(50);
            if(page===1&&gametype===1){
            background(0, 0, 0);
            stroke(66, 66, 66);
            line(100,0,100,600);
            line(200,0,200,600);
            line(300,0,300,600);
            fill(255, 0, 0,100);
            rect(300,175,100,50,30);
            fill(255, 100, 0,100);
            rect(100,284,100,50,20);
            fill(255, 255, 0,100);
            rect(0,59,100,50,10); 
            fill(255, 255, 255,100);
            rect(200,550,100,100,10);
            fill(255, 255, 255);
            textSize(20);
            if(phonesize>0){
           text(" Tap edges to swich pages",46,555);
             text("Tap 2nd line to start",114,593);
            }else{
                text("Arrow keys to swich pages",85,571);
             text("Spacebar to start",114,593);
                
            }
            textSize(50);
            text("Block Dodger",59,161);
            if(mastery === true){
                fill(255, 234, 0);
                textSize(30);
                text("Master Mode",200,200);
                fill(255, 255, 255);
            }
            }
            if(page===1&&gametype===2){
            background(0, 0, 0);
            stroke(66, 66, 66);
            line(100,0,100,600);
            line(200,0,200,600);
            line(300,0,300,600);
            fill(255, 255, 255,100);
            rect(0,315,400,50,0);
            fill(0, 0, 0);
            rect(0,315,100,50,0);
            fill(255, 255, 255,100);
            rect(100,550,100,100,10);
            fill(255, 255, 255);
            textSize(20);
            if(phonesize>0){
           text(" Tap 1/3 line to swich pages, top/bottem of screen to swich games",85,571);
             text("Tap 2nd line to start",114,593);
            }else{
                text("Arrow keys to swich pages",85,571);
             text("Spacebar to start",114,593);
                
            }
             
            textSize(50);
            text("Hole in the wall",33,161);
            if(mastery === true){
                fill(255, 234, 0);
                textSize(30);
                text("Master Mode",200,200);
                fill(255, 255, 255);
            }
            }
            if(page===1&&gametype===3){
                background(0, 0, 0);
                stroke(66, 66, 66);
            line(100,0,100,600);
            line(200,0,200,600);
            line(300,0,300,600);
                textSize(50);
            text("Block Shooter",33,161);
                fill(255, 255, 255,100);
                rect(100,550,100,100,10);
                rect(0,200,100,50,10);
                rect(100,200,100,50,10);
                rect(200,200,100,50,10);
                rect(300,250,100,50,10);
                rect(0,250,100,50,10);
                rect(100,250,100,50,10);
                rect(200,250,100,50,10);
                rect(300,200,100,50,10);
                
                fill(255,0,0,100);
                rect(150,400,10,50,10);
                
                
                
                
                
                
                
                fill(255, 255, 255);
            textSize(20);
            if(phonesize>0){
           text(" Tap 1/3 line to swich pages, top/bottem of screen to swich games",85,571);
             text("Tap 2nd line to start",114,593);
            }else{
                text("Arrow keys to swich pages",85,571);
             text("Spacebar to start",114,593);
                
            }
            if(mastery === true){
                fill(255, 234, 0);
                textSize(30);
                text("Master Mode",200,200);
                fill(255, 255, 255);
            }
            }
            if(page===1&& gametype===-1){
                text("The shop",96,48);
                textSize(19);
                text("Points: "+points,100,80);
                strokeWeight(3);
                text("Skill Points: "+skillpoints,100,100);
                fill(0, 0, 0);
                rect(10,50,80,60);
                if(mouseIsPressed && points>=1000 && mouseX>10 && mouseX<90 && mouseY>50&&mouseY<110){
                    skillpoints+=1;
                    points-=1000;
                }
                strokeWeight(1);
                fill(255, 255, 255);
                text("Convert 1000 p",15,61,69,50);
                text("|Player|       |Blocks|      |Lazer|",60,135);
                text("Free",5,200);
                text("1",20,300);
                text("2",20,400);
                text("3",20,500);
                rect(50,150,100,100);
                rect(150,150,100,100);
                rect(250,150,100,100);
                rect(50,250,100,100);
                rect(150,250,100,100);
                rect(250,250,100,100);
                rect(50,350,100,100);
                rect(150,350,100,100);
                rect(250,350,100,100);
                rect(50,450,100,100);
                rect(150,450,100,100);
                rect(250,450,100,100);
                fill(0, 0, 0);
                if(gametype===-1){
                if(upgrade1 === true){
                    fill(0, 255, 0);
                }
                rect(51,151,98,98);
                fill(0, 0, 0);
                if(upgrade2 === true){
                    fill(0, 255, 0);
                }
                rect(151,151,98,98);
                fill(0, 0, 0);
                if(upgrade3 === true){
                    fill(0, 255, 0);
                }
                rect(251,151,98,98);
                fill(0, 0, 0);
                if(upgrade4 === true){
                    fill(0, 255, 0);
                }
                rect(51,251,98,98);
                fill(0, 0, 0);
                if(upgrade5 === true){
                    fill(0, 255, 0);
                }
                rect(151,251,98,98);
                fill(0, 0, 0);
                if(upgrade6 === true){
                    fill(0, 255, 0);
                }
                rect(251,251,98,98);
                fill(0, 0, 0);
                if(upgrade7 === true){
                    fill(0, 255, 0);
                }
                rect(51,351,98,98);
                fill(0, 0, 0);
                if(upgrade8 === true){
                    fill(0, 255, 0);
                }
                rect(151,351,98,98);
                fill(0, 0, 0);
                if(upgrade9 === true){
                    fill(0, 255, 0);
                }
                rect(251,351,98,98);
                fill(0, 0, 0);
                if(upgrade10 === true){
                    fill(0, 255, 0);
                }
                rect(51,451,98,98);
                fill(0, 0, 0);
                if(upgrade11 === true){
                    fill(0, 255, 0);
                }
                rect(151,451,98,98);
                fill(0, 0, 0);
                if(upgrade12 === true){
                    fill(0, 255, 0);
                }
                rect(251,451,98,98);
                mouseReleased = function(){
                    if(gametype===-1){
                {
                if(mouseIsPressed && mouseX>50 && mouseY>150&&mouseX<150&&mouseY<250&&u1b===false){
                    upgrade1 = true;
                    u1b  =true;
                }else
                if(mouseIsPressed && mouseX>50 && mouseY>150&&mouseX<150&&mouseY<250 && upgrade1===true){
                    upgrade1 = false;
                }else
                if(mouseIsPressed && mouseX>50 && mouseY>150&&mouseX<150&&mouseY<250&&u1b===true&&upgrade1===false){
                    upgrade1 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>150 && mouseY>150&&mouseX<250&&mouseY<250&&u2b===false){
                    upgrade2 = true;
                    u2b  =true;
                }else
                if(mouseIsPressed && mouseX>150 && mouseY>150&&mouseX<250&&mouseY<250 && upgrade2===true){
                    upgrade2 = false;
                }else
                if(mouseIsPressed && mouseX>150 && mouseY>150&&mouseX<250&&mouseY<250&&u2b===true&&upgrade2===false){
                    upgrade2 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>250 && mouseY>150&&mouseX<350&&mouseY<250&&u3b===false){
                    upgrade3 = true;
                    u3b  =true;
                }else
                if(mouseIsPressed && mouseX>250 && mouseY>150&&mouseX<350&&mouseY<250 && upgrade3===true){
                    upgrade3 = false;
                }else
                if(mouseIsPressed && mouseX>250 && mouseY>150&&mouseX<350&&mouseY<250&&u3b===true&&upgrade3===false){
                    upgrade3 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>50 && mouseY>250&&mouseX<150&&mouseY<350&&u4b===false&&skillpoints>=1){
                    upgrade4 = true;
                    u4b  =true;
                    skillpoints-=1;
                }else
                if(mouseIsPressed && mouseX>50 && mouseY>250&&mouseX<150&&mouseY<350 && upgrade4===true){
                    upgrade4 = false;
                }else
                if(mouseIsPressed && mouseX>50 && mouseY>250&&mouseX<150&&mouseY<350&&u4b===true&&upgrade4===false){
                    upgrade4 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>150 && mouseY>250&&mouseX<250&&mouseY<350&&u5b===false&&skillpoints>=1){
                    upgrade5 = true;
                    u5b  =true;
                    skillpoints-=1;
                }else
                if(mouseIsPressed && mouseX>150 && mouseY>250&&mouseX<250&&mouseY<350 && upgrade5===true){
                    upgrade5 = false;
                }else
                if(mouseIsPressed && mouseX>150 && mouseY>250&&mouseX<250&&mouseY<350&&u5b===true&&upgrade5===false){
                    upgrade5 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>250 && mouseY>250&&mouseX<350&&mouseY<350&&u6b===false&&skillpoints>=1){
                    upgrade6 = true;
                    u6b  =true;
                    skillpoints-=1;
                }else
                if(mouseIsPressed && mouseX>250 && mouseY>250&&mouseX<350&&mouseY<350 && upgrade6===true){
                    upgrade6 = false;
                }else
                if(mouseIsPressed && mouseX>250 && mouseY>250&&mouseX<350&&mouseY<350&&u6b===true&&upgrade6===false){
                    upgrade6 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>50 && mouseY>350&&mouseX<150&&mouseY<450&&u7b===false&&skillpoints>=2){
                    upgrade7 = true;
                    u7b  =true;
                    skillpoints-=2;
                }else
                if(mouseIsPressed && mouseX>50 && mouseY>350&&mouseX<150&&mouseY<450 && upgrade7===true){
                    upgrade7 = false;
                }else
                if(mouseIsPressed && mouseX>50 && mouseY>350&&mouseX<150&&mouseY<450&&u7b===true&&upgrade7===false){
                    upgrade7 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>150 && mouseY>350&&mouseX<250&&mouseY<450&&u8b===false&&skillpoints>=2){
                    upgrade8 = true;
                    u8b  =true;
                    skillpoints-=2;
                }else
                if(mouseIsPressed && mouseX>150 && mouseY>350&&mouseX<250&&mouseY<450 && upgrade8===true){
                    upgrade8 = false;
                }else
                if(mouseIsPressed && mouseX>150 && mouseY>350&&mouseX<250&&mouseY<450&&u8b===true&&upgrade8===false){
                    upgrade8 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>250 && mouseY>350&&mouseX<350&&mouseY<450&&u9b===false&&skillpoints>=2){
                    upgrade9 = true;
                    u9b  =true;
                    skillpoints-=2;
                }else
                if(mouseIsPressed && mouseX>250 && mouseY>350&&mouseX<350&&mouseY<450 && upgrade9===true){
                    upgrade9 = false;
                }else
                if(mouseIsPressed && mouseX>250 && mouseY>350&&mouseX<350&&mouseY<450&&u9b===true&&upgrade9===false){
                    upgrade9 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>50 && mouseY>450&&mouseX<150&&mouseY<550&&u10b===false&& skillpoints>=3){
                    upgrade10 = true;
                    u10b  =true;
                    skillpoints-=3;
                }else
                if(mouseIsPressed && mouseX>50 && mouseY>450&&mouseX<150&&mouseY<550 && upgrade10===true){
                    upgrade10 = false;
                }else
                if(mouseIsPressed && mouseX>50 && mouseY>450&&mouseX<150&&mouseY<550&&u10b===true&&upgrade10===false){
                    upgrade10 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>150 && mouseY>450&&mouseX<250&&mouseY<550&&u11b===false&&skillpoints>=3){
                    upgrade11 = true;
                    u11b  =true;
                    skillpoints-=3;
                }else
                if(mouseIsPressed && mouseX>150 && mouseY>450&&mouseX<250&&mouseY<550 && upgrade11===true){
                    upgrade11 = false;
                }else
                if(mouseIsPressed && mouseX>150 && mouseY>450&&mouseX<250&&mouseY<550&&u11b===true&&upgrade11===false){
                    upgrade11 = true;
                }
                }
                {
                if(mouseIsPressed && mouseX>250 && mouseY>450&&mouseX<350&&mouseY<550&&u12b===false&&skillpoints>=3){
                    upgrade12 = true;
                    u12b  =true;
                    skillpoints-=3;
                }else
                if(mouseIsPressed && mouseX>250 && mouseY>450&&mouseX<350&&mouseY<550 && upgrade12===true){
                    upgrade12 = false;
                }else
                if(mouseIsPressed && mouseX>250 && mouseY>450&&mouseX<350&&mouseY<550&&u12b===true&&upgrade12===false){
                    upgrade12 = true;
                }
                }
                }
                };
                }
                
            }
            if(page===2 &&gametype===1){
                fill(255, 255, 255);
                text("How to Play",56,70);
                textSize(20);
                text("     Press right/left keys to move.  \nThe first number is your score, and the second  is your high score.  \nWARNING: Reloading wipes out your high score!                                                                                                  \n\nBlock dodger:   You have to survive as long as you can! Collect the yellow blocks to gain score and get a one-hit immunity.                                                                                                                                                                                                                                                                                       \n\n Press left to go back to tittle screen",0,93,400,600);
            }
            if(page===2  &&gametype===2){
                fill(255, 255, 255);
            text("How to Play",56,70);
                textSize(20);
                text("                    Hole in the Wall:                                 Press right or left to move.                 Move your player into the hole in the falling walls.  When you do, you will be rewarded with 1 immunity damage. This will allow you to take a hit.                                                                                                            You will be rewrded with a super point every 20 score.                                                                                                                                                                                Press Left arrow to go back to game selection.",0,93,400,600);
                
                
            }
            if(page===2 &&gametype===3){
                fill(255, 255, 255);
            text("How to Play",56,70);
                textSize(20);
                text("                    Block Shooter:                            Right/left to move, and up key to shoot                 Move your player underneth the blocks and shoot them down. If even one gets past your defence, you lose.                                                                             You will be rewrded with a super point every 200 score.                                                                                                                                                                                Press Left arrow to go back to game selection.",0,93,400,600);
            }
            if(page === 0 && mastery===false&&gametype===1){
                textSize(50);
                 text("Leaderboards",42,45);  
                 textSize(30);
              text("Block Dodger",103,110); 
              textSize(20);
              text(" 1.  Eligamer567: 183",14,140); 
              text(" 2.  DoodleBob69: 96",14,200); 
              text(" 2.  Blakebrowns213456-6: 96",14,170); 
              text(" 4.  N/A",14,230); 
              text(" 5.  N/A",14,260);
              text(" 6.  N/A",14,290); 
              text(" 7.  N/A",14,320); 
              text(" 8.  N/A",14,350); 
              text(" 9.  N/A",14,380); 
              text("10.  N/A",14,410);
              text("11.  N/A",14,440); 
              text("12.  N/A",14,470); 
              text("13.  N/A",14,500); 
              text("14.  N/A",14,530); 
              text("15.  noice: 69",14,560);
            }
            if(page === 0 && mastery===false&&gametype===2){
                textSize(50);
                 text("Leaderboards",42,45);  
              textSize(30);
              text("Hole in the wall",101,110);  
              
              textSize(20);
              text(" 1. Blakebrowns213456-6: 48",14,140); 
              text(" 2.  Eligamer567: 46",14,170); 
              text(" 3.  Eligamer567: 46",14,200); 
              text(" 4.  Eligamer567: 46",14,230); 
              text(" 5.  Eligamer567: 46",14,260);
              text(" 6.  Eligamer567: 46",14,290); 
              text(" 7.  Eligamer567: 46",14,320); 
              text(" 8.  Eligamer567: 46",14,350); 
              text(" 9.  Eligamer567: 46",14,380); 
              text("10.  Eligamer567: 46",14,410);
              text("11.  Eligamer567: 46",14,440); 
              text("12.  Eligamer567: 46",14,470); 
              text("13.  Eligamer567: 46",14,500); 
              text("14.  Eligamer567: 46",14,530); 
              text("15.  Eligamer567: 46",14,560);
            }
            if(page === 0 && mastery===false&&gametype===3){
                textSize(50);
                 text("Leaderboards",42,45);  
              textSize(30);
              text("Block Shooter",101,110);  
              textSize(20);
              text("1. Eligamer567: 96",14,140); 
              text("2. Eligamer567: 96",14,170);
              text("3. Eligamer567: 96",14,200); 
              text("4. Eligamer567: 96",14,230);
              text("5. Eligamer567: 96",14,260); 
              text("6. Eligamer567: 96",14,290);
              text("7. Eligamer567: 96",14,320); 
              text("8. Eligamer567: 96",14,350);
              text("9. Eligamer567: 96",14,380); 
              text("10. Eligamer567: 96",14,410);
              text("11. Eligamer567: 96",14,440); 
              text("12. Eligamer567: 96",14,470);
              text("13. Eligamer567: 96",14,500); 
              text("14. Eligamer567: 96",14,530);
              text("15. Eligamer567: 96",14,560); 
            }
            if(page === 0 && mastery===true){
                textSize(50);
                 text("Leaderboards",42,45); 
                 if(mastery === true){
                fill(255, 234, 0);
                textSize(30);
                text("Master Mode",200,86);
                fill(255, 255, 255);
            }
                 textSize(30);
              text("Block Dodger",103,155); 
              textSize(20);
              text("Eligamer567: 78",14,190); 
              
              textSize(30);
              text("Hole in the wall",101,348);  
              textSize(20);
              text("Eligamer567: 30",14,394);  
              textSize(30);
              text("Block Shooter",101,488);  
              textSize(20);
              text("Eligamer567: 29 ",14,513); 
            }
            keyPressed = function(){
                if(KeysRef.pressed('ArrowRight')&& page !==2){
                    page += 1;
                }
                if(KeysRef.pressed('ArrowLeft')&& page !==0){
                    page -= 1;
                }
                if(KeysRef.pressed(' ') && gametype===1 && titlescene === false){
                    titlescene=true;
                    page=1;
                }else
                if(KeysRef.pressed(' ') && gametype===2 && titlescene === false){
                    titlescene=true;
                    page=1;
                }else
                if(KeysRef.pressed(' ') && gametype===2 && titlescene === true){
                    titlescene=false;
                    page=1;
                }else
                if(KeysRef.pressed(' ') && gametype===1 && titlescene === true){
                    titlescene=false;
                    page=1;
                    console.log('hello')
                }else
                if(KeysRef.pressed(' ') && gametype===3 && titlescene === false){
                    titlescene=true;
                    page=1;
                }else
                if(KeysRef.pressed(' ') && gametype===3 && titlescene === true){
                    titlescene=false;
                    page=1;
                }
            };
    }
    
    if(gametype===10){
        rectMode(CENTER);
        textSize(25);
        fill(255, 255, 255);
        text("Are you playing on mobile or PC",9,50);
        text("Mobile",91,200);
        text("PC",227,200);
        rect(125,250,50+phonesize,100+phonesize*2);
        fill(0, 0, 0);
        rect(125,250,46+phonesize,96+phonesize*2);
        fill(255, 255, 255);
        rect(250,225,100+PCsize*2,50+PCsize);
        fill(0, 0, 0);
        rect(250,225,96+PCsize*2,46+PCsize);
        if(mouseIsPressed && mouseX<200){
            phonesize+=1;
        }
         if(phonesize<600&&phonesize>0){
                phonesize+=10;
            }if(phonesize>600){
            gametype=1;
            version="1";
            }
            if(PCsize<600&&PCsize>0){
                PCsize+=10;
            }if(PCsize>600){
            gametype=1;
            version="2";
            }
        if(mouseIsPressed && mouseX>200){
            PCsize+=1;
        }
        rectMode(CORNER);
    }
    frameRate(69);
    //Noice
    //Checks you highscore is true
      if(topscore<score){
        topscore=score;
    }
     if(htopscore<hscore){
        htopscore=hscore;
    }

    DrawRef.rect(new Vector(width,0), new Vector(mainWidth-width,height+2), color(0,0,0,1,'rgb'), true); //blackout right side
    DrawRef.rect(new Vector(-1,height), new Vector(mainWidth+2,mainHeight-height+1), color(0,0,0,1,'rgb'), true); //blackout bottom
};
//How the player moves




/** Break */



// Runner
let drawSignal = new Signal();
drawSignal.connect(()=>{
    draw();
    if(MouseRef.pressed('left')) mouseClicked();
    if(KeysRef.pressed('any')) {keyReleased();};
    if(KeysRef.pressed('any')) {keyPressed();};
})
return drawSignal;
}
