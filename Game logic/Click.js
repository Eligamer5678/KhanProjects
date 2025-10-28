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
export function Click(DrawRef, MouseRef, KeysRef, sessionTimer){
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

// Redeclare these as the other
let mouseX = MouseRef.pos.x;
let mouseY = MouseRef.pos.y;
// Replace keyIsPressed,keyCode='name' with KeysRef.held('keyname')
// and keyPressed with keyPressed()
function keyPressed(){
    return KeysRef.held('any')
}
//blackout screen areas - paste at end of draw()
DrawRef.rect(new Vector(width,0), new Vector(mainWidth-width,height+2), color(0,0,0,1,'rgb'), true); //blackout right side
DrawRef.rect(new Vector(-1,height), new Vector(mainWidth+2,mainHeight-height+1), color(0,0,0,1,'rgb'), true); //blackout bottom

// Paste code below this line to use!



/**Break*/




//When your done playing, your progess will be reset. to aviod that, change the numbes below to the amount of items you have when you turn this game on again. so write down your money, superclicks, autoclick power, holdclick power, click power and your number of pristiges.

//money
var saveclick = 0;
//superclicks
var savesuperclick = 0;
//autoclicks
var saveautoclick = 0;
//holdclicks
var saveholdclick = 0;
//pristiges
var savepristiges = 0;
var saveclickpower = 0;

//code
{
//varibles
{
//varibles
//pristige bonus
var pb = 1;
//placement
var textx = 0;
var texty = 20;
var box1 = 0;
var box2 = 0;
var box3 = 0;
var box4 = 0;
//main varibles
var cc = 255;
var multi = 1;
var holdclick =0+saveholdclick;
var clicky = 1+saveclickpower;
var superclick = 0+savesuperclick;
var auto1 = 0+saveautoclick;
var click = -1+saveclick;
}
{
    {
//boxes varibles
var clickprice = 50;
var a1 = clickprice+clicky*50;
var superclickprice = 1000;
var a2 = superclickprice+clicky*1000;
var autoclickprice = 10;
var a3 = autoclickprice+0;
var pprice = 50;
var a4 = pprice*2;
var a6 = -1;
var holdclickprice = 1000+holdclickprice/10;
var a5 =1;
var cm = 100+clicky;
var scm = 0;
var acm = 1.5;
var hcm = 10;
//locks
var pristigeyes = 0+savepristiges; 
var lock1b = 0;
var lock2b = 0;
var lock3b = 0;
var lock4b = 0;
var lock5b = 0;
var gold = 0;
var goldp = 0;
var goldhi = 1;
}
var goldrush = function(){
 
gold+=1;

if(gold>0){
goldp = 0;
}
if(gold>600){
goldp = 10;
}
if(gold>1200){
goldp = 20;
}
if(gold>1800){
goldp = 30;
}
if(gold>2400){
goldp = 40;
}
if(gold>3000){
goldp = 50;
}
if(gold>3600){
goldp = 60;
}
if(gold>4200){
goldp = 70;
}
if(gold>4800){
goldp = 80;
}
if(gold>5400){
goldp = 90;
}
if(gold>6000){
goldp = 100;
}
if(gold > 5999){
click+=1*multi+goldhi*pb+clicky*10;

}
if(gold > 5999 && gold< 6501+superclick*3){
text("Gold Rush!",281,70);
cc = 0;
}
if(gold>6499+superclick*3){
gold = 0;
cc = 255;
}
text(goldp+"%",326,86);
};

var p = function(){
click = 0;
clicky = 1;
superclick = 0;
auto1 = 0;
holdclick = 0;
pb*=1.5;
pristigeyes+=1;
clickprice = 100;
superclickprice = 10000;
autoclickprice = 10;
pprice*=2;
a6+=1;
 cm = 100+clicky;
 scm = 0;
 acm = 1.5;
 hcm = 10;
 goldhi*=10;
};

var lock1 = function(){
    
fill(97, 110, 255);
rect(0,box1+100,399,50);
fill(0, 0, 0);
text("locked",170,box1+131);

};

var lock2 = function(){
fill(0, 191, 3);
rect(0,box2+150,399,50);
fill(0, 0, 0);
text("locked",textx+170,box2+180);
if(pristigeyes > 1 ){
lock2b = 1;

}
};

var lock3 = function(){
fill(255, 242, 0);
rect(0,box4+200,399,50);
fill(0, 0, 0);
text("locked",textx+170,box4+230);
if(pristigeyes > 2 ){
lock3b = 1;

}
};

var lock4 = function(){
fill(255, 48, 48);
rect(0,box3+250,399,50);
fill(0, 0, 0);
text("locked",textx+170,box3+280);
if(pristigeyes > 3 ){
lock4b = 1;

}
};

var lock5 = function(){
fill(127, 250, 123);
rect(0,box3+300,399,50);
fill(0, 0, 0);
text("locked",textx+170,box3+329);
};

//clicker
var clicko = function(){
  mouseClicked = function(){
click += clicky*pb*multi;

};  
    
};

//setup
var setup = function(){
    
fill(0, 0, 0);
textSize(20);
    background(255, 255, cc);
    text(MouseRef.pos.x+" "+MouseRef.pos.y,200,350);
  text("$"+click,0,texty);
  text("superclicks: "+superclick,0,texty+20);
    text("autoclick power: "+auto1,0,texty+40);
     text("holdclick power: "+holdclick,0,texty+60);
      text("click power: "+clicky,0,texty+76);
            text("pristiges: "+pristigeyes,197,texty+18);
  clicko();

};

//upgrade clicker
var upclick = function(){
    fill(105, 118, 255);
rect(0,box1+100,399,50);
fill(0, 0, 0);
text("Upgrade Click: $"+a1,textx,box1+130);
if(MouseRef.held('left') && MouseRef.pos.y > box1+100 && MouseRef.pos.y < box1+150 && click > a1 && lock1b === 1){
    cm+=150;
clickprice+=cm;
click -= a1;
clicky+=1*multi;

}else{
if(pristigeyes > 0){
lock1b = 1;
}else{
lock1();

}
}
};

//buy a superclick
var upsuperclick = function(){
fill(0, 191, 3);
rect(0,box2+150,399,50);
fill(0, 0, 0);
text("buy superclick:"+ a2,textx,box2+180);
if(MouseRef.held('left') && MouseRef.pos.y > 150 && MouseRef.pos.y < 200 && click > a2 && lock2b === 1){
    click -= a2;
    scm+=15000;
    superclick+=1*multi;
    a6+=1;
    gold+=0.2;
}else{
if(pristigeyes > 1){
lock2b = 1;
}else{
lock2();

}
}


};

//buy an autoclicker
var buyautoclick = function(){
click += auto1;
fill(255, 48, 48);
rect(0,box3+250,399,50);
fill(0, 0, 0);
text("buy autoclicker:" +a3 +"superclick",textx,box3+280);

if(MouseRef.held('left') && MouseRef.pos.y > 250 && MouseRef.pos.y < 300 && superclick > a3 && lock4b === 1){
auto1 +=1*multi;
superclick -= a3;
a3 = acm;
acm+=1;
}
else{
if(pristigeyes > 5){
lock4b = 1;
}else{
lock4();

}
}




};

//buy holdclick
var buyholdclick = function(){
fill(255, 242, 0);
rect(0,box4+200,399,50);
fill(0, 0, 0);
text("buy holdclick: "+a5+" superclicks",textx,box4+230);
if(MouseRef.held('left') && MouseRef.pos.y > 200 && MouseRef.pos.y < 250 && superclick>a5 && lock3b === 1){
    holdclick+=1*multi;
    superclick-=a5;
    a5=hcm-10;
    hcm+=100;
}else{
if(pristigeyes > 9){
lock3b = 1;
}else{
lock3();

}
}



if(MouseRef.held('left') && holdclick>0){
click+=clicky*holdclick;
}

};


var multip = function(){
    fill(126, 255, 112);
    rect(0,300,399,50);
    fill(0, 0, 0);
    text("Multiplier",155,331);
    
    if(MouseRef.held('left') && MouseRef.pos.y>300 && MouseRef.pos.y<350 && superclick>9999){
    multi+=0.5;
    superclick-=10000;
    }else{
if(pristigeyes > 4){
lock1b = 1;
}else{
lock5();

}
}
};

var pbox = function(){
    fill(0, 0, 0);
rect(0,350,399,50);
fill(255, 255, 255);
text("Pristige",160,384);

if(MouseRef.held('left') && click > a4 && MouseRef.pos.y > 349 && a6  <1){
    p();
}else if(MouseRef.held('left') && click > a4 && MouseRef.pos.y > 349 && a6 > 10){
    p();
}else if(MouseRef.held('left') && click > a4 && MouseRef.pos.y > 349 && a6>4&&a6<100){
    p();
}else if(MouseRef.held('left') && click > a4 && MouseRef.pos.y > 349 && a6 === 100){
    p();
}else if(MouseRef.held('left') && click > a4 && MouseRef.pos.y > 349 && a6 === 250){
p();

}

};

//easy money
var moneys = function(){
a1 = 100+cm;
a2 = 10000+scm;
a3 = 1+acm;
a5 = 100+hcm;
};
}
//tittle screen
{//tittle
var tittle = 0;
var tittle_screen = function(){
   
background(201, 206, 255);
textSize(83);
fill(0, 0, 0);

text("Click!",88,78);
textSize(20);
text("An Idle Game by Eligamer567",57,115);
//play button

fill(0, 196, 255);
rect(150,150,100,50,10);
fill(0, 0, 0);
textSize(41);
text("Play!",153,190);
if(MouseRef.held('left')&&tittle === 0&&MouseRef.pos.x>150&&MouseRef.pos.x<250&&MouseRef.pos.y>150&&MouseRef.pos.y<200){
tittle = 1;

}
//how to play button
fill(255, 0, 0);
rect(25,250,100,50,10);
fill(0, 0, 0);
textSize(15);
text("How to play",33,277);
if(MouseRef.held('left')&&tittle === 0&&MouseRef.pos.x>25&&MouseRef.pos.x<125&&MouseRef.pos.y>250&&MouseRef.pos.y<300){
tittle = 2;
click+=clicky*10*pb*multi;
}
//Leader Board
fill(0, 219, 11);
rect(150,250,100,50,10);
fill(0, 0, 0);
textSize(15);
text("News",176,276);
if(MouseRef.held('left')&&tittle === 0&&MouseRef.pos.x>150&&MouseRef.pos.x<250&&MouseRef.pos.y>250&&MouseRef.pos.y<300){
tittle = 3;
}
//News
fill(255, 242, 0);
rect(275,250,100,50,10);
fill(0, 0, 0);
textSize(15);
text("Leader Board",278,279);
if(MouseRef.held('left')&&tittle === 0&&MouseRef.pos.x>275&&MouseRef.pos.x<375&&MouseRef.pos.y>250&&MouseRef.pos.y<300){
tittle = 4;
}
if(tittle===0&&KeysRef.pressed('ArrowLeft')){
tittle = 2;
}
if(tittle===0&&KeysRef.pressed('ArrowDown')){
 tittle = 3;       
}    
if(tittle===0&&KeysRef.pressed('ArrowRight')){
    tittle = 4;
}
if(tittle===0&&KeysRef.held('Shift')){
tittle = 1;
click+=clicky;
clicky+=1;
}

};

var htp = function(){
background(255, 255, 255);
fill(0, 0, 0);
text("How to play",153,34);
text("Click to earn money",25,69);
text("Pristige to unlock stuff",25,90);
text("then buy that stuff to get more money",25,112);
text("then tell me your amount of money",25,135);
text("in the comments",25,167);
text("you might get onto the leader board",25,194);
fill(255, 0, 0);
rect(150,300,100,50,10);
fill(0, 0, 0);
text("back",178,330);
if(MouseRef.held('left')&&tittle === 2&&MouseRef.pos.x>150&&MouseRef.pos.x<250&&MouseRef.pos.y>300&&MouseRef.pos.y<350){
tittle = 0;
}
if(tittle===2&&KeysRef.pressed('ArrowUp')){
}
};

var news = function(){
background(255, 255, 255);
fill(255, 0, 0);
rect(150,300,100,50,10);
fill(0, 0, 0);
textSize(18);
text("back",178,330);
textSize(50);
text("News",133,73);
textSize(30);
text("Code simplfied",28,118);
text("Bug fixed",28,147);
text("Gold rush time and power",28,177);
text("increaced by the amount",28,215);
text("of superclicks you have.",28,243);
if(MouseRef.held('left')&&tittle === 3&&MouseRef.pos.x>150&&MouseRef.pos.x<250&&MouseRef.pos.y>300&&MouseRef.pos.y<350){
tittle = 0;
}
if(tittle===3&&KeysRef.pressed('ArrowUp')){
}
};

var leader_board = function(){
background(255, 255, 255);
fill(255, 0, 0);
rect(150,300,100,50,10);
fill(0, 0, 0);
textSize(30);
text("Leader Board",100,31);
textSize(20);
text("back",178,330);
textSize(50);
fill(59, 0, 117);
text("1.Skullgabor ",6,92);
textSize(40);
text("2.Eligamer567",6,136);
textSize(30);
text("3.Jakob88",6,176);
textSize(20);
text("4.",6,210);
text("5.",6,230);
text("6.",6,250);
text("7.",6,270);
text("8.",6,290);
text("9.",6,310);
text("10.",6,330);
if(MouseRef.held('left')&&tittle === 4&&MouseRef.pos.x>150&&MouseRef.pos.x<250&&MouseRef.pos.y>300&&MouseRef.pos.y<350){
tittle = 0;
}
if(tittle===4&&KeysRef.pressed('ArrowUp')){
}
};
}
//functions and more varibles

draw = function() {
    if(tittle === 1){
setup();
upclick();
upsuperclick();    
buyautoclick();
buyholdclick();
multip();
goldrush();
pbox();
moneys();
fill(255, 0, 0);
rect(325,20,50,25,10);
if(MouseRef.held('left')&&tittle===1&&MouseRef.pos.x>325&&MouseRef.pos.x<375&&MouseRef.pos.y>20&&MouseRef.pos.y<45){
tittle = 0;
}
if(tittle===1&&KeysRef.held('Shift')){
tittle = 0;
}
fill(0, 0, 0);
text("Back",328,40);
}else if(tittle === 0){
tittle_screen();
}else if(tittle === 2){
htp();
}else if(tittle === 3){
news();
}else if(tittle === 4){
leader_board();
}
DrawRef.rect(new Vector(width,0), new Vector(mainWidth-width,height+2), color(0,0,0,1,'rgb'), true); //blackout right side
DrawRef.rect(new Vector(-1,height), new Vector(mainWidth+2,mainHeight-height+1), color(0,0,0,1,'rgb'), true); //blackout bottom

    };
}





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
