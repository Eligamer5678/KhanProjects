import Vector from '../js/Vector.js';
import Signal from '../js/Signal.js';

export function frameRate(rate){
    // do nothing lol
}
import Color from '../js/Color.js';
import Draw from '../js/Draw.js';
function color(r,g,b,a=1){return new Color(r,g,b,a,'rgb');}


export function BlockDodger(DrawRef, MouseRef, KeysRef, sessionTimer){
// Khan-like functions
let globalfillColor = color(255,255,255,1,'rgb');
let globalStrokeColor = color(0,0,0,'1','rgb');
let globalStroke = 2;
let globalTextSize = 12;

function rect(x,y,w,h,r=0){
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
let width = 400;
let height = 600;
function background(r,g,b,a=1){
    DrawRef.background(color(r,g,b,a,'rgb'));
}
function fill(r,g,b,a=1){
    globalfillColor = color(r,g,b,a,'rgb');
}
function stroke(r,g,b,a=1){
    globalStrokeColor = color(r,g,b,a,'rgb');
}
function noStroke(){
    globalStroke = 0;
}
function text(str,x,y){
    DrawRef.text(str,new Vector(x,y) , globalfillColor, 1, globalTextSize);
}
function textSize(size){
    globalTextSize = size;
}
function round(num){
    return Math.round(num);
}

function mouseClicked(){} //dummy
function draw(){} //dummy



// Warning: keyCode = VALUE will need to be replaced with KeysRef.pressed('keyname')
// replace 'var' with 'let' or 'const' as needed
// Example: var click = 0;  --> let click = 0;

// Redeclare these at start of draw()
let mouseIsPressed = MouseRef.held('left');
let mouseX = MouseRef.pos.x;
let mouseY = MouseRef.pos.y;

// Paste code below this line to use!



/**Break*/


 
 var dogespeed = 1;
var dogespeed2 =2;
var m = millis();
var sscore = 1;
var hits = 0;
var START = 0;  var super_hit = 0;
   var a = 380; 
   var player = function(){
    ellipse(mouseX,600,100,100);
};


var score = 0; 
var game1 = 1;
var GAMEOVER = function(){
    background(255,255,255);
    text("GAMEOVER",200,20,100,50);
    text(score,200,40,100,50);
    noLoop();
};
var danger = function(){
    fill(12, 22, 82);
line(a,0,a,600);
if(mouseX > 379){
    super_hit+=1;
    
}
if(super_hit>100){
    hits+=1;
    super_hit = 0;
}
};

var speed = 0;
var NOPEX = mouseX;
var NOPEY = 0 + speed;
var NOPE = function(){
    fill(255, 0, 0);
    rect(NOPEX,NOPEY,50,50);
    fill(255, 255, 255);
    ellipse(NOPEX+25,NOPEY+25,50,50);
};
var speed2 = 20;
var NOPE2X = mouseX;
var NOPE2Y = 0 + speed;
var NOPE2 = function(){
    fill(255, 150, 0);
    fill(255, 255, 255);
    fill(92, 60, 0);
    ellipse(NOPE2X+25,NOPE2Y+25,50,50);
    ellipse(NOPE2X+25,NOPE2Y+25,38,50);
    ellipse(NOPE2X+25,NOPE2Y+25,21,50);
    ellipse(NOPE2X+25,NOPE2Y+25,18,50);
     ellipse(NOPE2X+5,NOPE2Y+25,12,93);
     ellipse(NOPE2X+25,NOPE2Y+25,12,93);
     ellipse(NOPE2X+48,NOPE2Y+25,12,93);
    
};

draw= function() {
    mouseIsPressed = MouseRef.held('left');
    mouseX = MouseRef.pos.x;
    mouseY = MouseRef.pos.y;

    // [new] Quick mouse position lock
    if(mouseX > 400) mouseX = 400;

    m = millis();
    m = m/1000;
    if (mouseIsPressed){ 
        START+=1;
    }
    if(START>1){
    
    background(56, 56, 56);
    player();
    NOPE();
    NOPE2();
    //NOPE
    if(NOPEY > 600) {
    NOPEY = 0;
    score+=sscore;
    dogespeed+=0.1;
    speed = dogespeed;

    NOPEX = mouseX- 25;
    }
    if(NOPEY < 1){
        speed = dogespeed;
        
    }
    NOPEY = NOPEY + speed;

    //NOPE2

    if(NOPE2Y > 600) {
    NOPE2Y = 0;
    score+=sscore;
    dogespeed2+=0.1;
    NOPE2X = mouseX- 25;
    }
    if(NOPE2Y < 1){
        speed2 = dogespeed2;
        
    }
    NOPE2Y = NOPE2Y + speed2;


    //colision boxes & game over & score
    if(NOPEX > mouseX - 100 && NOPEX < mouseX+50 && NOPEY> 524){               
        background(255, 255, 255);
        hits+=1;
    NOPEY = 0;
        

    }
    if(NOPE2X > mouseX - 75 && NOPE2X < mouseX+25 && NOPE2Y> 524){
        background(255, 255, 255);
    hits+=1;
    NOPE2Y = 0;
    }
    //score      
    if(hits >5  ){     
        fill(0, 0, 0);      
        game1 = 2;
    }
    if(game1 === 2){
    GAMEOVER();
    }
    if(game1 === 2 && mouseIsPressed){
        hits = 0;
        score = 0;
        game1 = 1;
        START = 0;

    }
    if(score>100){
        fill(255, 0, 0);
    danger();   
    }


    fill(255, 255, 255);
    text(score,200,20,200,100);
    text(hits,200,50,200,100);
    text(super_hit,200,70,200,100);
    text(m,200,200);
    }else{
        //title scene
        if(START<1){
            background(0, 0, 0);
            //title Text
            text("Tap to play!",180,200,100,50);
            text("Block Dodger", 180,30,100,50);
            //Title NOPE
            fill(255, 0, 0);
            rect(200,300,50,50);
            fill(255, 255, 255);
            ellipse(225,325,50,50);
            //Title NOPE2
            fill(255, 150, 0);
            rect(80,83,50,50);
            fill(255, 255, 255);
            ellipse(105,108,50,50);
            
            //title player
            ellipse(200,600,100,100);
        }
    }
    //blackout screen areas
    DrawRef.rect(new Vector(width,0), new Vector(1920-width,height+2), color(0,0,0,1,'rgb'), true); //blackout right side
    DrawRef.rect(new Vector(-1,height), new Vector(1922,1080-height+1), color(0,0,0,1,'rgb'), true); //blackout bottom

};





/** Break */



// Runner
let drawSignal = new Signal();
drawSignal.connect(()=>{
    draw();
    if(MouseRef.pressed('left')) mouseClicked();
})
return drawSignal;
}
