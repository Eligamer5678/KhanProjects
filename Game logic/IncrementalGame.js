import Vector from '../js/Vector.js';
import Signal from '../js/Signal.js';
import Color from '../js/Color.js';



export function IncrementalGame(DrawRef, MouseRef, KeysRef, sessionTimer){


// Khan-like globals
let globalfillColor = color(255,255,255,1,'rgb');
let globalStrokeColor = color(0,0,0,'1','rgb');
let globalStroke = 2;
let globalTextSize = 12;

function color(r,g,b,a=1){return new Color(r,g,b,a,'rgb');}
function frameRate(rate){
    // do nothing lol
}
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

let width = 400;
let height = 400;
function background(r,g,b,a=1){
    DrawRef.background(color(r,g,b,a,'rgb'));
}
function fill(r,g,b,a=1){
    globalfillColor = color(r,g,b,a,'rgb');
}
function millis(){
    return sessionTimer.getTime()*1000;
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
let mouseIsPressed = MouseRef.held('left',true) > 0 ? true : false;
let mouseX = MouseRef.pos.x;
let mouseY = MouseRef.pos.y;

// Paste code below this line to use!



/**Break*/




/*
Make A Idle game. It has to be incremental.

This is an example of a incremental game.

*/
var click = 0;
var clicky = 1;
var clickformoney = function(){
    fill(0, 0, 0);
    textSize(50);
    text("$"+round(click),9,43);
mouseClicked = function(){
click+=clicky;
};
if(KeysRef.pressed(' ')){
    click+=clicky;
}
};
//a
{
var item1time = 0;
var it1time = 0;
var price = 99;
var itemA = function(){
    fill(255, 0, 0);
    rect(0,75,399,25);
    if(item1time > 50.1){
         click+=it1time;
    }
    if(item1time > 50.2){
        item1time = 0;
    }
     item1time+=1+it1time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>75 && mouseY<100 && click>price){
    it1time+=1;
     click-=price;
    price*=1.5;
}
 text("$"+it1time+" per second   "+"$"+round(price),18,96);
};
}
//b
{
var item2time = 0;
var it2time = 0;
var price2 =499;
var itemB = function(){
    fill(255, 85, 0);
    rect(0,100,399,25);
    if(item2time > 50){
         click+=it2time;
    }
    if(item2time > 50){
        item2time = 0;
    }
     item2time+=1+it2time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>100 && mouseY<125 && click>price2){
    it2time+=5;
     click-=price2;
    price2*=1.5;
}
 text("$"+it2time+" per second   "+"$"+round(price2),18,121);
};
}
//c
{
var item3time = 0;
var it3time = 0;
var price3 =999;
var itemC = function(){
    fill(255, 145, 0);
    rect(0,125,399,25);
    if(item3time > 50){
         click+=it3time;
    }
    if(item3time > 50){
        item3time = 0;
    }
     item3time+=1+it3time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>125 && mouseY<150 && click>price3){
    it3time+=15;
     click-=price3;
    price3*=1.5;
}
 text("$"+it3time+" per second   "+"$"+round(price3),18,145);
};
}
//d
{
var item4time = 0;
var it4time = 0;
var price4 =2499;
var itemD = function(){
    fill(255, 179, 0);
    rect(0,150,399,25);
    if(item4time > 50){
         click+=it4time;
    }
    if(item4time > 50){
        item4time = 0;
    }
     item4time+=1+it4time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>150 && mouseY<175 && click>price4){
    it4time+=25;
     click-=price4;
    price4*=1.5;
}
 text("$"+it4time+" per second   "+"$"+round(price4),18,171);
};
}
//e
{
var item5time = 0;
var it5time = 0;
var price5 = 5000;
var itemE = function(){
    fill(255, 255, 0);
    rect(0,175,399,25);
    if(item5time > 50){
         click+=it5time;
    }
    if(item5time > 50){
        item5time = 0;
    }
     item5time+=1+it5time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>175 && mouseY<200 && click>price5){
    it5time+=50;
     click-=price5;
    price5*=1.5;
}
 text("$"+it5time+" per second   "+"$"+round(price5),18,197);
};
}
//f
{
var item6time = 0;
var it6time = 0;
var price6 =25000;
var itemF = function(){
    fill(136, 255, 0);
    rect(0,200,399,25);
    if(item6time > 50){
         click+=it6time;
    }
    if(item6time > 50){
        item6time = 0;
    }
     item6time+=1+it6time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>200 && mouseY<225 && click>price6){
    it6time+=100;
     click-=price6;
    price6*=1.5;
}
 text("$"+it6time+" per second   "+"$"+round(price6),18,221);
};
}
//g
{
var item7time = 0;
var it7time = 0;
var price7 =50000;
var itemG = function(){
    fill(43, 255, 0);
    rect(0,225,399,25);
    if(item7time > 50){
         click+=it7time;
    }
    if(item7time > 50){
        item7time = 0;
    }
     item7time+=1+it7time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>225 && mouseY<250 && click>price7){
    it7time+=250;
     click-=price7;
    price7*=1.5;
}
 text("$"+it7time+" per second   "+"$"+round(price7),18,245);
};
}
//h
{
var item8time = 0;
var it8time = 0;
var price8 = 125000;
var itemH = function(){
    fill(0, 255, 119);
    rect(0,250,399,25);
    if(item8time > 50){
         click+=it8time;
    }
    if(item8time > 50){
        item8time = 0;
    }
     item8time+=1+it8time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>250 && mouseY<275 && click>price8){
    it8time+=600;
     click-=price8;
    price8*=1.5;
}
 text("$"+it8time+" per second   "+"$"+round(price8),18,271);
};
}
//i
{
var item2time = 0;
var it2time = 0;
var price2 =499;
var itemI = function(){
    fill(255, 119, 0);
    rect(0,100,399,25);
    if(item2time > 75){
         click+=it2time;
    }
    if(item2time > 75){
        item2time = 0;
    }
     item2time+=1+it2time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>100 && mouseY<125 && click>price2){
    it2time+=1000;
     click-=price2;
    price2*=1.5;
}
 text("$"+it2time+" per second   "+"$"+round(price2),18,121);
};
}
//j
{
var item3time = 0;
var it3time = 0;
var price3 =999;
var itemJ = function(){
    fill(255, 247, 0);
    rect(0,125,399,25);
    if(item3time > 150){
         click+=it3time;
    }
    if(item2time > 150){
        item3time = 0;
    }
     item3time+=1+it3time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>125 && mouseY<150 && click>price3){
    it2time+=15;
     click-=price3;
    price3=1.5;
}
 text("$"+it3time+" per second   "+"$"+round(price3),18,145);
};
}
//k
{
var item4time = 0;
var it4time = 0;
var price4 =2499;
var itemK = function(){
    fill(13, 255, 0);
    rect(0,150,399,25);
    if(item4time > 500){
         click+=it4time;
    }
    if(item4time > 500){
        item4time = 0;
    }
     item4time+=1+it4time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>150 && mouseY<175 && click>price4){
    it4time+=5;
     click-=price4;
    price4*=1.5;
}
 text("$"+it4time+" per second   "+"$"+round(price4),18,171);
};
}
//l
{
var item1time = 0;
var it1time = 0;
var price = 99;
var itemL = function(){
    fill(255, 0, 0);
    rect(0,75,399,25);
    if(item1time > 50.1){
         click+=it1time;
    }
    if(item1time > 50.2){
        item1time = 0;
    }
     item1time+=1+it1time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>75 && mouseY<100 && click>price){
    it1time+=1;
     click-=price;
    price*=1.5;
}
 text("$"+it1time+" per second   "+"$"+round(price),18,96);
};
}
//m
{
var item2time = 0;
var it2time = 0;
var price2 =499;
var itemM = function(){
    fill(255, 119, 0);
    rect(0,100,399,25);
    if(item2time > 75){
         click+=it2time;
    }
    if(item2time > 75){
        item2time = 0;
    }
     item2time+=1+it2time/10;
    fill(0, 0, 0);
    textSize(23);
    if(mouseIsPressed && mouseY>100 && mouseY<125 && click>price2){
    it2time+=5;
     click-=price2;
    price2*=1.5;
}
 text("$"+it2time+" per second   "+"$"+round(price2),18,121);
};
}
var afkvar1 = false;
var afkvar2 = 0;
var afkvar3 = 0;
function draw() {
    mouseIsPressed = MouseRef.held('left');
    mouseX = MouseRef.pos.x;
    mouseY = MouseRef.pos.y;
    if(mouseIsPressed){
        afkvar1 = false;
        afkvar2 = 0;
    }
    else{
        afkvar2+=1;
    }
    if(afkvar2>9999){
        afkvar1 = true;
    }
    if(afkvar1 === true){
        afkvar3+=1;
    }
    if(afkvar3 > 25){
        click+=clicky;
        afkvar3=0;
    }
    background(255, 255, 255);
    console.log('hola')
    clickformoney();
    itemA();
    itemB();
    itemC();
    itemD();
    itemE();
    itemF();
    itemG();
    itemH();
    fill(255, 255, 255);
    rect(349,0,50,50);
    fill(0, 0, 0);
    textSize(13);
    text("Upgrade",349,16);
    text("Click",349,32);
    for(let i =0; i<10000;i++){
        if(mouseIsPressed&&mouseY<50&&mouseX>350&&click>100||click===100){
            clicky+=1;
            click-=100;
        
        }
        if(mouseIsPressed&&mouseY<50&&mouseX>350&&click>1000000000000||click===1000000000000000){
            clicky+=10000000000000000;
            click-=1000000000000;
            
        }
    }
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
