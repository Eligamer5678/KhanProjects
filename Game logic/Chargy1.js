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
export function Chargy(DrawRef, MouseRef, KeysRef, sessionTimer){
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
function dist(x1,y1,x2,y2){
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
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
function translate(x,y){
    DrawRef.translate(new Vector(x,y));
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
function arc(x,y,w,h,start,stop){
    DrawRef.arc(new Vector(x,y), new Vector(w,h), start, stop, globalfillColor, true, true, globalStroke, globalStrokeColor);
}

let globalShape = []; // store vector coords here
function beginShape(){
    globalShape = [];
}
function vertex(x,y){
    globalShape.push(new Vector(x,y));
}
function endShape(close=false){
    DrawRef.polygon(globalShape, globalfillColor, true, true, globalStroke, globalStrokeColor);
    if(close){
        DrawRef.line(globalShape[0], globalShape[globalShape.length-1], globalStrokeColor, globalStroke);
    }
    globalShape = [];
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
function cursor(){
    //do nothing
}
function textFont(...args){
    //do nothing
}
function createFont(...args){
    //do nothing
}
function triangle(x1,y1,x2,y2,x3,y3){
    DrawRef.polygon([new Vector(x1,y1),new Vector(x2,y2),new Vector(x3,y3)], globalfillColor, true, true, globalStroke, globalStrokeColor);
}
//blackout screen areas - paste at end of draw()
DrawRef.rect(new Vector(width,0), new Vector(mainWidth-width,height+2), color(0,0,0,1,'rgb'), true); //blackout right side
DrawRef.rect(new Vector(-1,height), new Vector(mainWidth+2,mainHeight-height+1), color(0,0,0,1,'rgb'), true); //blackout bottom

// Paste code below this line to use!



/**Break*/

/*For teachers seeing this, please remember i made this myself and will only update it in free time.


This is by far my best project ever.




 Click the screen to start or else it will not regiser your key inputs!
use this link if screen size is wrong:
https://www.khanacademy.org/computer-programming/chargy/5878519500947456?width=600*/
//Put save code here!
// Defult save is 0,0,0,0,0,0,89,36,0,0,false,0,0
// My save is 26,0,11,0,0,true,353,160,0,'Map',false,0,0
var saves = [0,0,0,0,0,0,89,36,0,0,false,0,0];
var whoknows = "";
var players = 1;
/**
UPDATE NEWS:





Speedruns: Rules, all levels.  Speed booster allowed. no devs cheating, ALL LEVELS
To post a run, reply to my comment in the tips and thanks section

Leaderboards will reset when the game updates
Speed boosted:
1. 
2.
3.
4.
5.
worst run ever: 12046 seconds
Defult
1.260 seconds
2. 
3.
4.
5.
*/
var speedrun = true;
//Set framerate to 200 for extra difficulty
frameRate(60);
var supreme_mode = false;
var sppppeeed = 0;
var sppppeeed2 = 0;
var sppppeeed3 = false;
var sppppeeed4 = false;
var sppppeeed5 = 0;
var heightY = 0;
var kc = false;
var keys=[];
var key_held = 0;
var elitime = 0;
keyPressed=function(){keys[0]=true;kc=true;key_held+=1;};
keyReleased=function(){keys[0]=false;key_held=0;};
{
var devmode = false;
}
var settings_open = 0;
var sx = 0;
var sy = 0;
var X = 0;
var Y = 375;
var g = 0.5;
var jump = false;
var jt = 0;

var sx2 = 0;
var sy2 = 0;
var X2 = 0;
var Y2 = 375;
var jump2 = false;
var jt2 = 0;
var colide=true;
var cor = color(0,200,255);
var cor2 = color(0,0,0);
var cor3 = color(0,200,255);
var cor4 = color(255, 255, 255);
var cor5 = color(35, 35, 35);
var mx = 300;
var my = 200;
var mjump = false;
var msx = 0;
var msy = 0;
var mjt = 0;
var mStart = false;
var dir = 'l';
var isblock = false;
var mstop = false;
var act = 0;
var lvl = 0;
var supreme_levels_complete = 0;
var crown = 0;
var lazerstop = [[],[300,200,50,10]];
var lazerX = 0;
var dirlazer = 1;
var ly = 1;
var lz = false;
var ang = 0;
var battery = 0;
var nlvl = false;
var fade = 0;
var ic = false;
var ts = false;
var aim = 0;
var incannon = false;
var canX = 0;
var canY = 0;
var cantime = 0;
var topb = -1000;
var sc1 = 0;
var cx = 0;
var t_complete = false;
var vertical = false;
var levels = 27;
var snowx1 = 0;
var snowx2 = -1;
var snows1 = 0;
var effects = "on";
var snows2 = 0;
var snowheight1 = 200;
var snowheight2 = -400;
var snowpush = 0;
var snowa = 5;
var snowthrown =false;
var frames = 60;
var teleporting = false;
var coins = 0;
var keyscollected=0;
var levels_complete = 0;
var level_type;
var animation_time = 0;
var swiching = false;
var died = false;
var deaths = 0;
var maps = 1;
var map_swich = 0;
var px = 0;
var py = -10;
var ftime = 0;
var codee = 0;
var using_ability = false;
var rr = 0;
var bphones = 0;
var flight = false;
var flight2 = false;
var lazerY = 0;
var onblock  = false;
var tttime = 15;
var tttime2 = 1;
var gear = 'med';
var movetime = 0;
var moved = 1;
var varible_reset = function(nextlvl){
if(lvl===17){
    maps=2;
}
if(lvl===27){
    maps=3;
}
if(lvl===levels){sppppeeed3=false;sppppeeed4=true;}
if(lvl===101&&battery>=100){
    crown=1;
}
flight=false;
flight2=false;
heightY=0;
ftime=0;
tttime = 15;
tttime2 = 1;
movetime = -400;
moved = 1;
vertical=false;
supreme_mode=false;
snowpush=0;
keyscollected = 0;
snowa=5;
snowx2=1000;
snowthrown = false;
battery=0;
mx=500;
my=200;
mStart=false;
sx = 0;
sy = 0;
sx2 = 0;
sy2 = 0;
g = 0.5;
X=10;
Y=390;
X2=10;
Y2=390;
px=-100;
if(nextlvl===7){
cx-=200;
sx=0;
X+=100;
sx2=0;
X2+=100;
}
lvl=nextlvl;
if(level_type === 'supreme'){
    supreme_levels_complete+=1;
}
};
var swichlvl = function(type,extra){
if(type === 'next'||type==='exit'&&lvl===17){
    animation_time = 0;
    swiching = true;
    if(extra<100){
    varible_reset((lvl+=1));
    }else{
    varible_reset('Map'); 
    }
    battery=0;
    if(lvl>levels_complete&&lvl-3<levels_complete){
    levels_complete+=1;
    }
    if(lvl===33){
        X=530;
    }
}
if(type === 'death'){
    animation_time = 0;
    swiching = true;
    died = true;
    varible_reset((lvl));
    if(lvl===33){
        X=530;
    }
}
if(type === 'exit'){
    animation_time = 0;
    swiching = true;
    varible_reset('Map');
    if(lvl>levels_complete&&lvl-3<levels_complete&&lvl===17){
    levels_complete+=1;
    }
}
if(type === 'enter'){
    animation_time = 0;
    swiching = true;
    varible_reset(extra);
    if(lvl===33){
        X=530;
    }
}
if(type === 'World'){
    animation_time = 0;
    swiching = true;
    varible_reset('Map');
    map_swich = 1;
    maps = extra;
}
};
var Angle = function(x1,y1,x2,y2,ad,distx,disty){
var distx = abs(x1-x2);
var disty = abs(y1-y2);
if(x1>=x2&&y1<y2){
rotate(atan(distx/disty)-90);
}
if(x1<x2&&y1<y2){
rotate(-atan(distx/disty)-90);
}
if(x1>=x2&&y1>=y2){
rotate(-atan(distx/disty)+90);
}
if(x1<x2&&y1>=y2){
rotate(atan(distx/disty)+90);
}
rotate(ad);
};
var jump_orb = function(x,y){
    stroke(0, 0, 0);
fill(cor3);
ellipse(x,y+heightY,20,20);
if(dist(X+15,Y+15,x,y+heightY)<30){
    jump=false;
    jt=3;
}
if(dist(X2+15,Y2+15,x,y+heightY)<30){
    jump2=false;
    jt2=3;
}
noStroke();
};
var jump_zipline = function(x,y,w,h){
    stroke(0, 0, 0);
fill(cor3);
rect(x,y+heightY,w,h);
if(X+sx+30>x&&Y+sy+30>y&&X+sx<x+w&&Y+sy<y+h){
    jump=false;
    jt=5;
}
if(X2+sx2+30>x&&Y2+sy2+30>y&&X2+sx<x+w&&Y2+sy<y+h){
    jump2=false;
    jt2=5;
}
noStroke();
};
var flight_orb = function(x,y,on){
    noStroke();
if(on===true){
for(let i = 30;i>1;i--){
fill(cor,i-5);
ellipse(x,y+heightY,i,i);
}
}
if(on===false){
for(let i = 30;i>1;i--){
fill(255, 0, 0,i-5);
ellipse(x,y+heightY,i,i);
}
}
if(dist(X+15,Y+15,x,y+heightY)<40&&colide===true){
    if(on===true){
    flight = true;
    }
    if(on===false){
    flight = false;
    }
}
if(dist(X2+15,Y2+15,x,y+heightY)<40&&colide===true){
    if(on===true){
    flight2 = true;
    }
    if(on===false){
    flight2 = false;
    }
}
stroke(0, 0, 0);
};
var flight_block = function(x,y,w,h,on){
if(on===true){
    fill(cor,200);
    rect(x,y+heightY,w,h);
}
if(on===false){
    fill(255, 0, 0,200);
    rect(x,y+heightY,w,h);
}
if(colide===true){
if(flight!==on){
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x-30;
    sx=0;
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x+w;
    sx=0;
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    Y=y+heightY-30;
    sy=0;
    jump=false;
    jt=3;
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    Y=y+heightY+h;
    sy=0;
}
}
if(flight2!==on){
if(X2+sx2+30>=x&&X2<=x&&Y2+29>y+heightY&&Y2+1<y+heightY+h){
    X2=x-30;
    sx2=0;
}
if(X2+sx2<=x+w&&X+30>=x+w&&Y2+29>y+heightY&&Y2+1<y+heightY+h){
    X2=x+w;
    sx=0;
}
if(Y2+sy2+30>=y+heightY&&Y2<=y+heightY&&X2+29>x&&X2+1<x+w){
    Y2=y+heightY-30;
    sy2=0;
    jump2=false;
    jt2=3;
}
if(Y2+sy2<=y+heightY+h&&Y2+30>=y+heightY+h&&X2+29>x&&X2+1<x+w){
    Y2=y+heightY+h;
    sy2=0;
}
}
}
};
var teleporter = function(x1,y1,x2,y2,t){
    noStroke();
fill(115, 0, 255);
if(t==='none'&&dist(X,Y,x1,y1)>100){fill(255,255,255,dist(X,Y,x1,y1)/3);}
if(t==='none'&&dist(X,Y,x1,y1)<100){fill(255,255,255,dist(X,Y,x1,y1)/10);}
ellipse(x1,y1+heightY,20,20);
stroke(0, 0, 0);
if(t!=='none'){
ellipse(x1,y1+heightY,20,20);
}
fill(255, 0, 230);
ellipse(x2,y2+heightY,20,20);
if(dist(X+15,Y+15,x1,y1+heightY)<30){
    sy=0;
    sx=0;
    X=x2-15;
    Y=y2+heightY-15;
}
if(dist(X2+15,Y2+15,x1,y1+heightY)<30){
    sy2=0;
    sx2=0;
    X2=x2-15;
    Y2=y2+heightY-15;
}
if(lazerX>x1-10&&lazerX<x1+10&&ly>y1){
    strokeWeight(5);
    ly=y1;
    stroke(255, 0, 0);
    line(x2,y2,x2,600);
    strokeWeight(1);
    noStroke();
    if(X+30>x2-5&&X<x2+5&&Y>y2){
        swichlvl('death');
    }
    if(X2+30>x2-5&&X2<x2+5&&Y2>y2){
        swichlvl('death');
    }
}
noStroke();
};
var teleporter_bar = function(x1,y1,w,h,x2,y2){
fill(115, 0, 255);
rect(x1,y1+heightY,w,h);
fill(255, 0, 230);
ellipse(x2,y2+heightY,20,20);
if(X+sx+30>x1&&Y+30>y1+heightY&&X+sx<x1+w&&Y<y1+heightY+h){
    sy=0;
    sx=0;
    X=x2-15;
    Y=y2+heightY-15;
}
if(X2+sx2+30>x1&&Y2+30>y1+heightY&&X2+sx2<x1+w&&Y2<y1+heightY+h){
    sy2=0;
    sx2=0;
    X2=x2-15;
    Y2=y2+heightY-15;
}
};
var slider = function(x,y,w,h,t,d){
    noStroke();
    g = 0.5;
if(t===1){
fill(102, 52, 16);
rect(x,y+heightY,w,h);
if(d===1){
fill(59, 25, 0);
rect(x,y+h/3+heightY,w,h/3);
if(X+30>x&&X<x+w&&Y>y&&Y+30<y+h){
    Y=y+heightY+h/2-15;
    sy=0;
}
if(X2+30>x&&X2<x+w&&Y2+30>y&&Y2<y+h){
    Y2=y+heightY+h/2-15;
    sy2=0;
}
}
if(d===2){
fill(59, 25, 0);
rect(x+w/3,y+heightY,w/3,h);
if(X+30>x&&X<x+w&&Y+30>y+heightY&&Y<y+heightY+h&&d===2){
    X=x+w/2-15;
    sx=0;
    sy*=0.85;
    g=0;
    if(KeysRef.held('ArrowUp')){
        sy-=1;
    }
    if(KeysRef.held('ArrowDown')){sy+=0.85;}
}
if(X2+30>x&&X2<x+w&&Y2+30>y+heightY&&Y2<y+heightY+h&&d===2){
    X2=x+w/2-15;
    sx2=0;
    sy2=0;
    if(keys[87]){
        Y2-=5;
    }
    if(keys[83]){Y+=5;}
}
}
if(d===3){
fill(59, 25, 0);
rect(x+w/3,y+heightY,w/3,h);   
fill(59, 25, 0);
rect(x,y+heightY+h/3,w,h/3);
if(X+30>x&&X<x+w&&Y+30>y+heightY&&Y<y+heightY+h){
sy=0;
if(KeysRef.held('ArrowUp')){
Y-=5;
}
if(KeysRef.held('ArrowDown')){Y+=5;}
if(KeysRef.held('ArrowRight')){
X+=5;
}
if(KeysRef.held('ArrowLeft')){X-=5;} 
}
}
}
if(t===2){
fill(99, 99, 99);
rect(x,y+heightY,w,h);
if(d===1){
fill(61, 61, 61);
rect(x,y+heightY+h/3,w,h/3);
if(X+30>x&&X<x+w&&Y+30>y+heightY&&Y<y+heightY+h){
    Y=y+heightY+h/2-15;
    sy=0;
}
}
if(d===2){
fill(64, 64, 64);
rect(x+w/3,y+heightY,w/3,h);
if(X+30>x&&X<x+w&&Y+30>y+heightY&&Y<y+heightY+h&&d===2){
    X=x+w/2-15;
    sx=0;
    sy=0;
    if(KeysRef.held('ArrowUp')){
        Y-=5;
    }
    if(KeysRef.held('ArrowDown')){Y+=5;}
}
}
if(d===3){
fill(61, 61, 61);
rect(x+w/3,y+heightY,w/3,h);   
fill(61, 61, 61);
rect(x,y+heightY+h/3,w,h/3);
if(X+30>x&&X<x+w&&Y+30>y+heightY&&Y<y+heightY+h){
sx=0;
sy=0;
if(KeysRef.held('ArrowUp')){
Y-=5;
}
if(KeysRef.held('ArrowDown')){Y+=5;}
if(KeysRef.held('ArrowRight')){
X+=5;
}
if(KeysRef.held('ArrowLeft')){X-=5;} 
}
}
}
};
var sboost = function(x,y,w,h,s){
    stroke(0, 0, 0);
if(s===-2){
    fill(0, 150, 0);
    rect(x,y+heightY,w,h);
    beginShape();
    fill(255, 255, 255);
    vertex(x+w/(2.4-0.2),y+h/(2-0)+heightY);
    vertex(x+w/(2.0-0.2),y+h/(1.4-0)+heightY);
    vertex(x+w/(2.1-0.2),y+h/(2-0)+heightY);
    vertex(x+w/(2.0-0.2),y+h/(3-0)+heightY);
    vertex(x+w/(2.4-0.2),y+h/(2-0)+heightY);
    endShape();
    beginShape();
    fill(255, 255, 255);
    vertex(x+w/(2.4+0.75),y+h/(2-0)+heightY);
    vertex(x+w/(2.0+0.4),y+h/(1.4-0)+heightY);
    vertex(x+w/(2.1+0.46),y+h/(2-0)+heightY);
    vertex(x+w/(2.0+0.4),y+h/(3-0)+heightY);
    vertex(x+w/(2.4+0.75),y+h/(2-0)+heightY);
    endShape();
    beginShape();
    fill(255, 255, 255);
    vertex(x+w/(2.4-0.75),y+h/(2-0)+heightY);
    vertex(x+w/(2.0-0.58),y+h/(1.4-0)+heightY);
    vertex(x+w/(2.1-0.62),y+h/(2-0)+heightY);
    vertex(x+w/(2.0-0.58),y+h/(3-0)+heightY);
    vertex(x+w/(2.4-0.75),y+h/(2-0)+heightY);
    endShape();
}
if(s===-1){
    fill(0, 200, 0);
    rect(x,y+heightY,w,h);
    beginShape();
    fill(255, 255, 255);
    vertex(x+w/(2.4-0.2),y+h/(2-0)+heightY);
    vertex(x+w/(2.0-0.2),y+h/(1.4-0)+heightY);
    vertex(x+w/(2.1-0.2),y+h/(2-0)+heightY);
    vertex(x+w/(2.0-0.2),y+h/(3-0)+heightY);
    vertex(x+w/(2.4-0.2),y+h/(2-0)+heightY);
    endShape();
}
if(s=== 1){
    fill(0, 200, 0);
    rect(x,y+heightY,w,h);
    beginShape();
    fill(255, 255, 255);
    vertex(x+w/(2.4-0.2),y+h/(2-0)+heightY);
    vertex(x+w/(2.0+0.3),y+h/(1.4-0)+heightY);
    vertex(x+w/(2.1-0.2),y+h/(2-0)+heightY);
    vertex(x+w/(2.0+0.3),y+h/(3-0)+heightY);
    vertex(x+w/(2.4-0.2),y+h/(2-0)+heightY);
    endShape();
}
if(s=== 2){
    fill(0, 150, 0);
    rect(x,y+heightY,w,h);
    beginShape();
    fill(255, 255, 255);
    vertex(x+w/(2.4-0.2),y+h/(2-0)+heightY);
    vertex(x+w/(2.0+0.3),y+h/(1.4-0)+heightY);
    vertex(x+w/(2.1-0.2),y+h/(2-0)+heightY);
    vertex(x+w/(2.0+0.3),y+h/(3-0)+heightY);
    vertex(x+w/(2.4-0.2),y+h/(2-0)+heightY);
    endShape();
    beginShape();
    fill(255, 255, 255);
    vertex(x+w/(3.8-0.55),y+h/(2-0)+heightY);
    vertex(x+w/(3.6-0.09),y+h/(1.4-0)+heightY);
    vertex(x+w/(3.1-0.46),y+h/(2-0)+heightY);
    vertex(x+w/(3.6-0.09),y+h/(3-0)+heightY);
    vertex(x+w/(3.8-0.55),y+h/(2-0)+heightY);
    endShape();
    beginShape();
    fill(255, 255, 255);
    vertex(x+w/(2.4-0.75),y+h/(2-0)+heightY);
    vertex(x+w/(2.3-0.58),y+h/(1.4-0)+heightY);
    vertex(x+w/(2.1-0.62),y+h/(2-0)+heightY);
    vertex(x+w/(2.3-0.58),y+h/(3-0)+heightY);
    vertex(x+w/(2.4-0.75),y+h/(2-0)+heightY);
    endShape();
}

if(colide===true){
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x-30;
    sx=0;
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x+w;
    sx=0;
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    Y=y+heightY-30;
    sy=0;
    jump=false;
    jt=3;
    sx+=s*=0.5;
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    Y=y+heightY+h;
    sy=0;
}
}

if(colide===true){
if(X2+sx2+30>=x&&X2<=x&&Y2+29>y+heightY&&Y2+1<y+heightY+h){
    X2=x-30;
    sx2=0;
}
if(X2+sx2<=x+w&&X2+30>=x+w&&Y2+29>y+heightY&&Y2+1<y+heightY+h){
    X=x+w;
    sx=0;
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    Y=y+heightY-30;
    sy=0;
    jump=false;
    jt=3;
    sx+=s*=0.5;
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    Y=y+heightY+h;
    sy=0;
}
}
noStroke();
};
var lazer = function(){
ly+=10;
noStroke();
strokeWeight(5);
stroke(255, 0, 0);
line(lazerX,lazerY,lazerX,ly);
noStroke();
strokeWeight(1);
if(lazerX>X&&lazerX<X+30&&ly>Y){
    swichlvl('death');
}
if(lazerX>585){
dirlazer = -1;   
}
if(lazerX<15){
    dirlazer=1;
}
lazerX+=dirlazer;
};
var monster_action = function(x,y,action){
    if(devmode){
    fill(255, 255, 255);
    ellipse(x,y,10,10);
    textSize(15);
    if(action!=='stop'){
    text(action,x-20,y-20);
    }
    textSize(20);
    }
if(dist(mx+15,my+15,x,y)<21){
    if(action==='jump'){
        act='jump';
    }
    if(action==='right'){
        act='right';
    }
    if(action==='left'){
        act='left';
    }
    if(action==='left+up'){
        act='lu';
    }
    if(action==='right+up'){
        act='ru';
    }
    if(action==='stop'){
        act='stop';
    }
    if(action==='center'){
        mx=x-15;
        msx=0;
    }
}else{
}
};
var monster1 = function(){
if(mStart === true){
    if(msx>=0){
    fill(128, 128, 128);
    rect(mx+8,my+15,15,5);
    fill(0, 0, 0);
    rect(mx,my+5,10,20);
    rect(mx+2,my+10,10,20);
    rect(mx+5,my,15,5);
    fill(255, 0, 0);
    if(lvl===17){fill(0,200,255);}
    rect(mx+10,my+5,5,5);
    fill(128, 128, 128);
    rect(mx+8,my+12,15,5);
    }
    if(msx<0){
     fill(128, 128, 128);
    rect(mx+8,my+15,15,5);
    fill(0, 0, 0);
    rect(mx+19,my+5,10,20);
    rect(mx+16,my+10,10,20);
    rect(mx+11,my,15,5);
    fill(255, 0, 0);
    if(lvl===17){fill(0,200,255);}
    rect(mx+14,my+5,5,5);
    fill(128, 128, 128);
    rect(mx+8,my+12,15,5);  
    }
    mx+=msx;
    my+=msy;
    msy+=g;
    if(mstop===false){
    if(X<mx){
        dir='l';
    }
    if(X>mx){
        dir='r';
    }
    if(Y<my){
        dir='u';
    }
    if(X<mx&&Y<my){
        dir = 'lu';
    }
    if(X>mx&&Y<my){
        dir = 'ru';
    }
    if(X>mx&&isblock===true){
        dir='ru';
    }
    if(X<mx&&isblock===true){
        dir='lu';
    }
    }
    if(act!==0){
    mstop=true;
    if(act==='jump'){
        dir='u';
        act=0;
    }
    if(act==='right'){
        msx=10;
        act=0;
    }
    if(act==='left'){
        msx=-10;
        act=0;
    }
    if(act==='lu'){
        dir='lu';
        msx-=3;
        act=0;
    }
    if(act==='ru'){
        dir='ru';
        msx+=3;
        act=0;
    }
    if(act==='stop'){
    msx=0;
    act=0;    
    }
    }
    if(act===0){
        mstop=false;
    }
    if(dir === 'r'){
        msx+=1;
    }
    if(dir === 'l'){
        msx-=1;
    }
    if(dir === 'u'&&mjt===3&&mjump===false){
        msy=-7.5;
        mjt=0;
        mjump=true;
    }
    if(dir === 'lu'){
        msx-=1;
        if(mjt===3&&mjump===false){
        msy=-7.5;
        mjt=0;
        mjump=true;
        }
    }
    if(dir === 'ru'){
        msx+=1;
        if(mjt===3&&mjump===false){
        msy=-7.5;
        mjt=0;
        mjump=true;
        }
    }
    msx*=0.8;
}
};
var block = function(x,y,w,h,t,t1,t2,t3){
    {
if(t===0){
fill(102, 74, 74);
rect(x,y+heightY,w,h);   
}
if(t===1){
fill(255, 255, 255);
rect(x,y+heightY,w,h);
}
if(t===2){
fill(227, 227, 227);
rect(x,y+heightY,w,h);
}
if(t===3){
fill(201, 201, 201);
rect(x,y+heightY,w,h);
}
if(t===4){
fill(171, 171, 171);
rect(x,y+heightY,w,h);
}
if(t===5){
fill(102, 102, 102);
rect(x,y+heightY,w,h);
}
if(t===6){
fill(74, 74, 74);
rect(x,y+heightY,w,h);
}
if(t===7){
fill(43, 43, 43);
rect(x,y+heightY,w,h);
}
if(t===8){
fill(0, 0, 0);
rect(x,y+heightY,w,h);
}
if(t===9){
fill(255, 0, 0);
rect(x,y+heightY,w,h);
}
if(t===10){
fill(128, 0, 0);
rect(x,y+heightY,w,h);
}
if(t===11){
fill(56, 0, 0);
rect(x,y+heightY,w,h);
}
if(t===12){
fill(255, 115, 0);
rect(x,y+heightY,w,h);
}
if(t===13){
fill(166, 75, 0);
rect(x,y+heightY,w,h);
}
if(t===14){
fill(255, 168, 97);
rect(x,y+heightY,w,h);
}
if(t===15){
fill(255, 230, 0);
rect(x,y+heightY,w,h);
}
if(t===16){
fill(255, 252, 84);
rect(x,y+heightY,w,h);
}
if(t===17){
fill(244, 255, 143);
rect(x,y+heightY,w,h);
}
if(t===18){
fill(4, 255, 0);
rect(x,y+heightY,w,h);
}
if(t===19){
fill(2, 140, 0);
rect(x,y+heightY,w,h);
}
if(t===20){
fill(0, 66, 3);
rect(x,y+heightY,w,h);
}
if(t===21){
fill(0, 77, 255);
rect(x,y+heightY,w,h);
}
if(t===22){
fill(0, 51, 191);
rect(x,y+heightY,w,h);
}
if(t===23){
fill(0, 106, 255);
rect(x,y+heightY,w,h);
}
if(t===24){
fill(34, 0, 255);
rect(x,y+heightY,w,h);
}
if(t===25){
fill(30, 0, 161);
rect(x,y+heightY,w,h);
}
if(t===26){
fill(7, 0, 138);
rect(x,y+heightY,w,h);
}
if(t===27){
fill(85, 0, 255);
rect(x,y+heightY,w,h);
}
if(t===28){
fill(45, 0, 150);
rect(x,y+heightY,w,h);
}
if(t===29){
fill(157, 0, 255);
rect(x,y+heightY,w,h);
}
if(t===30){
fill(74, 33, 0);
rect(x,y+heightY,w,h);
}
if(t===31){
fill(140, 54, 0);
rect(x,y+heightY,w,h);
}
if(t===32){
fill(79, 30, 0);
rect(x,y+heightY,w,h);
}
if(t===33){
fill(84, 25, 0);
rect(x,y+heightY,w,h);
}
if(t===34){
fill(59, 29, 16);
rect(x,y+heightY,w,h);
}
if(t===35){
fill(64, 43, 34);
rect(x,y+heightY,w,h);
}
if(t===36){
fill(5, 82, 247);
rect(x,y+heightY,w,h);
}
if(t===37){
fill(cor3);
rect(x,y+heightY,w,h);   
}
}
if(colide===true){
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x-30;
    sx=0;
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x+w;
    sx=0;
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    Y=y-30+heightY;
    sy=0;
    jump=false;
    jt=3;
    onblock = true;
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    Y=y+heightY+h;
    sy=0;
}
}
if(lazerX>x&&lazerX<x+w&&ly>y){
ly=y-5;
}
if(mStart===true){
if(mx+msx+30>=x&&mx<=x&&my+29>y+heightY&&my+1<y+heightY+h){
    dir='ru';
    isblock=true;
    mx=x-30;
    msx=0;
}else{isblock=false;}
if(mx+msx<=x+w&&mx+30>=x+w&&my+29>y+heightY&&my+1<y+heightY+h){
    mx=x+w;
    msx=0;
    dir='lu';
    isblock=true;
}else{isblock=false;}
if(mx+31+msx>x&&mx+msx<x+w&&my+sy+31>y+3&&my+sy<y+h){
    isblock=true;
}else{isblock=false;}
if(my+msy+30>=y+heightY&&my<=y+heightY&&mx+29>x&&mx+1<x+w){
    my=y-30+heightY;
    msy=0;
    mjump=false;
    mjt=3;
}
if(my+msy<=y+heightY+h&&my+30>=y+heightY+h&&mx+29>x&&mx+1<x+w){
    my=y+heightY+h;
    msy=0;
}
}
};
var jblock = function(x,y,w,h,t,d){
if(t===1){
fill(255, 255, 255);
rect(x,y+heightY,w,h);
}
if(t===2){
fill(227, 227, 227);
rect(x,y+heightY,w,h);
}
if(t===3){
fill(201, 201, 201);
rect(x,y+heightY,w,h);
}
if(t===4){
fill(171, 171, 171);
rect(x,y+heightY,w,h);
}
if(t===5){
fill(102, 102, 102);
rect(x,y+heightY,w,h);
}
if(t===6){
fill(74, 74, 74);
rect(x,y+heightY,w,h);
}
if(t===7){
fill(43, 43, 43);
rect(x,y+heightY,w,h);
}
if(t===8){
fill(0, 0, 0);
rect(x,y+heightY,w,h);
}
if(t===9){
fill(255, 0, 0);
rect(x,y+heightY,w,h);
}
if(t===10){
fill(128, 0, 0);
rect(x,y+heightY,w,h);
}
if(t===11){
fill(56, 0, 0);
rect(x,y+heightY,w,h);
}
if(t===12){
fill(255, 115, 0);
rect(x,y+heightY,w,h);
}
if(t===13){
fill(166, 75, 0);
rect(x,y+heightY,w,h);
}
if(t===14){
fill(255, 168, 97);
rect(x,y+heightY,w,h);
}
if(t===15){
fill(255, 230, 0);
rect(x,y+heightY,w,h);
}
if(t===16){
fill(255, 252, 84);
rect(x,y+heightY,w,h);
}
if(t===17){
fill(244, 255, 143);
rect(x,y+heightY,w,h);
}
if(t===18){
fill(4, 255, 0);
rect(x,y+heightY,w,h);
}
if(t===19){
fill(2, 140, 0);
rect(x,y+heightY,w,h);
}
if(t===20){
fill(0, 66, 3);
rect(x,y+heightY,w,h);
}
if(t===21){
fill(0, 77, 255);
rect(x,y+heightY,w,h);
}
if(t===22){
fill(0, 51, 191);
rect(x,y+heightY,w,h);
}
if(t===23){
fill(0, 106, 255);
rect(x,y+heightY,w,h);
}
if(t===24){
fill(34, 0, 255);
rect(x,y+heightY,w,h);
}
if(t===25){
fill(30, 0, 161);
rect(x,y+heightY,w,h);
}
if(t===26){
fill(7, 0, 138);
rect(x,y+heightY,w,h);
}
if(t===27){
fill(85, 0, 255);
rect(x,y+heightY,w,h);
}
if(t===28){
fill(45, 0, 150);
rect(x,y+heightY,w,h);
}
if(t===29){
fill(157, 0, 255);
rect(x,y+heightY,w,h);
}
if(t===30){
fill(74, 33, 0);
rect(x,y+heightY,w,h);
}
if(t===31){
fill(140, 54, 0);
rect(x,y+heightY,w,h);
}
if(t===32){
fill(79, 30, 0);
rect(x,y+heightY,w,h);
}
if(t===33){
fill(84, 25, 0);
rect(x,y+heightY,w,h);
}
if(t===34){
fill(59, 29, 16);
rect(x,y+heightY,w,h);
}
if(t===35){
fill(64, 43, 34);
rect(x,y+heightY,w,h);
}
if(d===1){
    fill(cor3);
    rect(x,y+heightY,w,5);
}
if(d===4){
     fill(cor3);
    rect(x,y+heightY,5,h);
}
if(d===2){
     fill(cor3);
    rect(x+w-5,y+heightY,5,h);
}
if(d===3){
     fill(cor);
    rect(x,y+heightY+h-5,w,5);
}
if(colide===true){
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x-30;
    sx=0;
    if(('ArrowUp')&&d===4){
        sy=-10;
        sx=-15;
    }
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x+w;
    sx=0;
    if(KeysRef.held('ArrowUp')&&d===2){
        sy=-10;
        sx=15;
    }
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    Y=y+heightY-30;
    sy=0;
    jump=false;
    jt=3;
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    Y=y+heightY+h;
    sy=0;
}
}
};
var owblock = function(x,y,w,h,t,d){
if(t===1){
fill(56, 29, 0);
rect(x,y+heightY,w,h);
if(d===1){
fill(138, 95, 70);
triangle(x+40,y+10+heightY,x+10,y+heightY+h-40,x+w/2,y+h/2);
stroke(140, 91, 51);
strokeWeight(5);
line(x+22,y+heightY+36,x+31,y+heightY+44);
line(x+22,y+heightY+44,x+31,y+heightY+36);
}
if(d===2){
fill(138, 95, 70);
triangle(x+38,y+heightY+10,x+38,y+heightY+h-10,x+w/2,y+heightY+h/2);
stroke(140, 91, 51);
strokeWeight(5);
line(x+10,y+heightY+17,x+22,y+heightY+31);
line(x+22,y+heightY+17,x+10,y+heightY+31);
}
if(d===3){
fill(138, 95, 70);
triangle(x+10,y+45+heightY,x+40,heightY+y+h-5,x+w/2,y+h/2+heightY);
stroke(140, 91, 51);
strokeWeight(5);
line(x+21,y+heightY+10,x+33,y+heightY+21);
line(x+33,y+heightY+10,x+20,y+heightY+22);
}
if(d===4){
fill(138, 95, 70);
triangle(x+10,y+heightY+10,x+10,y+heightY+h-10,x+w/2,y+heightY+h/2);
stroke(140, 91, 51);
strokeWeight(5);
line(x+30,y+heightY+17,x+40,y+heightY+31);
line(x+40,y+heightY+17,x+30,y+heightY+31);
}
}
if(t===2){
strokeWeight(1);
fill(84, 82, 84);
rect(x,y+heightY,w,h);
if(d===1){
fill(117, 117, 117);
triangle(x+40,y+heightY+10,x+10,y+heightY+h-40,x+w/2,y+heightY+h/2);
stroke(117, 117, 117);
strokeWeight(5);
line(x+22,y+heightY+36,x+31,y+heightY+44);
line(x+22,y+heightY+44,x+31,y+heightY+36);
}
if(d===2){
fill(117, 117, 117);
triangle(x+38,y+heightY+10,x+38,y+heightY+h-10,x+w/2,y+heightY+h/2);
stroke(117, 117, 117);
strokeWeight(5);
line(x+10,y+heightY+17,x+22,y+heightY+31);
line(x+22,y+heightY+17,x+10,y+heightY+31);
}
if(d===3){
fill(138, 95, 70);
triangle(x+10,y+heightY+45,x+40,y+heightY+h-5,x+w/2,y+heightY+h/2);
stroke(117, 117, 117);
strokeWeight(5);
line(x+21,y+heightY+10,x+33,y+heightY+21);
line(x+33,y+heightY+10,x+20,y+heightY+22);
}
if(d===4){
fill(117, 117, 117);
triangle(x+10,y+heightY+10,x+10,y+heightY+h-10,x+w/2,y+heightY+h/2);
stroke(117, 117, 117);
strokeWeight(5);
line(x+30,y+heightY+17,x+40,y+heightY+31);
line(x+40,y+heightY+17,x+30,y+heightY+31);
}
strokeWeight(1);
}
if(t===3){
strokeWeight(1);
fill(255, 255, 255);
rect(x,y+heightY,w,h);
if(d===1){
fill(58, 123, 166);
triangle(x+40,y+heightY+10,x+10,y+heightY+h-40,x+w/2,y+heightY+h/2);
stroke(58, 123, 166);
strokeWeight(5);
line(x+22,y+heightY+36,x+31,y+heightY+44);
line(x+22,y+heightY+44,x+31,y+heightY+36);
}
if(d===2){
fill(58, 123, 166);
triangle(x+38,y+heightY+10,x+38,y+heightY+h-10,x+w/2,y+heightY+h/2);
stroke(58, 123, 166);
strokeWeight(5);
line(x+10,y+heightY+17,x+22,y+heightY+31);
line(x+22,y+heightY+17,x+10,y+heightY+31);
}
if(d===3){
fill(58, 123, 166);
triangle(x+10,y+heightY+45,x+40,y+heightY+h-5,x+w/2,y+heightY+h/2);
stroke(58, 123, 166);
strokeWeight(5);
line(x+21,y+heightY+10,x+33,y+heightY+21);
line(x+33,y+heightY+10,x+20,y+heightY+22);
}
if(d===4){
fill(58, 123, 166);
triangle(x+10,y+heightY+10,x+10,y+heightY+h-10,x+w/2,y+heightY+h/2);
stroke(58, 123, 166);
strokeWeight(5);
line(x+30,y+heightY+17,x+40,y+heightY+31);
line(x+40,y+heightY+17,x+30,y+heightY+31);
}
strokeWeight(1);
}
if(colide===true){
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    if(d!==4){
    X=x-30;
    sx=0;
    }else{
    X=x+w;
    }
    
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    if(d!==2){
    X=x+w;
    sx=0;
    }else{
    X=x-30;
    }
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    if(d!==1){
    Y=y+heightY-30;
    sy=0;
    jump=false;
    jt=3;
    }else{
        Y=y+heightY+h;
    }
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    if(d!==3){
    Y=y+heightY+h;
    sy=0;
    }else{
    Y=y+heightY-30;
    jump=false;
    jt=3;    
    }
}
}
stroke(0, 0, 0);
strokeWeight(1);
noStroke();
};
var phone = function(x,y){
    strokeWeight(1);
//glow    {
noStroke();
for(let a = 40;a>1;a--){
fill(255,255,200,a-20);
ellipse(x+8,y+heightY+15,a,a);
}
//}
//Texture {
pushMatrix();
translate(0,heightY);
stroke(0, 0, 0);
fill(46, 46, 46);
rect(x,y,15,30);
if(battery>=100){
fill(0, 255, 21);
rect(x+3,y+3,8.5,23.5);
}else{
fill(138, 138, 138);
rect(x+3,y+3,8.5,23.5);    
}
popMatrix();
//}
// Charge {
if(dist(X+15,Y+15,x+10,y+15+heightY)<30){
    stroke(cor3);
    strokeWeight(10);
    line(X+15,Y+15,x+10,y+15+heightY);
    stroke(cor2);
    strokeWeight(5);
    line(X+15,Y+15,x+10,y+15+heightY);
    battery+=3;
    strokeWeight(1);
    
    if(crown===1||supreme_mode){
        battery+=9;
    }
}



//}
//Swich levels{
if(battery>99){
    if(lvl===levels_complete-1||lvl<8&&levels_complete<7){
    levels_complete+=1;
    if(lvl===0){
        levels_complete=7;
    }
}
if(lvl===0||lvl===6||lvl>100||lvl===17||lvl===27||lvl===37){
t_complete = true;
swichlvl('exit',1);
}else if(lvl!=='Map'&&lvl!=='Shop')
{swichlvl('next',1);}
}
//}
};
var bphone = function(x,y,part){
noStroke();
if(part===1){
    for(let a = 40;a>1;a--){
    fill(255,0,0,a-20);
    ellipse(x+8,y+heightY+15,a,a);
    }
    stroke(0, 0, 0);
fill(255, 0, 0);
rect(x,y+heightY,16,30);
fill(138, 138, 138);
if(bphones===2&&battery>=50){
fill(0, 255, 51);    
}
if(bphones===3&&battery>=33){
fill(0, 255, 51);    
}
if(bphones===4&&battery>=25){
fill(0, 255, 51);    
}
rect(x+2.5,y+2+heightY,10,25);
}
if(part===2){
    for(let a = 40;a>1;a--){
    fill(255,85,0,a-20);
    ellipse(x+8,y+heightY+15,a,a);
    }
    stroke(0, 0, 0);
fill(255, 85, 0);
rect(x,y+heightY,16,30);
fill(138, 138, 138);
if(bphones===2&&battery>=100){
fill(0, 255, 51);    
}
if(bphones===3&&battery>=66){
fill(0, 255, 51);    
}
if(bphones===4&&battery>=50){
fill(0, 255, 51);    
}
rect(x+2.5,y+2+heightY,10,25);
}
if(part===3){
    for(let a = 40;a>1;a--){
    fill(230,255,0,a-20);
    ellipse(x+8,y+heightY+15,a,a);
    }
    stroke(0, 0, 0);
fill(230, 255, 0);
rect(x,y+heightY,16,30);
fill(138, 138, 138);
if(bphones===3&&battery>=100){
fill(0, 255, 51);    
}
if(bphones===4&&battery>=75){
fill(0, 255, 51);    
}
rect(x+2.5,y+2+heightY,10,25);
}
if(part===4){
    for(let a = 40;a>1;a--){
    fill(17,255,0,a-20);
    ellipse(x+8,y+heightY+15,a,a);
    }
    stroke(0, 0, 0);
fill(17, 255, 0);
rect(x,y+heightY,16,30);
fill(138, 138, 138);
if(bphones===4&&battery>=100){
fill(0, 255, 51);    
}
rect(x+2.5,y+2+heightY,10,25);
}
if(dist(x+8,y+heightY+15,X+15,Y+15)<30){
    stroke(cor3);
    strokeWeight(10);
    line(X+15,Y+15,x+8,y+heightY+30);
    strokeWeight(5);
    stroke(cor2);
    line(X+15,Y+15,x+8,y+heightY+30);
    strokeWeight(1);
    stroke(0, 0, 0);
    fill(0, 0, 0);
    //Swich levels{
if(battery>99){
    if(lvl===levels_complete-1||lvl<8&&levels_complete<7){
    levels_complete+=1;
    if(lvl===0){
        levels_complete=7;
    }
}
if(lvl===0||lvl===6||lvl>100||lvl===17||lvl===27||lvl===37){
t_complete = true;
swichlvl('exit',1);
}else
{swichlvl('next',1);}
}
//}
    if(bphones===4){
    if(part===1&&battery<25){
    battery+=1;
    if(crown===1){battery+=10;}
    if(battery>=25){
    }
    }
    if(part===2&&battery<50&&battery>=25){
    battery+=1;
    if(crown===1){battery+=10;}
    if(battery>=50){
    }
    }
    if(part===3&&battery<75&&battery>=50){
    battery+=1;
    if(crown===1){battery+=10;}
    if(battery>=75){
    }
    }
    if(part===4&&battery<100&&battery>=75){
    battery+=1;
    if(crown===1){battery+=10;}
    if(battery>=100){
    }
    }
    }
    if(bphones===3){
    if(part===1&&battery<33){
    battery+=1;
    if(crown===1){battery+=10;}
    if(battery>=33){
    }
    }
    if(part===2&&battery<66&&battery>=33){
    battery+=1;
    if(crown===1){battery+=10;}
    if(battery>=66){
    }
    }
    if(part===3&&battery<100&&battery>=66){
    battery+=1;
    if(crown===1){battery+=10;}
    if(battery>=100){
    }
    }
    }
    if(bphones===2){
    if(part===1&&battery<=50){
    battery+=1;
    if(crown===1){battery+=10;}
    fill(0, 0, 0);
    if(battery>=50){
    }
    }
    if(part===2&&battery<100&&battery>=50){
    battery+=1;
    if(crown===1){battery+=10;}
    if(battery>=100){
    }
    }
    }
}
};
var level_entrance = function(x,y,lev,extra){
    stroke(0,0,0);
    fill(0,0,0,0);
    stroke(0,0,0,0);
for(let i = 0; i<50;i++){
fill(0,0,0,i);
if(lev==='Supreme'){
    fill(i*2,0,0,i);
}
if(lev==='Map'){
    fill(0, i*3, i*3,i);
}
if(lev==='Shop'){
    fill(200,i);
}
if(levels_complete>=lev+7){
fill(0,100,0,i);
}
rect(x+i/2,y+i/2+heightY,50-i,50-i);
}
fill(0, 0, 0);
if(X>x&&X+30<x+50&&Y>y&&Y+30<y+50){
if(lev === 'Map'){
maps=extra;
}else
if(lev === 'Supreme'){
swichlvl('enter',extra+100);
}else
if(lev==='Shop'){swichlvl('enter','Shop');}else{
swichlvl('enter',lev+7);
}
}
fill(0, 0, 0);
text(lev,x+7,y-5);
};
var freezetime = function(startT,stopT,count1){
if(startT>stopT){
if(ftime<=stopT){
swichlvl('death');
ftime=startT;
}
ftime-=count1;
}
if(stopT>startT){
 if(ftime>=stopT){
swichlvl('death');
ftime=startT;
}
ftime+=count1;
}
};
var keyed = function(x,y,k){
if(keyscollected<k){
fill(255, 242, 0);
ellipse(x,y+heightY,10,10);
fill(0, 0, 0);
textSize(10);
if(k<10){
text(k,x-3,y+3+heightY);
}else{
text(k,x-6,y+3+heightY);   
}
textSize(20);
if(dist(x,y+heightY,X+15,Y+15)<20&&keyscollected+1===k){
    coins+=1;
    keyscollected+=1;
}
}else{
fill(0,0,0,0);
}
};
var keyblock = function(x,y,w,h,k){
if(keyscollected<k){
    fill(255, 247, 0);
    rect(x,y+heightY,w,h);
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x-30;
    sx=0;
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x+w;
    sx=0;
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    Y=y-30+heightY;
    sy=0;
    jump=false;
    jt=3;
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    Y=y+heightY+h;
    sy=0;
}
}
};
var snowsy = [0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400];
var snowsx = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
var snowfallsy = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var snow = function(dark){
background(0, 153, 255);
if(dark===true){
background(50, 0, 100,100);   
}
noStroke();
block(-10,-10,640,20,1);
block(-10,390,640,20,1);
block(-10,-10,20,420,1);
block(590,-10,20,420,1);
if(dark===true){
    
for(let i = 0;i<255;i+=8){
    fill(255,255,225,255-i*1.1);
ellipse(520,110,i*0.5,i*0.5);
}

fill(255, 0, 0);
fill(255,255,150);
pushMatrix();
translate(800,240);
scale(-1);
rotate(-20);
beginShape();
vertex(200, 175);
bezierVertex(270, 180, 260, 255, 200, 255);
bezierVertex(230, 250, 240, 190, 200, 175);
endShape();
popMatrix();
fill(20, 0, 0,100); 
}
if(effects==="on"){
for(let i = 0; i < snowsy.length-1;i++){
if(snowsy[i]>400){
snowsy[i] = 0;
snowfallsy[i]=random(0.5,1);
snowsx[i] = random(-20,20);
if(snowsx[i]<0||snowsx[i]>600){
snowsx[i] = random(0,600);
}
}
snowsy[i]+=snowfallsy[i];
for(let j = 0;j<snowsx.length;j++){
fill(255,255,255,100);
ellipse(j*50+snowsx[i],snowsy[i],20,20);
fill(255,255,255,150);
ellipse(j*50+snowsx[i],snowsy[i],15,15);
}
}
}
fill(0, 153, 255,100);
if(dark===true){
    fill(20,0,0,200);
    
for(let i = 200;i>0;i--){
    fill(0,0,0,i);
    rect(0,0-i+210,600,2);
}
}
noStroke();
block(-10,-10,640,20,1);
block(-10,390,640,20,1);
block(-10,-10,20,420,1);
block(590,-10,20,420,1);
if(dark===true){
block(-10,-10,640,20,1);
block(-10,390,640,20,1);
block(-10,-10,20,420,1);
block(590,-10,20,420,1);   
}
};
var slope = function(x,y,w,h,t,d){
if(d===1){
    block(x+w/2+1,y+h/2+1,w/2-1,h/2-1);
}
if(d===2){
    block(x-1,y+h/2+1,w/2+1,h/2+1);
}
if(d===3){
    block(x,y,w/2,h/2);
}
if(d===4){
    block(x+w/2,y,w/2,h/2);
}
if(t===1){
fill(255, 255, 255);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===2){
fill(227, 227, 227);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===3){
fill(201, 201, 201);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===4){
fill(171, 171, 171);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===5){
fill(102, 102, 102);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===6){
fill(74, 74, 74);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===7){
fill(43, 43, 43);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===8){
fill(0, 0, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===9){
fill(255, 0, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===10){
fill(128, 0, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===11){
fill(56, 0, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===12){
fill(255, 115, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===13){
fill(166, 75, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===14){
fill(255, 168, 97);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===15){
fill(255, 230, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===16){
fill(255, 252, 84);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===17){
fill(244, 255, 143);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===18){
fill(4, 255, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===19){
fill(2, 140, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===20){
fill(0, 66, 3);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===21){
fill(0, 77, 255);
rect(x,y+heightY,w,h);
}
if(t===22){
fill(0, 51, 191);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===23){
fill(0, 106, 255);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===24){
fill(34, 0, 255);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===25){
fill(30, 0, 161);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===26){
fill(7, 0, 138);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===27){
fill(85, 0, 255);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===28){
fill(45, 0, 150);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===29){
fill(157, 0, 255);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===30){
fill(74, 33, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===31){
fill(140, 54, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===32){
fill(79, 30, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===33){
fill(84, 25, 0);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===34){
fill(59, 29, 16);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===35){
fill(64, 43, 34);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===36){
fill(5, 82, 247);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(t===37){
fill(cor3);
if(d===1){
triangle(x+w,y,x+w,y+h,x,y+h);
}
if(d===2){
triangle(x,y,x,y+h,x+w,y+h);
}
if(d===3){
triangle(x,y+h,x,y,x+w,y);   
}
if(d===4){
triangle(x+w,y+h,x+w,y,x,y);   
}
}
if(colide===true){
if(d===1){
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    Y=y+heightY+h;
    sy=0;
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h&&X>x-2+w){
    X=x+w;
    sx=0;
}



if(X-1<x+w){
for(let a = h;a>0;a--){
    var y1 = y+a;
    var x1 = x+-a*(w/h)+w;
    var o1 = h;
    var a1 = w;
    if(Y+sy+30>=y1+heightY&&Y<=y1+heightY&&X+29>x1&&X+1<x+w){
    if(X+30<x+w){
    ang = -(atan(o1/a1));
    }
    Y=y1-30+heightY;
    sy=round(w/h)*3;
    sx=-round(h/w)*3;
    jump=false;
    jt=3;
}
}
}



}
if(d===2){
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w&&Y>y+h-1){
    Y=y+heightY+h;
    sy=0;
}
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h&&X+30<x+1){
    X=x-30;
    sx=0;
}



if(X+31>x){
for(let a = h;a>0;a--){
    var y1 = y+a;
    var x1 = x+a*(w/h);
    var o1 = h;
    var a1 = w;
    if(Y+sy+30>=y1+heightY&&Y<=y1+heightY&&X+29>x&&X+1<x1){
    if(X>x){
    ang = (atan(o1/a1));
    }
    Y=y1-30+heightY;
    sy=w/h*3;
    sx=h/w*3;
    jump=false;
    jt=3;
}
}
}
}





if(d===3){
for(let a = w;a>0;a-=2){
    var a2 = 0;
    var b2 = 0;
for(let b= 0;b<h;b++){
    a2=a;
    b2=-(0+a/(w/h));
}
block(x,y+b2+h,a2,2);
}}
if(d===4){
for(let a = 0;a<w;a+=2){
    var a2 = 0;
    var b2 = 0;
for(let b= 0;b<h;b++){
    a2=a;
    b2=-(0+a/(w/h));
}
block(x+-a2+w,y+b2+h,a2,2);
}}


}
};
var deathblock = function(x,y,w,h){
    {
fill(255, 0, 0);
rect(x,y+heightY,w,h);


}
if(colide===true){
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x-30;
    sx=0;
    swichlvl('death');
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    X=x+w;
    sx=0;
    swichlvl('death');
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    Y=y-30+heightY;
    sy=0;
    jump=false;
    jt=3;
    swichlvl('death');
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    Y=y+heightY+h;
    sy=0;
    swichlvl('death');
}
}

};
var supreme_block = function(x,y,w,h,on){
if(on===true){
    fill(0, 0, 0,200);
    rect(x,y+heightY,w,h);
}
if(on===false){
    fill(255, 255, 255,200);
    rect(x,y+heightY,w,h);
}
if(colide===true){
if(on===true){
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    supreme_mode=true;
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    supreme_mode=true;
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    supreme_mode=true;
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    supreme_mode=true;
    
}
}
if(on===false){
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    supreme_mode=false;
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    supreme_mode=false;
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    supreme_mode=false;
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    supreme_mode=false;
    
}
}
}
};
var wooden = function(top){
    noStroke();
background(171, 128, 78);
if(top!==false){
block(-5,-5,615,15,34);
block(-5,390,615,15,34);
block(-5,0,15,415,34);
block(590,0,15,415,34);
}else{
    block(-5,390,615,15,34);
    block(-5,-1000,15,1415,34);
    block(590,-1000,15,1415,34);
}
};
var basic = function(t){
background(115, 115, 115);
block(-10,-10,20,420,t);
block(-10,-10,620,20,t);
block(-10,390,620,20,t);
block(590,-10,20,420,t);
};
var cannon = function(x,y){
    if(Y<topb){
        Y=topb+50;
    }
    if(keys[51]){
        X=mouseX;
        Y=mouseY;
    }
if(cantime<30&&cantime>0){
X=(x-15-(x-mouseX-15)*(cantime/10));
Y=(y-15-(y-mouseY-15)*(cantime/10));
sy=0;
ang=aim;
cantime+=1;
}
if(cantime<30&&cantime>0){
X=(abs(x-15-(x-mouseX-15)*(cantime/10)));
Y=(y-15-(y-mouseY-15)*(cantime/10));
sy=0;
ang=aim;
cantime+=1;
}
if(dist(x,y,mouseX,mouseY)<150&&dist(x,y,X,Y)<30){
    X=x-15;
    Y=y-15;
    sy=0;
    sx=0;
    incannon=true;
canX = x-mouseX;
canY = y-mouseY;
if(mouseY<y+50){
if(mouseX<x){
aim = atan(canY/canX)-90;
if(MouseRef.held('left')){
    cantime=1;
}
}
if(mouseX>x){
aim = atan(canY/canX)+90;
if(MouseRef.held('left')){
    cantime=1;
}
}
}
}else{
if(cantime>=28||cantime<=0){
aim=0;
}
incannon=false;
}
pushMatrix();
translate(x,y);
rotate(aim);
fill(94, 94, 94);
rect(-25,-35,50,70);
popMatrix();
fill(87, 38, 0);
rect(x-7.5,y,15,50);

};
var ice = function(x,y,w,h){
noStroke();
fill(120, 203, 255);
rect(x,y,w,h);
if(colide===true){
if(X+sx+30>=x&&X<=x&&Y+29>y+heightY&&Y+1<y+heightY+h){
    if(abs(sx)>20&&KeysRef.held('ArrowRight')){
    sy=-30;
    }
    X=x-30;
    sx=0;
}
if(X+sx<=x+w&&X+30>=x+w&&Y+29>y+heightY&&Y+1<y+heightY+h){
    if(abs(sx)>20&&KeysRef.held('ArrowRight')){
    sy=-30;
    }
    X=x+w;
    sx=0;
}
if(Y+sy+30>=y+heightY&&Y<=y+heightY&&X+29>x&&X+1<x+w){
    Y=y-30+heightY;
    sy=0;
    jump=false;
    jt=10;
    sx*=1/0.85;
}
if(Y+sy<=y+heightY+h&&Y+30>=y+heightY+h&&X+29>x&&X+1<x+w){
    Y=y+heightY+h;
    sy=0;
}
}

};
var start_game_rotate_amoumt = 0;
var Creater_power = function(){
if(keys[65]){
    crown = 100;
}
if(keys[88]){
    crown = 200;
}
if(keys[67]){
    crown = 300;
}
if(keys[86]){
    crown = 400;
}
if(keys[66]){
    crown = 500;
}
if(keys[32]){
if(crown === 100){
sx*=1/0.85;
}
if(crown === 200){
sy-=0.5;
}
if(crown === 300){
if(KeysRef.held('ArrowUp')&&jump===false&&jt>0){
sy-=15;
jt=0;
jump=true;
}
}
if(crown === 400){
sy-=0.5;
}
if(crown === 500){
sy-=0.5;
}
}
};
mouseClicked = function(){
    if(crown>=4&&keys[32]){
        if(dist(mouseX,mouseY,X+15,Y+15)<100){
        X=mouseX-15;Y=mouseY-15;
        }
    }
if(crown===2){
    if(mouseX<75&&mouseY<25){
        frames+=10;
    }
    if(mouseX<75&&mouseY<50){
        frames-=5;
    }
}
if(mouseX>560&&mouseY<40&&settings_open===0){
settings_open=1;
}
if(lvl===0&&mouseX>177&&mouseX<177+240&&mouseY>178&&mouseY<178+55&&settings_open===0){
    levels_complete = saves[0];
    supreme_levels_complete = saves[1];
    crown = saves[2];
    cx = saves[3];
    deaths = saves[4];
    t_complete = saves[5];
    X=saves[6];
    Y=saves[7];
    heightY=saves[8];
    lvl=saves[9];
    flight=saves[10];
    keyscollected=saves[11];
    battery=saves[12];
    swichlvl('enter',1);
}
if(settings_open&&mouseX<250&&mouseY<50){
if(effects === "on"){
effects="off";
}else{
effects = "on";
}
}

};
draw = function() {
    start_game_rotate_amoumt +=1;
    if(lvl<8){
        levels_complete = 7;
    }
    {cursor("defult");}
    onblock = false;
    textSize(20);
    textFont(createFont('monospace'));
    background(143, 143, 143);
    fill(0, 0, 0);
    text("Press 1 if you see this",200,200);
    if(levels_complete>20){
    if(keys[90]){
    crown =11;
    }
    }
    if(crown === 11&&keys[32]){
    sx*=1/0.9;
    }
    {
    if(vertical===false){
    if(Y>370){Y=370;sy=0;jump=false;jt=3;}
    }
    if(X>570){X=570;sx=0;}
    if(X<0){X=0;sx=0;}
    Y+=sy;
    X+=sx;
    if(flight===false){
    sy+=g;
    }
    if(!using_ability||crown!==1){
    sx*=0.8;
    }else{
    sx*=0.95;
    }
    if(flight===true){
        if(!using_ability||crown!==1){
    sy*=0.8;
    }else{
    sy*=0.95;
    }
    }
    if(KeysRef.held('ArrowUp')&&jump===false&&jt>0||KeysRef.held('ArrowUp')&&flight===true){
        if(flight===false){
        if(keys[32]&&crown===3){
            sy=-7;
        }else
        {sy=-10;}
        jump=true;
        }
        if(flight===true){
            sy-=1;
        }
    }
    jt-=1;
    if(KeysRef.held('ArrowRight')){
        sx+=1;
    }
    if(KeysRef.held('ArrowLeft')){
        sx-=1;
    }
    if(KeysRef.held('ArrowDown')){
        if(flight===true){
            sy+=1;
        }
        if(flight===false){
            sy+=0.5;
            sx*=0.8;
        }
        if(supreme_mode===true&&flight===false){
            sy=0;
            jump=false;
            jt=3;
        }
    }
    }
    if(lvl===-5){
        basic(7);
        fill(0, 0, 0);
        text("Hey chargy! \nI managed to steal this ability from Eligamer567, you can have it.\nPress spacebar and it'll summon a block beneath you.  \nPress backspace to delete it.\nAnd press Down to lower it\nNot to mention you can teleport  ",100,20,400,500);
        fill(184, 184, 184);
        noStroke();
        rect(300-0.4,375,30,14);
    arc(300.5+15,376,30,30,180,360);
    fill(255, 255, 255);
    rect(308,370,5,10);
    rect(318,370,5,10);
    fill(0, 0, 0);
    rect(310,372,2.5,7);
    rect(318,372,2.5,7);
    block(300,360,30,30);
        pushMatrix();
        translate(300,300);
        fill(cor3);
        rotate(rr*1.5);
        rect(-25,-25,50,50);
        fill(cor4);
        rotate(rr+45*1.1);
        rr+=1;
        rect(-25,-25,50,50);
        rotate(rr*0.2);
        fill(0, 26, 255);
        rect(-25,-25,50,50);
        rotate(rr*0.2);
        fill(0, 0, 0);
        rect(-10,-10,20,20);
        popMatrix();
        if(crown===4){
            crown=0;
        }
        if(dist(300,300,X,Y)<45){
            crown=5;
        }
    }
    if(lvl===-2){
    background(0, 0, 0);
    fill(255, 255, 255);
    text("How to play: \nMovement:\nA/left and d/right to move.  Up/w to jump.\nDown/s to slow down and quick fall.\nWhen flying, jump/slowdown is replaced with \nfly up or down.\nSpacebar to use supreme ability once you \nunlock one\n\nCharge all the phones in rainbow order to \nbeat the stage.\n\nMess around with unknow items to learn.",50,30);
    }
    if(lvl===-3){
    background(0, 0, 0);
    fill(255, 255, 255);
    textSize(10);
    text("For an extra challenge, set Defult&glow&pupil to white, and set flying to red",10,10);
    textSize(20);
    text("Click to select colors",50,50);
    text("Defult:",50,100);
    text("Flying:",50,150);
    text("Glow:",50,200);
    text("Sclera:",50,250);
    text("Pupil:",50,300);
    stroke(255, 255, 255);
    line(0,120,600,120);
    line(0,170,600,170);
    line(0,220,600,220);
    line(0,270,600,270);
    line(0,320,600,320);
    line(0,70,600,70);
    rect(0,320,600,200);
     block(0,390,600,10,8);
    fill(100, 0, 0);
    ellipse(200,95,30,30);
    if(dist(mouseX,mouseY,200,95)<15&&MouseRef.held('left')){
        cor2 = color(100, 0, 0);
        flight=false;
    }
    fill(150, 50, 0);
    ellipse(250,95,30,30);
    if(dist(mouseX,mouseY,250,95)<15&&MouseRef.held('left')){
        cor2 = color(150, 50, 0);
        flight=false;
    }
    fill(100, 50, 0);
    ellipse(300,95,30,30);
    if(dist(mouseX,mouseY,300,95)<15&&MouseRef.held('left')){
        cor2 = color(100, 50, 0);
        flight=false;
    }
    fill(0, 100, 0);
    ellipse(350,95,30,30);
    if(dist(mouseX,mouseY,350,95)<15&&MouseRef.held('left')){
        cor2 = color(0, 100, 0);
        flight=false;
    }
    fill(0, 0, 100);
    ellipse(400,95,30,30);
    if(dist(mouseX,mouseY,400,95)<15&&MouseRef.held('left')){
        cor2 = color(0, 0, 100);
        flight=false;
    }
    fill(100, 0, 100);
    ellipse(450,95,30,30);
    if(dist(mouseX,mouseY,450,95)<15&&MouseRef.held('left')){
        cor2 = color(100, 0, 100);
        flight=false;
    }
    fill(255, 255, 255);
    ellipse(500,95,30,30);
    if(dist(mouseX,mouseY,500,95)<15&&MouseRef.held('left')){
        cor2 = color(255, 255, 255);
        flight=false;
    }
    fill(0, 0, 0);
    ellipse(550,95,30,30);
    if(dist(mouseX,mouseY,550,95)<15&&MouseRef.held('left')){
        cor2 = color(0, 0, 0);
        flight=false;
    }
    
    
    fill(255, 0, 0);
    ellipse(200,145,30,30);
    if(dist(mouseX,mouseY,200,145)<15&&MouseRef.held('left')){
        cor = color(255, 0, 0);
        flight=true;
    }
    fill(255, 100, 0);
    ellipse(250,145,30,30);
    if(dist(mouseX,mouseY,250,145)<15&&MouseRef.held('left')){
        cor = color(255, 100, 0);
        flight=true;
    }
    fill(255, 255, 0);
    ellipse(300,145,30,30);
    if(dist(mouseX,mouseY,300,145)<15&&MouseRef.held('left')){
        cor = color(255, 255, 0);
        flight=true;
    }
    fill(10, 180, 0);
    ellipse(350,145,30,30);
    if(dist(mouseX,mouseY,350,145)<15&&MouseRef.held('left')){
        cor = color(10, 180, 0);
        flight=true;
    }
    fill(0, 200, 255);
    ellipse(400,145,30,30);
    if(dist(mouseX,mouseY,400,145)<15&&MouseRef.held('left')){
        cor = color(0, 200, 255);
        flight=true;
    }
    fill(255, 0, 255);
    ellipse(450,145,30,30);
    if(dist(mouseX,mouseY,450,145)<15&&MouseRef.held('left')){
        cor = color(255, 0, 255);
        flight=true;
    }
    fill(255, 255, 255);
    ellipse(500,145,30,30);
    if(dist(mouseX,mouseY,500,145)<15&&MouseRef.held('left')){
        cor = color(255, 255, 255);
        flight=true;
    }
    fill(0, 0, 0);
    ellipse(550,145,30,30);
    if(dist(mouseX,mouseY,550,145)<15&&MouseRef.held('left')){
        cor = color(0, 0, 0);
        flight=true;
    }
    
    
    
    fill(255, 0, 0);
    ellipse(200,195,30,30);
    if(dist(mouseX,mouseY,200,195)<15&&MouseRef.held('left')){
        cor3 = color(255, 0, 0);
        flight=false;
    }
    fill(255, 100, 0);
    ellipse(250,195,30,30);
    if(dist(mouseX,mouseY,250,195)<15&&MouseRef.held('left')){
        cor3 = color(255, 100, 0);
        flight=false;
    }
    fill(255, 255, 0);
    ellipse(300,195,30,30);
    if(dist(mouseX,mouseY,300,195)<15&&MouseRef.held('left')){
        cor3 = color(255, 255, 0);
        flight=false;
    }
    fill(0, 180, 0);
    ellipse(350,195,30,30);
    if(dist(mouseX,mouseY,350,195)<15&&MouseRef.held('left')){
        cor3 = color(0, 180, 0);
        flight=false;
    }
    fill(0, 200, 255);
    ellipse(400,195,30,30);
    if(dist(mouseX,mouseY,400,195)<15&&MouseRef.held('left')){
        cor3 = color(0, 200, 255);
        flight=false;
    }
    fill(255, 0, 255);
    ellipse(450,195,30,30);
    if(dist(mouseX,mouseY,450,195)<15&&MouseRef.held('left')){
        cor3 = color(255, 0, 255);
        flight=false;
    }
    fill(255, 255, 255);
    ellipse(500,195,30,30);
    if(dist(mouseX,mouseY,500,195)<15&&MouseRef.held('left')){
        cor3 = color(255, 255, 255);
        flight=false;
    }
    fill(0, 0, 0);
    ellipse(550,195,30,30);
    if(dist(mouseX,mouseY,550,195)<15&&MouseRef.held('left')){
        cor3 = color(0, 0, 0);
        flight=false;
    }
    
    
    
    fill(255, 0, 0);
    ellipse(200,245,30,30);
    if(dist(mouseX,mouseY,200,245)<15&&MouseRef.held('left')){
        cor4 = color(255, 0, 0);
        flight=false;
    }
    fill(255, 100, 0);
    ellipse(250,245,30,30);
    if(dist(mouseX,mouseY,250,245)<15&&MouseRef.held('left')){
        cor4 = color(255, 100, 0);
        flight=false;
    }
    fill(255, 255, 0);
    ellipse(300,245,30,30);
    if(dist(mouseX,mouseY,300,245)<15&&MouseRef.held('left')){
        cor4 = color(255, 255, 0);
        flight=false;
    }
    fill(0, 180, 0);
    ellipse(350,245,30,30);
    if(dist(mouseX,mouseY,350,245)<15&&MouseRef.held('left')){
        cor4 = color(0, 180, 0);
        flight=false;
    }
    fill(0, 200, 255);
    ellipse(400,245,30,30);
    if(dist(mouseX,mouseY,400,245)<15&&MouseRef.held('left')){
        cor4 = color(0, 200, 255);
        flight=false;
    }
    fill(255, 0, 255);
    ellipse(450,245,30,30);
    if(dist(mouseX,mouseY,450,245)<15&&MouseRef.held('left')){
        cor4 = color(255, 0, 255);
        flight=false;
    }
    fill(255, 255, 255);
    ellipse(500,245,30,30);
    if(dist(mouseX,mouseY,500,245)<15&&MouseRef.held('left')){
        cor4 = color(255, 255, 255);
        flight=false;
    }
    fill(0, 0, 0);
    ellipse(550,245,30,30);
    if(dist(mouseX,mouseY,550,245)<15&&MouseRef.held('left')){
        cor4 = color(0, 0, 0);
        flight=false;
    }
    
    
    
    fill(100, 0, 0);
    ellipse(200,295,30,30);
    if(dist(mouseX,mouseY,200,295)<15&&MouseRef.held('left')){
        cor5 = color(100, 0, 0);
        flight=false;
    }
    fill(150, 50, 0);
    ellipse(250,295,30,30);
    if(dist(mouseX,mouseY,250,295)<15&&MouseRef.held('left')){
        cor5 = color(150, 50, 0);
        flight=false;
    }
    fill(100, 50, 0);
    ellipse(300,295,30,30);
    if(dist(mouseX,mouseY,300,295)<15&&MouseRef.held('left')){
        cor5 = color(100, 50, 0);
        flight=false;
    }
    fill(0, 100, 0);
    ellipse(350,295,30,30);
    if(dist(mouseX,mouseY,350,295)<15&&MouseRef.held('left')){
        cor5 = color(0, 100, 0);
        flight=false;
    }
    fill(0, 0, 100);
    ellipse(400,295,30,30);
    if(dist(mouseX,mouseY,400,295)<15&&MouseRef.held('left')){
        cor5 = color(0, 0, 100);
        flight=false;
    }
    fill(100, 0, 100);
    ellipse(450,295,30,30);
    if(dist(mouseX,mouseY,450,295)<15&&MouseRef.held('left')){
        cor5 = color(100, 0, 100);
        flight=false;
    }
    fill(50, 50, 50);
    ellipse(500,295,30,30);
    if(dist(mouseX,mouseY,500,295)<15&&MouseRef.held('left')){
        cor5 = color(33, 33, 33);
        flight=false;
    }
    fill(0, 0, 0);
    ellipse(550,295,30,30);
    if(dist(mouseX,mouseY,550,295)<15&&MouseRef.held('left')){
        cor5 = color(0, 0, 0);
        flight=false;
    }
    stroke(0, 0, 0);
    }
    if(lvl===-1){
        devmode=true;
        background(69, 69, 69);
        vertical=false;
        heightY=0;
        block(0,400,600,10,8);
        text("Develper map",21,37);
        if(Y+30>400){Y=400;}
        block(100,100,50,50,8);
        jblock(179,100,50,50,8,1);
        owblock(331,100,50,50,1,1);
        if(Y+30<0){
            Y=370;
            lvl=0;
        }
    }
    {
        if(devmode===true){
            t_complete=true;
            if(keys[49]){
                flight=true;
            }
            if(keys[50]){
                flight=false;
            }
            if(keys[51]){
                colide=false;
                
            }
            if(keys[52]){
                colide=true;
                
            }
            if(keys[53]){
                sppppeeed3=true;
                sppppeeed=0;
            }
            if(keys[54]){
                sppppeeed3=false;
                sppppeeed=0;
            }
            if(keys[55]){
                ic=true;
            }
            if(keys[56]){ic=false;}
            if(keys[90]){
            cor2 = color(0,0,0);
            }
            if(keys[88]){
            cor2 = color(41, 0, 143);
            }
            if(keys[67]){
            cor2 = color(102, 0, 0);
            }
            if(keys[86]){
            cor2 = color(0, 67, 82);
            }
            if(keys[66]){
            cor = color(0,0,0);
            }
            if(keys[78]){
            cor = color(0,200,255);
            }
            if(keys[77]){
            cor = color(255, 0, 0);
            }
            if(keys[188]){
            cor = color(0, 171, 31);
            }
            
            
        }
    }
    if(lvl===0){
        if(Y>400){Y=-30;lvl=-1;}
        
        /**
        You can play on the title screen by not clicking the click to play box.
        **/
        background(69, 69, 69);
        if(kc===false){
        X=89;
        Y=47;
        sy=0;
        }else{vertical=true;}
    block(0,400,600,10,8);
    if(KeysRef.held('ArrowDown')&&keys[17]&&Y>350&&X<50){
        Y+=40;
    }
    block(0,796,600,10,8);
    fill(0, 0, 0);
    textSize(50);
    text("Ch rgy!",28,77+heightY);
    fill(255, 0, 0);
    rect(0,-60+heightY,600,50);
    fill(0, 0, 0);
    textSize(20);
    text("Start Speedrun mode",48,-21+heightY);
    text("Turtoral skip doesn't work in speedruns",80,-103+heightY);
    text("Skip Turtorial",418,347+heightY);
    triangle(512,360+heightY,512,381+heightY,527,369+heightY);
    strokeWeight(3);
    line(483,370+heightY,511,370+heightY);
    line(483,370+heightY,483,354+heightY);
    strokeWeight(1);
    text("Jump here",461,-21+heightY);
    if(X>500&&heightY>100&&Y<300){
        sppppeeed3=true;
    }
    textSize(30);
    text("By Eligamer567!",322,154+heightY);
    fill(38, 38, 38);
    rect(177,178+heightY,260,55);
    fill(140, 140, 140);
    text("Click to play!",185,217+heightY);
    block(-1,105,77,22,7);
    block(115,105,489,22,31);
    block(-281,165,489,22,30);
    block(-281,228,749,28,30);
    block(115,300,489,22,31);
    block(116,379,34,38,32);
    block(189,322,34,38,33);
    block(265,367,34,38,34);
    block(343,322,34,38,35);
    block(439,366,34,38,34);
    block(189,410,34,38,6);
    textSize(20);
    phone(563,359);
    }
    if(lvl===1){
    background(115, 115, 115);
    noStroke();
    block(-1,382,603,50,7); 
    block(-1,-37,603,50,7);
    block(-1,-2,14,414,7); 
    block(586,-2,14,414,7);
    block(0,294,109,10,7);
    block(100,95,10,204,7);
    block(100,190,10,129,7);
    ts=false;
    noStroke();
    block(192,190,486,10,7);
    block(101,190,41,10,7);
    block(100,295,436,10,7);
    phone(46,253);
    fill(0, 0, 0);
    text("Right And left keys to move,Up key to jump",20,45);
    text("Go by a phone to charge it and beat the level",20,69);
    }
    if(lvl===2){
        background(171, 128, 78);
        block(-1,0,601,10,34);
        block(-1,390,601,10,34);
        block(0,-1,10,401,34);
        block(589,-1,10,402,34);
        owblock(259,340,50,50,1,4);
        block(0,330,540,10,34);
        owblock(10,215,50,50,1,3);
        block(60,260,388,5,34);
        block(60,215,479,5,34);
        block(-8,153,537,5,34);
        block(157,0,8,158,34);
        owblock(165,103,50,50,1,2);
        owblock(539,216,50,50,1,1);
        block(62,100,30,5,34);
        phone(69,70);
        fill(0, 0, 0);
        text("Look closly at the blocks, and what they do whey you interact with them.",170,22,400,100);
    }
    if(lvl===3){
        basic(7);
        teleporter(300,377,25,400);
        owblock(550,294,50,50,2,1);
    teleporter(26,336,29,50);
    block(0,0,600,5,7);
    block(0,394,600,5,7);
    block(594,0,5,400,7);
    block(0,0,5,400,7);
    block(0,293,51,21,7);
    block(46,314,5,85,7);
    owblock(51,294,50,50,2,1);
    owblock(101,294,50,50,2,1);
    owblock(150,294,50,50,2,1);
    owblock(200,294,50,50,2,1);
    owblock(250,294,50,50,2,1);
    owblock(300,294,50,50,2,1);
    owblock(350,294,50,50,2,1);
    owblock(400,294,50,50,2,1);
    owblock(450,294,50,50,2,1);
    owblock(500,294,50,50,2,1);
    block(6,120,41,5,7);
    block(80,162,15,5,7);
    block(183,162,15,5,7);
    block(410,96,15,5,7);
    block(137,106,5,30,7);
    jump_orb(316,183);
    jump_orb(514,183);
    teleporter(580,50,24,143);
    block(46,120,5,174,7);
    phone(18,245);
    fill(0, 0, 0);
    text("Teleporter- Teleport for purple orb to pink orb",39,35);
    text("Jump orb- Jump on a blue orb to double-jump",51,62);
    }
    if(lvl===4){
    background(171, 128, 78);
    block(-5,-5,615,15,34);
    block(-5,390,615,15,34);  
    jblock(-5,0,15,415,34,2);  
    block(590,0,15,415,34); 
    block(73,99,94,10,34);
    block(116,171,176,10,34);
    block(161,99,10,82,34);
    jblock(268,99,24,82,34,2);
    block(74,180,10,223,34);
    block(74,231,456,10,34);
    block(73,0,10,109,34);
    slider(116,181,176,50,1,1);
    teleporter(215,140,320,208);
    teleporter(108,80,105,368);
    teleporter(154,368,105,368);
    teleporter(190,368,105,368);
    teleporter(298,368,105,368);
    teleporter(329,368,105,368);
    teleporter(425,368,105,368);
    teleporter(454,368,105,368);
    jump_orb(244,368);
    jump_orb(377,368);
    slider(540,60,50,266,1,2);
    slider(360,60,50,121,1,2);
    slider(540,10,50,50,1,3);
    slider(360,10,50,50,1,3);
    slider(360,181,50,50,1,3);
    slider(410,181,50,50,1,1);
    slider(460,181,50,50,1,3);
    slider(410,10,130,50,1,1);
    block(510,60,30,267,34);
    block(350,-25,10,266,34);
    block(410,60,130,30,34);
    block(410,60,50,121,34);
    owblock(460,131,50,50,1,3);
    phone(476,96);
    
    }
    if(lvl===5){
        background(115, 115, 115);
        bphones = 2; 
        basic();
        bphone(556,27,1);
        bphone(33,343,2);
        block(-4,273,240,50,6);
        block(286,285,240,38,6);
        block(540,63,50,156,6);
        block(187,106,50,10,6);
        block(267,78,50,10,6);
        block(362,77,50,10,6);
        block(106,63,10,98,6);
        block(88,63,50,10,6);
        owblock(236,273,50,50,2,1);
        jump_orb(469,119);
        teleporter(14,70,110,39);
        teleporter(159,95,110,39);
        teleporter(254,95,110,39);
        teleporter(346,95,110,39);
        teleporter(506,165,110,39);
        teleporter(467,165,110,39);
        teleporter(429,165,110,39);
        teleporter(429,122,110,39);
        teleporter(82,110,110,39);
        teleporter(81,264,110,39);
        fill(0, 0, 0);
        text("You have to charge phones in rainbow order",20,28);
    }
    if(lvl===6){
        basic(7);
        text("Lets start the game!",189,58);
        fill(0, 0, 0);
        ellipse(300,200,50,50);
        if(dist(X,Y,300,200)<55){
            swichlvl('exit');
        }
        slider(276,239,50,160,2,2);
        block(-10,-10,20,420,6);
        block(-10,-10,620,20,6);
        block(-10,390,620,20,6);
        block(590,-10,20,420,6);
        for(let i = 0;i<100;i++){
            fill(i*5,i*5,i*5,i/5);
            noStroke();
            ellipse(300,200,i,i);
        pushMatrix();
        translate(300,200);
        rotate(start_game_rotate_amoumt);
        strokeWeight(50);
        stroke(cor3,i/15);
        for(let a = 0;a<36;a+=1){
        rotate(10);
        line(0,0,i*2,0);
        }
        popMatrix();
        }
    }
    if(lvl===7){
        noStroke();
        t_complete=true;
        background(122, 122, 122);
        block(-10,390,620,20,8);
        pushMatrix();
        translate(0,0);
        for(let i = 0;i<10000;i+=500){
        fill(60, 60, 60);
        rect(i+cx,0,100,390);
        fill(69, 69, 69);
        rect(i+cx+100,0,100,390); 
        fill(84, 84, 84);
        rect(i+200+cx,0,100,390);
        fill(69, 69, 84);
        rect(i+300+cx,0,100,390);
        fill(94, 94, 94);
        rect(i+400+cx,0,100,390);
        }
        fill(255, 255, 255);
        rect(100+cx,0,500,400-10);
        fill(191, 191, 191);
        rect(600+cx,0,200,400-10);
        fill(0, 0, 0);
        if(supreme_levels_complete>0){
            fill(87, 0, 0);
            rect(cx-600,0,600,400);
            fill(255, 94, 0);
            rect(cx-600,390,600,10);
            fill(255, 255, 255);
        text("Supreme Oufits",cx+-400,62);
        text("Dash",cx-575,200);
        text("Time",cx-450,200);
        text("Remove",cx-335,200);
        text("Jump",cx-200,200);
        text("Teleport",cx-100,200);
        if(dist(X,Y,cx-50,300)<50){
            crown = 4;
        }
        if(dist(X,Y,cx-175,300)<50){
            crown = 3;
        }
        if(dist(X,Y,cx-425,300)<50){
            crown = 2;
        }
        if(dist(X,Y,cx-550,300)<50){
            crown = 1;
        }
        if(dist(X,Y,cx-300,300)<50){
            crown = 0;
        }
        pushMatrix();
        translate(cx-550,300);
        rotate(45);
        fill(0, 238, 255);
        rect(-25,-25,50,50);
        fill(0, 115, 255);
        rotate(45);
        rect(-25,-25,50,50);
        popMatrix();
        pushMatrix();
        translate(cx-425,300);
        rotate(45);
        fill(0, 255, 47);
        rect(-25,-25,50,50);
        fill(0, 110, 7);
        rotate(45);
        rect(-25,-25,50,50);
        popMatrix();
        pushMatrix();
        translate(cx-300,300);
        rotate(45);
        fill(255, 255, 255);
        rect(-25,-25,50,50);
        fill(163, 163, 163);
        rotate(45);
        rect(-25,-25,50,50);
        popMatrix();
        pushMatrix();
        translate(cx-175,300);
        rotate(45);
        fill(100, 0, 255);
        rect(-25,-25,50,50);
        fill(110, 0, 100);
        rotate(45);
        rect(-25,-25,50,50);
        popMatrix();
        pushMatrix();
        translate(cx-50,300);
        rotate(45);
        fill(38, 38, 38);
        rect(-25,-25,50,50);
        fill(0, 0, 0);
        rotate(45);
        rect(-25,-25,50,50);
        popMatrix();
        }
        fill(0, 0, 0);
        text("",cx+-106,62);
        text("   Title",cx+-5,62);
         text("   TURTORIAL",cx+228,62);
         text("Start",cx+627,62);
         text("Map",cx+737,62);
         textSize(15);
         text("An Average Farmer's Level",cx+1506,26,100,10000);
         text("An Average Farmer's Level",cx+1906,26,100,10000);
         textSize(20);
         stroke(0, 0, 0);
         line(cx+700,0,cx+700,400);
         noStroke();
        
        for(let b = 0;b<levels+1;b++){
            var b1 = b*100;
            fill(0, 0, 0);
        ellipse(51+b1+cx,240,50,50);
        
        fill(0, 0, 0);
        ellipse(51+cx,240,50,50);
        if(dist(51+b1+cx,240,X,Y)<60){
            swichlvl('enter',b);
        }
        fill(0, 0, 0); 
        text(b,b1+46+cx,100);
        
        }
        
        
        
        text("Custom",4912+cx, 200);
        fill(0, 0, 0);
        ellipse(4948+cx,240,50,50);
        if(dist(4948+cx,240,X,Y)<60){
            nlvl=true;
            swichlvl('enter',"custom");
        }
        if(flight===false){
        fill(100, 0, 0);
        ellipse(5048+cx,240,50,50);
        if(dist(5048+cx,240,X,Y)<60){
            cor2= color(100,0,0);
        }
        fill(200, 50, 0);
        ellipse(5148+cx,240,50,50);
        if(dist(5148+cx,240,X,Y)<60){
            cor2= color(200,50,0);
        }
        fill(200, 200, 0);
        ellipse(5248+cx,240,50,50);
        if(dist(5248+cx,240,X,Y)<60){
            cor2= color(200,200,0);
        }
        fill(0, 100, 0);
        ellipse(5348+cx,240,50,50);
        if(dist(5348+cx,240,X,Y)<60){
            cor2= color(0,100,0);
        }
        fill(0, 0, 100);
        ellipse(5448+cx,240,50,50);
        if(dist(5448+cx,240,X,Y)<60){
            cor2= color(0,0,100);
        }
        fill(100, 0, 100);
        ellipse(5548+cx,240,50,50);
        if(dist(5548+cx,240,X,Y)<60){
            cor2= color(100,0,100);
        }
        fill(0, 0, 0);
        ellipse(5648+cx,240,50,50);
        if(dist(5648+cx,240,X,Y)<60){
            cor2= color(0,0,0);
        }
        fill(0, 91, 196);
        ellipse(5748+cx,240,50,50);
        if(dist(5748+cx,240,X,Y)<60){
            flight=true;
        }
        fill(171, 0, 0);
        ellipse(5848+cx,240,50,50);
        if(dist(5848+cx,240,X,Y)<60){
            flight=false;
        }
        }
        if(flight===true){
        fill(255, 0, 0);
        ellipse(5048+cx,240,50,50);
        if(dist(5048+cx,240,X,Y)<60){
            cor= color(255,0,0);
        }
        fill(200, 100, 0);
        ellipse(5148+cx,240,50,50);
        if(dist(5148+cx,240,X,Y)<60){
            cor= color(255,100,0);
        }
        fill(200, 200, 0);
        ellipse(5248+cx,240,50,50);
        if(dist(5248+cx,240,X,Y)<60){
            cor= color(200,200,0);
        }
        fill(0, 200, 0);
        ellipse(5348+cx,240,50,50);
        if(dist(5348+cx,240,X,Y)<60){
            cor= color(0,200,0);
        }
        fill(0, 200, 255);
        ellipse(5448+cx,240,50,50);
        if(dist(5448+cx,240,X,Y)<60){
            cor= color(0,200,255);
        }
        fill(200, 0, 200);
        ellipse(5548+cx,240,50,50);
        if(dist(5548+cx,240,X,Y)<60){
            cor= color(200,0,200);
        }
        fill(0, 0, 0);
        ellipse(5648+cx,240,50,50);
        if(dist(5648+cx,240,X,Y)<60){
            cor= color(0,0,0);
        }}
        fill(0, 200, 255);
        ellipse(5748+cx,240,50,50);
        if(dist(5748+cx,240,X,Y)<60){
            flight=true;
        }
        fill(255, 0, 0);
        ellipse(5848+cx,240,50,50);
        if(dist(5848+cx,240,X,Y)<60){
            flight=false;
        
        }
        popMatrix();
        if(cx>600){
            cx=600;
        }
        if(X<100&&cx<600){
            sx+=1;
            cx+=3;
            if(using_ability&&crown===1){
                cx+=5;
            }
        }
        if(X>500){
            sx-=1;
            cx-=3;
            if(using_ability&&crown===1){
                cx-=5;
            }
        }
    }
    /**
    if(lvl===8){
    background(168, 124, 80);
    background(171, 128, 78);
    block(-5,-5,615,15,34);
    block(-5,390,615,15,34);  
    block(-5,0,15,415,34);  
    block(590,0,15,415,34); 
    block(54,52,3,299,34);
    block(93,52,3,130,34);
    block(93,273,3,76,34);
    block(502,247,53,147,34);
    block(145,246,5,155,34);
    block(539,47,3,123,34);
    block(5,350,10,3,34);
    block(5,255,10,3,34);
    block(4,165,10,3,34);
    block(3,108,10,3,34);
    block(4,52,10,3,34);
    block(43,299,10,3,34);
    block(43,216,10,3,34);
    block(93,347,57,3,34);
    block(150,306,9,3,34);
    block(223,310,1,1,34);
    block(270,267,1,1,34);
    block(323,274,1,1,34);
    block(365,263,1,20,34);
    block(417,255,1,1,34);
    block(455,255,24,1,34);
    block(92,212,557,3,34);
    block(156,84,9,3,34);
    block(213,95,9,3,34);
    block(270,67,9,3,34);
    block(343,76,9,3,34);
    block(395,44,162,3,34);
    block(94,130,10,3,34);
    bphones=2;
    bphone(515,12,1);
    bphone(561,353,2);
    }
    if(lvl===9){
        bphones=4;
        fill(230, 230, 230);
    background(255, 255, 255);
    rect(0,0,300,500);
    block(-5,-5,621,15,8);
    block(-5,390,615,15,8);  
    block(-5,0,15,415,8);  
    block(590,0,15,415,8); 
    if(X+30<=310){
        block(99,322,198,10,8);
        block(100,246,220,10,8);
        block(298,325,3,81,8);
        block(298,100,3,150,8);
        block(95,179,230,10,8);
        block(0,77,302,48,8);
        bphone(22,29,4);
        bphone(257,136,3);
    
    }
    if(X>=300){
    block(298,325,202,10,8);   
    block(298,100,3,130,8);
    block(298,220,3,130,8);
    block(403,144,5,33,8);
    block(457,89,5,33,8);
    block(457,214,5,33,8);
    block(346,101,5,33,8);
    block(390,270,5,10,8);
     block(529,265,5,10,8);
    block(505,66,90,19,8);
    block(515,86,90,38,8);
    block(525,125,90,45,8);
    block(535,170,90,49,8);
    block(550,218,90,56,8);
    block(565,275,90,61,8);
    block(580,332,90,61,8);
    block(-3,78,302,45,8);
    fill(107, 107, 107);
    rect(427,195,5,33);
    rect(355,195,5,33);
    rect(302,77,33,5);
    bphone(326,340,1);
    bphone(557,24,2);
    }
    if(X+30>299&&X<301){
        sy=0;
    }
    }
    if(lvl===10){
        vertical=true;
        noStroke();
    background(54, 54, 54);
    block(-5,390,615,15,8);  
    block(-5,-1000,15,1415,8);  
    block(-5,-1000,615,15,8);  
    block(590,-1000,15,1415,8);
    
    block(86,300,395,10,8);
    block(96,183,395,10,8);
    block(9,240,223,5,8);
    block(373,240,223,5,8);
    block(175,-375,10,300,8);
    block(375,-375,10,300,8);
    block(0,-375,597,10,8);
    flight_orb(300,150,true);
    flight_orb(300,242,false);
    flight_block(97,193,10,47,true);
    flight_block(481,193,10,47,false);
    teleporter(87,-369,280,-417);
    teleporter(280,-369,280,-417);
    flight_block(10,-537,100,10,true);
    flight_block(84,-616,100,10,true);
    flight_block(202,-677,100,10,false);
    flight_block(347,-705,100,10,true);
    flight_block(11,-844,579,10,false);
    flight_block(347,-780,10,75,true);
    flight_block(110,-537,360,10,false);
    flight_block(469,-537,121,10,true);
    flight_block(469,-637,10,100,false);
    flight_block(469,-637,121,10,false);
    flight_orb(58,-573,false);
    flight_orb(371,-700,false);
    flight_orb(418,-700,false);
    flight_orb(280,-417,true);
    phone(287,-927);
    }
    if(lvl===11){
    bphones=3;
    background(171, 128, 78);
    block(-5,-5,615,15,34);
    block(-5,0,15,415,34);  
    block(590,0,15,415,34);
    
    block(210,0,10,415,34);  
    sboost(110,370,100,30,-2);
    sboost(10,370,100,30,2);
    block(379,0,10,415,34);  
    sboost(300,370,79,30,-2);
    sboost(220,370,80,30,2);

    sboost(490,370,100,30,-2);
    sboost(390-1,370,100.5,30,2);
    owblock(85,219,50,50,1,3);
    block(125,0,10,295,34);
    block(85,0,10,295,34);
    teleporter(110,115,300,355);
    
    sboost(330,275,50,30,-2);
    sboost(220,275,50,30,1);
    sboost(330,175,50,30,-1);
    sboost(220,175,50,30,2);
    sboost(330,75,50,30,-2);
    sboost(220,75,50,30,1);
    bphone(346,35,1);
    bphone(292,360,3);
    teleporter(244,48,492,355);
    teleporter(504,76,29,283);
    sboost(452,275,138,30,-1);
    sboost(452,175,138,30,-1);
    sboost(452,75,138,30,1);
    bphone(559,35,2);
    }
    if(lvl===12){
    bphones = 4;    
    wooden();
    block(50,290,5,100,34);
    block(50,50,5,200,34);
    block(545,50,5,200,34);
    block(50,340,200,5,34);
    block(50,50,498,5,34);
    block(350,340,200,5,34);
    block(298,50,5,400,34);
    block(545,290,5,100,34);
    sboost(55,385,243,15,-2);
    sboost(55,385,243,15,-2);
    sboost(55,385,243,15,-2);
    sboost(303,385,243,15,2);
    sboost(303,385,243,15,2);
    sboost(303,385,243,15,2);
    jblock(0,55,10,50,34,2);
    jblock(590,55,10,50,34,4);
    owblock(50,55,50,50,1,2);
    owblock(500,55,50,50,1,4);
    block(350,230,200,5,34);
    flight_orb(323,205,false);
    flight_orb(323,105,true);
    teleporter(75,365,323,205);
    teleporter(521,365,272,363);
    block(350,99,200,5,34);
    flight_block(50,10,10,40,false);
    flight_block(540,10,10,40,false);
    flight_block(55,106,243,10,false);
    flight_block(55,158,135,10,false);
    flight_block(190,158,30,10,true);
    flight_block(220,158,78,10,false);
    flight_block(220,168,10,36,false);
    flight_block(105,204,146,10,false);
    flight_block(251,204,47,10,true);
    flight_block(55,240,123,10,false);
    flight_orb(160,229,true);
    flight_orb(205,114,false);
    bphone(584,62,1);
    bphone(14,351,2);
    bphone(563,356,3);
    bphone(296,0,4);
    }
    if(lvl===13){
bphones = 4;
background(115, 115, 115);
block(-10,-10,20,420,6);
block(280,-10,20,420,6);
block(50,-10,500,20,6);
block(-10,390,620,20,6);
block(590,-10,20,420,6);
block(50,0,10,50,6);
block(55,80,10,50,6);
block(10,120,55,10,6);
teleporter(94,109,30,98);
teleporter(125,34,30,98);
teleporter(172,109,30,98);
teleporter(173,182,30,98);
teleporter(255,182,30,98);
jump_orb(133,182);
jump_orb(34,22);
block(150,329,10,10,6);
block(65,281,10,10,6);
block(140,244,10,10,6);
block(343,351,10,10,6);
block(343,251,10,10,6);
block(476,251,10,10,6);
block(410,102,10,10,6);
jump_zipline(450,10,140,30);

jump_orb(410,218);
bphone(448,341,1);
bphone(416,341,3);
bphone(45,341,2);
bphone(73,341,4);
if(Y>500){
}
    }
    if(lvl===14){
        topb=-1500;
        vertical = true;
        basic(6);
        block(10,355,10,5,6);
        block(10,276,10,5,6);
        block(10,188,10,5,6);
        block(10,95,10,5,6);
        block(100,95,10,259,6);
        block(10,355,10,5,6);
        block(10,276,10,5,6);
        block(10,188,10,5,6);
        block(10,95,10,5,6);
        teleporter(307,38,306,-42);
        block(55,-78,10,5,6);
        block(192,111,10,5,6);
        block(113,-139,10,5,6);
        block(38,-197,10,5,6);
        block(123,-235,10,5,6);
        slider(60,-1241,50,900,2,2);
        block(110,-1240,100,100,6);
        slider(60,-1291,50,50,2,3);
        block(163,-1258,100,100,6);
        block(197,-1297,100,100,6);
        flight_orb(436,-742,true);
        phone(533,-58);
        supreme_block(195,-1387,100,10,true);
    }
    if(lvl===15){
    basic(36);
    block(130,85,250,3,8);
    jump_zipline(10.5,299, 475, 10);
    teleporter_bar(10.5,310,475,10,25,372);
    block(10.5,320,475,3,8);
    teleporter_bar(70,237,520,10,25,372);
    jump_zipline(70,227,435.6,10);
    block(70,260,413.5,3,8);
    jump_zipline(10.5,157,475,10);
    teleporter_bar(10.5,167,475,10,25,372);
    block(10.5,187,475,3,8);
    teleporter_bar(80.5,92,405,20,25,372);
    block(80.5,113,409,3,8);
    block(10.5,117,10,3,8);
    teleporter_bar(80.5,62,47,50,25,372);
    block(50,74,30,3,8);
    block(80.5,57,47,3,8);
    block(534,227,2,2,8);
    block(560,172,2,2,8);
    block(29,289,2,2,8);
    block(499,164,2,2,8);
    block(129,57,3,30,8);
    block(78,75,3,41,8);
    bphones=2;
    bphone(350,50,1);
    bphone(560,350,2);
    }
    if(lvl===16){
        if(dist(X,Y,mx,my)<30&&supreme_mode===false&&colide){
        swichlvl('death');
        mStart = false;
        mx=500;
        my=350;
        nlvl=true;
        }else if(Y<300){
        }
        basic(6);
        mStart = true;
        block(115,300,10,100,6);
        block(190,344,10,10,6);
        block(190,239,10,10,6);
        block(69,239,10,10,6);
        block(69,239-105,10,10,6);
        block(198,220-105,10,10,6);
        block(337,220-105,10,10,6);
        block(460,220-105,10,10,6);
        block(0,340,20,10,6);
        monster_action(102,362,'left+up');
        monster_action(13,385,'right+up');
        block(89,365,10,10,6);
        block(100,313,10,10,6);
        phone(460,79);
        
        monster_action(145,365,'jump');
        monster_action(145,321,'right');
        monster_action(198,321,'stop');
        monster_action(198,321,'jump');
        monster_action(198,306,'left');
        monster1();
    }
    if(lvl===17){
        snow();
        fill(0, 81, 255);
        rect(200,300,200,100-10);
        fill(0,81,255);
        rect(400,330,10,60,1);
        rect(220,300-20,200-40,100-10);
        block(190,300,10,100,1);
        block(200,280,20,20,1);
        block(220,270,160,10,1);
        block(380,280,20,20,1);
        block(400,300,10,30,1);
        if(snowa>0){
        block(400,330,5,60,1);
        block(0,330,200,10,1);
        }
        if(dist(snowx1,Y,400,350)<20){
            snowa-=1;
        }
        if(snowpush===0){
        mx=230+snowpush;
        my=360;
        }
        mStart = true;
        monster1();
        phone(210,360);
        if(keys[32]){
            snowthrown = true;
            snowx1 = X;
        }
        fill(255, 255, 255);
        ellipse(snowx1,Y+15,10,10);
        ellipse(snowx2,my+15,10,10);
        if(snowthrown){
        if(snowx2<0||snowx2>600){
            snowx2=mx;
            if(mx<X){
                snows2=10;
            }
            if(mx>X){
                snows2=-10;
            }
        }
        }
        if(snowthrown){
        snowx2+=snows2;
        }
        snowx1+=snows1;
        if(X>mx){snows1=-10;}
        if(X<mx){snows1=10;}
        if(dist(snowx1,Y,mx,my)<20){
            mx+=snows1;
            snowx1=1000;
            snowpush+=1;
    }
    if(dist(snowx2,my,X,Y)<10){
            X+=snows2;
            snowx2=1000;
    }
    fill(0, 0, 0);
    text("Spacebar to throw snowball",140,100);
    }
    if(lvl===18){
    snow();
    block(75,52,3,299,1);
    block(113,52,3,299,1);
    block(75,52,35,3,1);
    block(502,247,53,147,1);
    block(539,47,3,123,1);
    block(5,350,10,5,1);
    block(5,300,10,5,1);
    block(5,250,10,5,1);
    block(4,200,10,5,1);
    block(4,150,10,5,1);
    block(4,100,10,5,1);
    block(69,216,10,5,1);
    block(75,348,35,5,1);
    block(430,310,3,5,1);
    block(417,255,3,5,1);
    block(455,255,24,5,1);
    block(156,84,9,5,1);
    block(213,95,9,5,1);
    block(270,67,9,5,1);
    block(343,76,9,5,1);
    block(395,44,162,5,1);
    block(77,207,35,5,1);
    block(490,107,5,5,1);
    block(485,206,5,5,1);
    block(459,158,5,5,1);
    teleporter(73,212,200,200,'none');
    teleporter(571,369,94,70);
    teleporter_bar(116,103,275,3,35,375);
    teleporter_bar(502,112,35,3,35,375);
     bphones=3;
    bphone(89,175,1);
    bphone(515,12,2);
    bphone(515,59,3);
    }**/
    //World 1
    if(lvl===101){
        background(117, 2, 2);
        noStroke();
    vertical = true;
    topb = -1000;
    block(-5,-1000,615,15,11);
    block(-5,390,615,15,11);
    block(-5,-1000,15,1415,11);
    block(590,-1000,15,1415,11);
    jblock(0,285,500,10,11,2);
    teleporter(100,350,50,350);
    teleporter(545,321,50,350);
    teleporter_bar(190,380,60,10,50,350);
    jblock(300,330,15,60,11,4);
    teleporter_bar(311,350,5,40,50,350);
    jblock(370,330,15,60,11,4);
    block(0,200,50,10,11);
    jblock(10,210,35,75,11,2);
    block(80,200,50,10,11);
    teleporter_bar(82,210,10,10,480,270);
    jblock(90,210,35,75,11,2);
    block(160,200,50,10,11);
    block(219,200,50,90,11);
    block(319,200,50,90,11);
    block(299,200,50,10,11);
    keyed(85,250,1);
    keyed(573,128,2);
    keyed(185,250,3);
    keyed(306,250,5);
    keyblock(0,100,600,10,5);
    owblock(550,150,50,50,1,3);
    teleporter(575,90,300,0);
    block(275,20,50,10,11);
    flight_orb(300,0,true);
    noStroke();
    teleporter_bar(380,-30,210,10,300,0);
    teleporter_bar(380,-75,110,10,300,0);
    teleporter_bar(530,-75,60,10,300,0);
    teleporter_bar(380,-125,210,10,300,0);
    teleporter_bar(380,-125,10,60,300,0);
    teleporter_bar(40,-200,10,150,300,0);
    teleporter_bar(10,0,90,10,50,350);
    teleporter_bar(40,-60,60,10,300,0);
    //Teleporter maze
    teleporter_bar(10,-300,450,50,300,0);
    teleporter_bar(10,-300-500,350,50,300,0);
    teleporter_bar(10+400,-300-500,180,50,300,0);
    teleporter_bar(10+200,-300-450,50,100,300,0);
    teleporter_bar(10+100,-300-400,100,50,300,0);
    teleporter_bar(10+350,-300-400,100,50,300,0);
    teleporter_bar(10+100,-300-300,200,50,300,0);
    teleporter_bar(10+400,-300-300,100,50,300,0);
    teleporter_bar(10+100,-300-250,50,100,300,0);
    teleporter_bar(10+400,-300-250,50,100,300,0);
    teleporter_bar(10+300,-300-200,100,50,300,0);
    teleporter_bar(10+200,-300-200,50,200,300,0);
    teleporter_bar(10+50,-300-100,100,50,300,0);
    teleporter_bar(10+200,-300-100,150,50,300,0);
    teleporter_bar(10+400,-300-100,150,50,300,0);
    teleporter_bar(10+300,-300-450,50,200,300,0);
    teleporter_bar(510,-300-500,50,550,300,0);
    teleporter_bar(10,-300-500,50,550,300,0);
    //
    owblock(41,-50,50,49,1,4);
    keyed(25,-10,7);
    flight_orb(25,-150,false);
    flight_orb(25,-10,true);
    bphones= 3;
    bphone(572,-63,2);
    keyblock(560,-65,10,35,10);
    keyed(410,-95,6);
    bphone(292,-15,1);
    keyed(50,350,4);
    keyed(190,-725,8);
    keyed(190,-825,9);
    keyed(580,-425,10);
    keyblock(0,-1000,600,150,10);
    bphone(290,-920,3);
    if(keyscollected>=10){
        fill(255, 255, 255);
        textSize(20);
        text("Congratulations!",200,-960+heightY);
        text("Supreme 1 Complete!",180,-930+heightY);
    }
    }
    if(lvl===8){
        noStroke();
    basic(7); 
    block(54,52,3,299,7);
    block(93,52,3,130,7);
    block(93,273,3,76,7);
    block(502,247,53,147,7);
    block(145,246,5,155,7);
    block(539,47,3,123,7);
    block(5,350,10,3,7);
    block(5,255,10,3,7);
    block(8,165,15,3,7);
    block(4,108,15,3,7);
    block(0,52,15,3,7);
    block(43,299,11,3,7);
    block(43,216,11,3,7);
    block(93,347,57,3,7);
    block(150,306,9,3,7);
    block(223,310,3,3,7);
    block(270,267,3,3,7);
    block(323,274,3,3,7);
    block(365,263,3,20,7);
    block(417,255,3,3,7);
    block(455,255,24,1,7);
    block(92,212,557,3,7);
    block(156,84,9,3,7);
    block(213,95,9,3,7);
    block(270,67,9,3,7);
    block(343,76,9,3,7);
    block(395,44,162,3,7);
    block(94,130,10,3,7);
    bphones=2;
    bphone(515,12,1);
    bphone(561,353,2);   
    }
    if(lvl===9){
        bphones=2;
        noStroke();
        basic(7);
        block(100,300,10,90,7);
        block(150,265,10,90,7);
        block(200,300,10,90,7);
        block(250,265,10,90,7);
        block(300,300,10,90,7);
        block(350,265,10,90,7);
        block(400,300,10,90,7);
        block(450,265,10,90,7);
        block(500,300,10,90,7);
        block(550,265,10,90,7);
        block(80,255,510,10,7);
        
        
        stroke(0, 0, 0);
        jump_orb(30,290);
        teleporter(575,280,125,50);
        teleporter(165,100,30,290);
        teleporter(245,100,30,290);
        teleporter(325,100,30,290);
        teleporter(405,100,30,290);
        teleporter(485,100,30,290);
        noStroke();
        block(80,130,550,10,7);
        block(100,100,50,10,7);
        block(180,100,50,10,7);
        block(260,100,50,10,7);
        block(340,100,50,10,7);
        block(420,100,50,10,7);
        block(500,100,50,10,7);
        block(550,50,50,10,7);
        bphone(565,20,1);
        
        noStroke();
        block(80,130,10,50,7);
        stroke(0, 0, 0);
        jump_zipline(160,140,80,10);
        jump_zipline(300,140,80,10);
        jump_zipline(440,140,80,10);
        teleporter_bar(160,244,80,10,30,290);
        teleporter_bar(300,244,80,10,30,290);
        teleporter_bar(440,244,80,10,30,290);
        block(155,244,5,10,7);
        block(295,244,5,10,7);
        block(435,244,5,10,7);
        bphone(565,220,2);
        noStroke();
    }
    if(lvl===10){
    basic(7);
    jump_zipline(10,300, 475, 10);
    jump_zipline(70,227,435.6,10);
    jump_zipline(10,157,475,10);
    teleporter_bar(10,310,475,10,25,372);
    teleporter_bar(70,237,520,10,25,372);
    teleporter_bar(10,167,475,10,25,372);
    teleporter_bar(80,92,405,20,25,372);
    teleporter_bar(80,62,47,50,25,372);
    block(130,89,250,3,7);
    block(380,10,3,81,7);
    block(10,320,475,3,7);
    block(70,247,525,3,7);
    block(10,177,475,3,7);
    block(80,113,409,3,7);
    block(10,117,10,3,7);
    block(50,59,80,3,7);
    block(534,227,3,3,7);
    block(560,172,3,3,7);
    block(29,289,3,3,7);
    block(499,164,3,3,7);
    block(127,60,3,32,7);
    block(77,60,3,56,7);
    bphones=2;
    bphone(350,50,1);
    bphone(560,350,2);
    }
    if(lvl===11){
        bphones = 4;
background(115, 115, 115);
block(-10,-10,20,420,6);
block(280,-10,20,420,6);
block(50,-10,500,20,6);
block(-10,390,620,20,6);
block(590,-10,20,420,6);
block(50,0,10,50,6);
block(55,80,10,50,6);
block(10,120,55,10,6);
teleporter(94,109,30,98);
teleporter(125,34,30,98);
teleporter(172,109,30,98);
teleporter(173,182,30,98);
teleporter(255,182,30,98);
jump_orb(133,182);
jump_orb(34,22);
block(150,329,10,10,6);
block(65,281,10,10,6);
block(140,244,10,10,6);
block(343,351,10,10,6);
block(343,251,10,10,6);
block(476,251,10,10,6);
block(410,102,10,10,6);
jump_zipline(450,10,140,30);

jump_orb(410,218);
bphone(448,341,1);
bphone(416,341,3);
bphone(45,341,2);
bphone(73,341,4);
    }
    if(lvl===12){
    vertical=true;
        noStroke();
    background(54, 54, 54);
    block(-5,390,615,15,8);  
    block(-5,-1000,15,1415,8);  
    block(-5,-1000,615,15,8);  
    block(590,-1000,15,1415,8);
    
    block(86,300,395,10,8);
    block(96,183,395,10,8);
    block(9,240,223,5,8);
    block(373,240,223,5,8);
    block(175,-375,10,300,8);
    block(375,-375,10,300,8);
    block(0,-375,597,10,8);
    flight_orb(300,150,true);
    flight_orb(300,242,false);
    flight_block(97,193,10,47,true);
    flight_block(481,193,10,47,false);
    teleporter(87,-369,280,-417);
    teleporter(280,-369,280,-417);
    flight_block(10,-537,100,10,true);
    flight_block(84,-616,100,10,true);
    flight_block(202,-677,100,10,false);
    flight_block(347,-705,100,10,true);
    flight_block(11,-844,579,10,false);
    flight_block(347,-780,10,75,true);
    flight_block(110,-537,360,10,false);
    flight_block(469,-537,121,10,true);
    flight_block(469,-637,10,100,false);
    flight_block(469,-637,121,10,false);
    flight_orb(50,-573,false);
    flight_orb(371,-700,false);
    flight_orb(418,-700,false);
    flight_orb(280,-417,true);
    phone(287,-927);
    }
    if(lvl===13){
        flight_orb(0,390,true);
        basic(7);
        phone(570,10);
        
        block(210,10,40,40);
        
        block(10,50,40,40,7);
        block(90,50,40,40,7);
        block(130,50,40,40,7);
        block(170,50,40,40,7);
        block(250,50,40,40,7);
        block(330,30,40,60,7);
        block(370,50,40,40);
        block(410,50,40,40,7);
        block(450,50,40,40,7);
        block(490,50,40,40,7);
        block(530,50,30,40,7);
        
        block(250,90,40,40,7);
        block(450,90,40,40,7);
        block(490,90,40,40,7);
        
        block(10,130,40,40,7);
        block(50,130,40,40,7);
        block(130,130,40,40,7);
        block(170,130,40,40,7);
        block(210,130,40,40,7);
        block(250,130,40,40,7);
        block(330,130,40,40,7);
        block(370,130,40,40,7);
        block(450,130,40,40,7);
        block(490,130,40,40,7);
        
        
        block(210,170,40,40,7);
        block(250,170,40,40,7);
        block(330,170,40,40,7);
        block(450,170,40,40,7);
        block(490,170,40,40,7);
        
        block(50,210,40,40,7);
        block(90,210,40,40,7);
        block(250,210,40,40,7);
        block(330,210,40,40,7);
        block(410,210,40,40,7);
        block(450,210,40,40,7);
        block(490,210,40,40,7);
        
        block(130,250,40,40,7);
        block(170,250,40,40,7);
        block(330,250,40,40,7);
        block(410,250,40,40,7);
        block(450,250,40,40,7);
        block(490,250,40,40,7);
        
        block(50,290,40,40,7);
        block(130,290,40,40,7);
        block(170,290,40,40,7);
        block(210,290,40,40,7);
        block(250,290,40,40,7);
        block(290,290,40,40,7);
        block(330,290,40,40,7);
        block(410,290,40,40,7);
        block(450,290,40,40,7);
        block(490,290,40,40,7);
        
        block(50,330,40,40,7);
        block(410,330,40,30,7);
        block(450,330,40,30,7);
        block(490,330,40,30,7);
 
    }
    if(lvl===14){
        topb=-1500;
        vertical = true;
        basic(6);
        block(10,355,10,5,6);
        block(10,276,10,5,6);
        block(10,188,10,5,6);
        block(10,95,10,5,6);
        block(100,95,10,259,6);
        block(10,355,10,5,6);
        block(10,276,10,5,6);
        block(10,188,10,5,6);
        block(10,95,10,5,6);
        teleporter(307,38,306,-42);
        block(55,-78,10,5,6);
        block(192,111,10,5,6);
        block(113,-139,10,5,6);
        block(38,-197,10,5,6);
        block(123,-235,10,5,6);
        slider(60,-1241,50,900,2,2);
        block(110,-1240,100,100,6);
        slider(60,-1291,50,50,2,3);
        block(163,-1258,100,100,6);
        block(197,-1297,100,100,6);
        phone(533,-58);
        supreme_block(195,-1387,100,10,true);
    }
    if(lvl===15){
        if(Y<0){
            swichlvl('enter',-5);
        }
        if(dist(X,Y,mx,my)<30&&supreme_mode===false&&colide&&codee!=='done'){
        swichlvl('death');
        mStart = false;
        mx=500;
        my=350;
        nlvl=true;
        }else if(Y<300){
        }
        basic(6);
        mStart = true;
        block(115,300,10,100,6);
        block(190,344,10,10,6);
        block(190,239,10,10,6);
        block(69,239,10,10,6);
        block(69,239-105,10,10,6);
        block(198,220-105,10,10,6);
        block(337,220-105,10,10,6);
        block(460,220-105,10,10,6);
        block(0,340,20,10,6);
        monster_action(102,362,'left+up');
        monster_action(13,385,'right+up');
        block(89,365,10,10,6);
        block(100,313,10,10,6);
        phone(460,79);
        
        monster_action(145,365,'jump');
        monster_action(145,321,'right');
        monster_action(198,321,'stop');
        monster_action(198,321,'jump');
        monster_action(198,306,'left');
        monster1();
    }
    if(lvl===16){
        basic(7);
        fill(0);
        text("Spacebar to use ability",100,100);
        block(0,300,500,10,7);
        fill(0, 21, 255);
        ellipse(200,350,50,50);
        if(dist(200,350,X,Y)<50){
            crown=1;
        }
        if(dist(80,160,X,Y)<50){
            crown=2;
        }
        if(dist(525,100,X,Y)<50){
            crown=4;
        }
        if(dist(425,35,X,Y)<25){
            crown=3;
        }
        if(dist(100,10,X,Y)<20){crown=0; cor2=color(0,0,0);}
        teleporter_bar(50,290,400,10,30,380);
        block(50,200,50,5,7);
        block(500,150,50,5,7);
        block(400,60,200,5,7);
        fill(0, 100, 0);
        ellipse(80,160,50,50);
        fill(0, 0, 0);
        ellipse(525,100,50,50);
        fill(100, 0, 100);
        ellipse(425,35,50,50);
        phone(100,-1);
        block(100,40,50,10,7);
    }
    if(lvl===17){
        noStroke();
    bphones=4;
    fill(130, 130, 130);
    background(171, 128, 78);
    rect(0,0,300,500);
    block(-5,-5,621,15,8);
    block(-5,390,615,15,8);  
    block(-5,0,15,415,8);  
    block(590,0,15,415,8); 
    block(-5,-5,305,15,7);
    block(-5,-5,15,500,7);
    block(-5,390,305,15,7);
    block(300,-5,305,15,34);
    block(590,-5,15,500,34);
    block(300,390,400,500,34);
    if(X+30<=310){
        block(98,322,202,10,7);
        block(100,246,200,10,7);
        block(295,325,5,81,7);
        block(295,100,5,150,7);
        block(95,179,200,10,7);
        block(0,77,300,48,7);
        bphone(22,29,4);
        bphone(257,136,3);
    
    }
    if(X>=300){
    block(300,325,202,10,34);   
    block(300,77,5,250,34);
    block(403,144,5,35,34);
    block(457,89,5,33,34);
    block(457,214,5,33,34);
    block(346,101,5,33,34);
    block(390,270,5,10,34);
    block(529,265,5,11,34);
    block(505,66,90,20,34);
    block(515,86,90,39,34);
    block(525,125,90,45,34);
    block(535,170,90,49,34);
    block(550,218,90,57,34);
    block(565,275,90,62,34);
    block(580,332,90,61,34);
    fill(59, 29, 16);
    rect(427,195,5,33);
    rect(355,195,5,33);
    rect(302,77,33,5);
    bphone(326,340,1);
    bphone(557,24,2);
    }
    if(X+30>299&&X<301){
        sy=0;
    }
    }
    ang=0;
    //World 2
    if(lvl===102){}
    if(lvl===18){
    wooden();
    block(54,52,3,299,34);
    block(93,52,3,130,34);
    block(93,273,3,76,34);
    block(502,247,53,147,34);
    block(145,246,5,155,34);
    block(539,47,3,123,34);
    block(5,350,10,3,34);
    block(5,255,10,3,34);
    block(4,165,10,3,34);
    block(3,108,10,3,34);
    block(4,52,10,3,34);
    block(43,299,10,3,34);
    block(43,216,10,3,34);
    block(93,347,57,3,34);
    block(150,306,9,3,34);
    block(223,310,2,2,34);
    block(270,267,2,2,34);
    block(323,274,2,2,34);
    block(365,263,2,20,34);
    block(417,255,2,2,34);
    block(455,255,24,2,34);
    block(92,212,557,3,34);
    block(156,84,9,3,34);
    block(213,95,9,3,34);
    block(270,67,9,3,34);
    block(343,76,9,3,34);
    block(395,44,162,3,34);
    block(94,130,10,3,34);
    bphones=2;
    bphone(515,12,1);
    bphone(561,353,2);
    }
    if(lvl===19){
    ang=0;
    wooden();
    strokeWeight(1);
    phone(20,30);
    noStroke();
    slope(10,70,50,100,34,3);
    block(10,300,100,50,34);
    slope(110,300,25,50,34,3);
    slope(200,300,25,50,34,1);
    block(225,300,50,150,34);
    block(200,350,50,50,34);
    slope(275,300,190,90,34,2);
    slope(550,200,40,200,34,1);
    slope(400,100,50,50,34,1);
    slope(450,100,50,50,34,2);
    slope(400,150,50,50,34,4);
    slope(450,150,50,50,34,3);
    slope(300-50,125,50,25,34,1);
    slope(350-50,125,25,50,34,2);
    slope(300-50,150,25,50,34,4);
    slope(325-50,175,50,25,34,3);
    block(325-50,150,25,25,34);
    slope(300-200,125,50,40,34,1);
    slope(350-200,125,40,50,34,2);
    slope(300-200,165,40,50,34,4);
    slope(340-200,175,50,40,34,3);
    block(325-200,150,40,40,34);
    noFill();
    stroke(0,0,0);
    strokeWeight(2);
    beginShape();
    vertex(10,10);
    vertex(590,10);
    vertex(590,200);
    vertex(553,390);
    vertex(465,390);
    vertex(275,300);
    vertex(225,300);
    vertex(200,350);
    vertex(200,390);
    vertex(10,390);
    vertex(10,350);
    vertex(110,350);
    vertex(135,300);
    vertex(10,300);
    vertex(10,170);
    vertex(60,70);
    vertex(10,70);
    vertex(10,10);
    endShape();
    beginShape();
    vertex(150,125);
    vertex(190,175);
    vertex(140,215);
    vertex(100,165);
    vertex(150,125);
    endShape();
    beginShape();
    vertex(300,125);
    vertex(325,175);
    vertex(275,200);
    vertex(250,150);
    vertex(300,125);
    endShape();
    beginShape();
    vertex(400,150);
    vertex(450,100);
    vertex(500,150);
    vertex(450,200);
    vertex(400,150);
    endShape();
    strokeWeight(1);
    }
    if(lvl===20){
    bphones=3;
    background(171, 128, 78);
    block(-5,-5,615,15,34);
    block(-5,0,15,415,34);  
    block(590,0,15,415,34);
    
    block(210,0,10,415,34);  
    sboost(110,370,100,30,-2);
    sboost(10,370,100,30,2);
    block(379,0,10,415,34);  
    sboost(300,370,79,30,-2);
    sboost(220,370,80,30,2);

    sboost(490,370,100,30,-2);
    sboost(390-1,370,100.5,30,2);
    owblock(85,219,50,50,1,3);
    block(125,0,10,295,34);
    block(85,0,10,295,34);
    teleporter(110,115,300,355);
    
    sboost(330,275,50,30,-2);
    sboost(220,275,50,30,1);
    sboost(330,175,50,30,-1);
    sboost(220,175,50,30,2);
    sboost(330,75,50,30,-2);
    sboost(220,75,50,30,1);
    bphone(346,35,1);
    bphone(292,360,3);
    teleporter(244,48,492,355);
    teleporter(504,76,29,283);
    sboost(452,275,138,30,-1);
    sboost(452,175,138,30,-1);
    sboost(452,75,138,30,1);
    bphone(559,35,2);
    }
    if(lvl===21){
    bphones = 4;    
    wooden();
    block(50,290,5,100,34);
    block(50,50,5,200,34);
    block(545,50,5,200,34);
    block(50,340,200,5,34);
    block(50,50,498,5,34);
    block(350,340,200,5,34);
    block(298,50,5,400,34);
    block(545,290,5,100,34);
    sboost(55,385,243,15,-2);
    sboost(55,385,243,15,-2);
    sboost(55,385,243,15,-2);
    sboost(303,385,243,15,2);
    sboost(303,385,243,15,2);
    sboost(303,385,243,15,2);
    jblock(0,55,10,50,34,2);
    jblock(590,55,10,50,34,4);
    owblock(50,55,50,50,1,2);
    owblock(500,55,50,50,1,4);
    block(350,230,200,5,34);
    flight_orb(323,205,false);
    flight_orb(323,105,true);
    teleporter(75,365,323,205);
    teleporter(521,365,272,363);
    block(350,99,200,5,34);
    flight_block(50,10,10,40,false);
    flight_block(540,10,10,40,false);
    flight_block(55,106,243,10,false);
    flight_block(55,158,135,10,false);
    flight_block(190,158,30,10,true);
    flight_block(220,158,78,10,false);
    flight_block(220,168,10,36,false);
    flight_block(105,204,146,10,false);
    flight_block(251,204,47,10,true);
    flight_block(55,240,123,10,false);
    flight_orb(160,229,true);
    flight_orb(205,114,false);
    bphone(584,62,1);
    bphone(14,351,2);
    bphone(563,356,3);
    bphone(296,0,4);
    }
    if(lvl===22){
        topb=0;
        wooden();
        cannon(300,340);
        block(10,50,100,10,34);
        block(500,100,10,300,34);
        jump_orb(580,20);
        bphones=4;
        bphone(580,10,1);
        bphone(10,10,2);
        bphone(10,10,4);
        bphone(580,10,3);
        mx=530;
        my=360;
        monster1();
        mStart = true;
        if(dist(X+15,Y+15,mx+15,my+15)<20){
            swichlvl('death');
        }
    }
    if(lvl===23){
        ang=0;
    wooden();
    slope(50,350,50,50,34,1);
    block(100,350,50,50,34);
    slope(150,350,50,50,34,2);
    slope(250,350,50,50,34,1);
    block(300,350,50,50,34);
    slope(350,350,50,50,34,2);
    slope(400,200,200,200,34,1);
    block(500,150,50,10,34);
    block(450,100,10,50,34);
    block(450,0,10,50,34);
    
    block(500-120,150,50,10,34);
    block(450-100,100,10,50,34);
    block(450-100,0,10,50,34);
    
    block(500-220,150,50,10,34);
    block(450-200,100,10,50,34);
    block(450-200,0,10,50,34);
    
    block(500-320,150,50,10,34);
    block(450-300,100,10,50,34);
    block(450-300,0,10,50,34);
    
    block(500-420,150,50,10,34);
    block(450-400,100,10,50,34);
    block(450-400,0,10,50,34);
    
    block(0,100,50,10,34);
    
    teleporter(500-60,150,20,380);
    teleporter(500-130,150,20,380);
    teleporter(400-60,150,20,380);
    teleporter(400-130,150,20,380);
    teleporter(300-60,150,20,380);
    teleporter(300-130,150,20,380);
    teleporter(200-60,150,20,380);
    teleporter(200-130,150,20,380);
    phone(25,60);
    }
    if(lvl===24){
        wooden();
        owblock(60,340,50,50,1,4);
        owblock(260-50,340,50,50,1,4);
        owblock(360,340,50,50,1,4);
        bphones=4;
        bphone(30,10,1);
        bphone(450,10,2);
        bphone(30,50,3);
        bphone(450,50,4);
        noStroke();
        block(60,200,50,140,34);
        block(210,200,50,140,34);
        block(360,200,50,140,34);
        block(580,350,10,10,34);
        block(570,300,20,10,34);
        block(560,250,30,10,34);
        block(400,250,30,10,34);
        block(490,147,10,100,34);
        block(430,52,10,10,34);
        block(390,51,10,10,34);
        block(350,53,10,10,34);
        block(310,52,10,10,34);
        block(270,54,10,10,34);
        block(230,52,10,10,34);
        block(190,51,10,10,34);
        block(150,53,10,10,34);
        block(110,52,10,10,34);
        block(70,54,10,10,34);
        
    }
    if(lvl===25){
        //lazerX=0;
        noStroke();
        background(171, 128, 78);
        lazer();
        block(-5,390,105,15,34);
        block(-5,-1000,15,1415,34);
        block(590,-1000,15,1415,34);
        deathblock(100,392,490,10);
        block(10,350,50,10,34);
        block(150,350,10,10,34);
        block(350,350,10,10,34);
        block(500,350,90,10,34);
        block(500,250,90,10,34);
        block(400,200,10,10,34);
        block(339,224,10,10,34);
        block(239,224,10,10,34);
        block(139,224,10,10,34);
        block(10,124,40,10,34);
        block(10,184,40,10,34);
        teleporter(550,100,80,350);
        block(60,320,40,10,34);
        block(50,320,10,30,34);
        bphones = 3;
        bphone(550,300,1);
        bphone(10,140,2);
        bphone(570,300,3);
    }
    if(lvl===26){
        ang = 0;
        wooden();
        noStroke();
        block(10,300,400,10,34);
        slope(50,340,10,50,34,1);
        block(60,340,50,50,34);
        slope(110,340,10,50,34,2);
        slope(150,300,10,50,34,4);
        block(160,300,50,50,34);
        slope(210,300,10,50,34,3);
        slope(250,340,10,50,34,1);
        block(260,340,50,50,34);
        slope(310,340,10,50,34,2);
        slope(350,300,10,50,34,4);
        block(360,300,50,50,34);
        slope(410,300,10,50,34,3);
        
        slope(500,326,50,10,34,1);
        owblock(500,340,50,50,1,2);
        block(490,335,60,5,34);
        block(540,195,10,140,34);
        var slox = 0;
        var sloy = 0;
        slope(100+slox,100+sloy,25,25,34,1);
        slope(125+slox,100+sloy,25,25,34,2);
        slope(100+slox,125+sloy,25,25,34,3);
        slope(125+slox,125+sloy,25,25,34,4);
        var slox = 69;
        var sloy = 67;
        slope(100+slox,100+sloy,25,25,34,1);
        slope(125+slox,100+sloy,25,25,34,2);
        slope(100+slox,125+sloy,25,25,34,3);
        slope(125+slox,125+sloy,25,25,34,4);
        
        var slox = -59;
        var sloy = 101;
        slope(100+slox,100+sloy,25,25,34,1);
        slope(125+slox,100+sloy,25,25,34,2);
        slope(100+slox,125+sloy,25,25,34,3);
        slope(125+slox,125+sloy,25,25,34,4);
        var slox = 160;
        var sloy = -13;
        slope(100+slox,100+sloy,25,25,34,1);
        slope(125+slox,100+sloy,25,25,34,2);
        slope(100+slox,125+sloy,25,25,34,3);
        slope(125+slox,125+sloy,25,25,34,4);
        
        var slox = 201;
        var sloy = 111;
        slope(100+slox,100+sloy,25,25,34,1);
        slope(125+slox,100+sloy,25,25,34,2);
        slope(100+slox,125+sloy,25,25,34,3);
        slope(125+slox,125+sloy,25,25,34,4);
        var slox = 305;
        var sloy = -34;
        slope(100+slox,100+sloy,25,25,34,1);
        slope(125+slox,100+sloy,25,25,34,2);
        slope(100+slox,125+sloy,25,25,34,3);
        slope(125+slox,125+sloy,25,25,34,4);
        var slox = 409;
        var sloy = -34;
        slope(100+slox,100+sloy,25,25,34,1);
        slope(125+slox,100+sloy,25,25,34,2);
        slope(100+slox,125+sloy,25,25,34,3);
        slope(125+slox,125+sloy,25,25,34,4);
        bphones = 4;
        bphone(10,10,1);
        bphone(575,10,2);
        bphone(10,360,3);
        bphone(575,360,4);
    }
    if(lvl===27){
        ang=0;
    bphones=4;
    fill(171, 128, 78);
    background(0, 170, 255);
    rect(0,0,300,500);
    stroke(0, 149, 255);
    strokeWeight(5);
    line(302,0,302,400);
    line(350,0,350,400);
    line(400,0,400,400);
    line(450,0,450,400);
    line(500,0,500,400);
    line(550,0,550,400);
    for(let i = 0;i<20;i++){
        line(303,i*20,600,i*20);
    }
    strokeWeight(1);
    noStroke();
    block(-5,-5,621,15,34);
    block(-5,390,615,15,34);  
    block(-5,0,15,415,34);  
    block(590,0,15,415,34); 
    block(-5,-5,305,15,34);
    block(-5,-5,15,500,34);
    block(-5,390,305,15,34);
    block(300,-5,305,15,1);
    block(590,-5,15,500,1);
    block(300,390,400,500,1);
    if(X+30<=310){
    bphone(40,220,2);
    bphone(260,20,1);
    noStroke();
    block(60,100,10,251,34);
    slope(10,110+0,20,20,34,2);
    slope(10,130+0,20,20,34,3);
    slope(40,160+0,20,20,34,1);
    slope(40,180+0,20,20,34,4);
    slope(10,110+101,20,20,34,2);
    slope(10,130+101,20,20,34,3);
    slope(40,160+101,20,20,34,1);
    slope(40,180+101,20,20,34,4);
    slope(10+60,110+-10,20,20,34,2);
    slope(10+60,130+-10,20,20,34,3);
    slope(10+60,110+60,20,20,34,2);
    slope(10+60,130+60,20,20,34,3);
    slope(10+60,110+131,20,20,34,2);
    slope(10+60,130+131,20,20,34,3);
    slope(10+60,110+201,20,20,34,2);
    slope(10+60,130+201,20,20,34,3);
    slope(40+200+-100,160+ 0+100,20,20,34,1);
    slope(40+200+-100,180+ 0+100,20,20,34,4);
    slope(10+250+-100,110+50+100,20,20,34,2);
    slope(10+250+-100,130+50+100,20,20,34,3);
    slope(40+200+-100,160+ 0+0,20,20,34,1);
    slope(40+200+-100,180+ 0+0,20,20,34,4);
    slope(10+250+-100,110+50+0,20,20,34,2);
    slope(10+250+-100,130+50+0,20,20,34,3);
    slope(40+200+-100,160+ 0-100,20,20,34,1);
    slope(40+200+-100,180+ 0-100,20,20,34,4);
    slope(10+250+-100,110+50-100,20,20,34,2);
    slope(10+250+-100,130+50-100,20,20,34,3);
    block(290,0,10,100,34);
    block(240,0,10,150,34);
    block(240,150,50,10,34);
    block(290,150,10,100,34);
    block(290,300,10,100,34);
    }
    if(X>=300){
        bphone(560,15,4);
        bphone(560,345,3);
    noStroke();
    slope(500,50,100,10,1,4);
    slope(510,50,90,20,1,4);
    slope(520,50,80,30,1,4);
    slope(530,50,70,50,1,4);
    slope(540,50,60,70,1,4);
    slope(550,50,50,90,1,4);
    slope(560,50,40,120,1,4);
    slope(570,50,30,150,1,4);
    slope(580,50,20,180,1,4);
    slope(590,50,10,120,1,4);
    slope(585,50,5,120,1,4);
    block(340,0,5,100,1);
    block(380,100,5,50,1);
    block(420,100,5,100,1);
    block(460,70,5,50,1);
    block(340,150,5,50,1);
    block(380,200,5,50,1);
    block(420,0,5,50,1);
    block(460,100,5,50,1);
    block(340,250,5,50,1);
    block(380,300,5,50,1);
    block(420,281,5,50,1);
    block(460,236,5,50,1);
    block(460,323,5,50,1);
    block(476,236,5,50,1);
    block(513,134,5,50,1);
    block(540,236,5,50,1);
    block(506,310,5,50,1);
    block(487,64,5,50,1);
    block(300,150,10,144,1);
    block(300,269,10,60,1);
    }
    if(X+30>299&&X<301){
    sy=0;
    bphone(40,220,2);
    bphone(260,20,1);
    noStroke();
    block(60,100,10,251,34);
    slope(10,110+0,20,20,34,2);
    slope(10,130+0,20,20,34,3);
    slope(40,160+0,20,20,34,1);
    slope(40,180+0,20,20,34,4);
    slope(10,110+101,20,20,34,2);
    slope(10,130+101,20,20,34,3);
    slope(40,160+101,20,20,34,1);
    slope(40,180+101,20,20,34,4);
    slope(10+60,110+-10,20,20,34,2);
    slope(10+60,130+-10,20,20,34,3);
    slope(10+60,110+60,20,20,34,2);
    slope(10+60,130+60,20,20,34,3);
    slope(10+60,110+131,20,20,34,2);
    slope(10+60,130+131,20,20,34,3);
    slope(10+60,110+201,20,20,34,2);
    slope(10+60,130+201,20,20,34,3);
    slope(40+200+-100,160+ 0+100,20,20,34,1);
    slope(40+200+-100,180+ 0+100,20,20,34,4);
    slope(10+250+-100,110+50+100,20,20,34,2);
    slope(10+250+-100,130+50+100,20,20,34,3);
    slope(40+200+-100,160+ 0+0,20,20,34,1);
    slope(40+200+-100,180+ 0+0,20,20,34,4);
    slope(10+250+-100,110+50+0,20,20,34,2);
    slope(10+250+-100,130+50+0,20,20,34,3);
    slope(40+200+-100,160+ 0-100,20,20,34,1);
    slope(40+200+-100,180+ 0-100,20,20,34,4);
    slope(10+250+-100,110+50-100,20,20,34,2);
    slope(10+250+-100,130+50-100,20,20,34,3);
    block(240,0,10,150,34);
    block(240,150,60,10,34);
    rect(290,0,10,100);
    rect(290,150,10,100);
    rect(290,300,10,100);
    
    bphone(560,15,4);
    bphone(560,345,3);
    noStroke();
    slope(500,50,100,10,1,4);
    slope(510,50,90,20,1,4);
    slope(520,50,80,30,1,4);
    slope(530,50,70,50,1,4);
    slope(540,50,60,70,1,4);
    slope(550,50,50,90,1,4);
    slope(560,50,40,120,1,4);
    slope(570,50,30,150,1,4);
    slope(580,50,20,180,1,4);
    slope(590,50,10,120,1,4);
    slope(585,50,5,120,1,4);
    block(340,0,5,100,1);
    block(380,100,5,50,1);
    block(420,100,5,100,1);
    block(460,70,5,50,1);
    block(340,150,5,50,1);
    block(380,200,5,50,1);
    block(420,0,5,50,1);
    block(460,100,5,50,1);
    block(340,250,5,50,1);
    block(380,300,5,50,1);
    block(420,281,5,50,1);
    block(460,236,5,50,1);
    block(460,323,5,50,1);
    block(476,236,5,50,1);
    block(513,134,5,50,1);
    block(540,236,5,50,1);
    block(506,310,5,50,1);
    block(487,64,5,50,1);
    }
    }
    
    //World 3
    if(lvl===103){}
    if(lvl===28){
        snow();
        fill(0, 0, 0);
        text("Ice is slippery, also curve jumps are easier on ice",20,50);
        text("Press Z to select dash, then spacebar to use",20,100);
        ice(100,390,400,20);
        ice(10,300,50,10);
        ice(10,220,50,10);
        ice(100,120,10,50);
        ice(150,120,10,50);
        ice(200,120,10,50);
        ice(250,120,10,50);
        ice(300,150,10,50);
        ice(350,150,10,50);
        ice(550,120,10,50);
        phone(550,120);
    }
    if(lvl===29){
        ang=0;
        snow();
        block(50,350,50,50,1);
        block(500,350,90,50,1);
        deathblock(100,380,400,10);
        ice(520,250,70,10);
        ice(120,200,70,10);
        ice(10,150,70,10);
        block(550,100,40,10,1);
        phone(560,40);
    }
    if(lvl===30){
        snow();
        block(255,100,10,400,1);
        block(340,100,10,400,1);
        slope(265,100,40,40,1,2);
        slope(265,100+40,40,40,1,3);
        slope(265,200,40,40,1,2);
        slope(265,200+40,40,40,1,3);
        ice(10,300+40,10,5);
        block(50,205+40,10,50,1);
        block(10,205+40,50,10,1);
        
        ice(10,300-140,10,5);
        block(50,205-140,10,50,1);
        block(10,205-140,50,10,1);
        block(350,340,50,10,1);
        block(550,240,50,10,1);
        block(350,140,50,10,1);
        bphones = 4;
        bphone(10,10,1);
        bphone(300,300,2);
        bphone(400,300,3);
        bphone(10,80,4);
    }
    if(lvl===31){
        snow();
        fill(0, 81, 255);
        rect(200,300,200,100-10);
        fill(0,81,255);
        rect(400,330,10,60,1);
        rect(220,300-20,200-40,100-10);
        block(190,300,10,100,1);
        block(200,280,20,20,1);
        block(220,270,160,10,1);
        block(380,280,20,20,1);
        block(400,300,10,30,1);
        if(snowa>0){
        block(400,330,5,60,1);
        block(0,330,200,10,1);
        }
        if(dist(snowx1,Y,400,350)<20){
            snowa-=1;
        }
        if(snowpush===0){
        mx=230+snowpush;
        my=360;
        }
        mStart = true;
        monster1();
        phone(210,360);
        if(keys[32]){
            snowthrown = true;
            snowx1 = X;
        }
        fill(255, 255, 255);
        ellipse(snowx1,Y+15,10,10);
        ellipse(snowx2,my+15,10,10);
        if(snowthrown){
        if(snowx2<0||snowx2>600){
            snowx2=mx;
            if(mx<X){
                snows2=10;
            }
            if(mx>X){
                snows2=-10;
            }
        }
        }
        if(snowthrown){
        snowx2+=snows2;
        }
        snowx1+=snows1;
        if(X>mx){snows1=-10;}
        if(X<mx){snows1=10;}
        if(dist(snowx1,Y,mx,my)<20){
            mx+=snows1;
            snowx1=1000;
            snowpush+=1;
    }
    if(dist(snowx2,my,X,Y)<10){
            X+=snows2;
            snowx2=1000;
    }
    fill(0, 0, 0);
    text("Spacebar to throw snowball",140,100);
    }
    if(lvl===32){
    snow();
    block(75,52,3,299,1);
    block(113,52,3,299,1);
    block(75,52,35,3,1);
    block(502,247,53,147,1);
    block(539,47,3,123,1);
    block(5,350,10,5,1);
    block(5,300,10,5,1);
    block(5,250,10,5,1);
    block(4,200,10,5,1);
    block(4,150,10,5,1);
    block(4,100,10,5,1);
    block(69,216,10,5,1);
    block(75,348,35,5,1);
    block(430,310,3,5,1);
    block(417,255,3,5,1);
    block(455,255,24,5,1);
    block(156,84,9,5,1);
    block(213,95,9,5,1);
    block(270,67,9,5,1);
    block(343,76,9,5,1);
    block(395,44,162,5,1);
    block(77,207,35,5,1);
    block(490,107,5,5,1);
    block(485,206,5,5,1);
    block(459,158,5,5,1);
    teleporter(73,212,200,200,'none');
    teleporter(571,369,94,70);
    teleporter_bar(116,103,275,3,35,375);
    teleporter_bar(502,112,35,3,35,375);
     bphones=3;
    bphone(89,175,1);
    bphone(515,12,2);
    bphone(515,59,3);
    }
    if(lvl===33){
        if(dist(sx,0,0,0)>2){
        if(movetime>600){
        moved = 2;
        }
        if(movetime<=0){
        moved = 2;
        }
        movetime+=moved;
        }
        
    background(0, 123, 255);
    noStroke();
    block(-10,-10,640,20,1);
block(-10,390,640,20,1);
block(-10,-10,20,420,1);
block(590,-10,20,420,1);
ice(10+movetime,100,10,300,1);
ice(20+movetime,100,30,10);
ice(20+movetime,150,30,10);
ice(20+movetime,200,30,10);
ice(20+movetime,250,30,10);
ice(20+movetime,300,30,10);
ice(20+movetime,350,30,10);
ice(200+movetime,100,30,30);
ice(200+movetime,200,30,30);
ice(200+movetime,300,30,30);
ice(-100+movetime,200,30,30);
ice(-21+movetime,144,30,30);
ice(-21+movetime,344,30,30);
ice(-192+movetime,144,30,30);
ice(-192+movetime,238,30,30);
ice(-192+movetime,342,30,30);
ice(-21+movetime,344,30,30);
ice(-100+movetime,107,30,30);
ice(-100+movetime,200+100,30,30);
ice(-21+movetime,144+100,30,30);
ice(125+movetime,100,10,400);
ice(-125+movetime,100,10,400);
ice(-255+movetime,100,10,400);
ice(-405+movetime,100,10,400);
deathblock(589,10,20,380);
bphones = 4;
bphone(100+movetime,300,1);
bphone(-18+movetime,300,2);
bphone(-173+movetime,300,3);
bphone(-324+movetime,300,4);
    }
    if(lvl===34){
    snow(true);
    ang=0;
    ice(190,340,400,10);
    slope(90,340,50,50,1,1);
    block(140,340,50,50,1);
    slope(190,340,50,50,1,2);
    block(190,350,400,40,1);
    ice(560,130,30,210);
    block(510,100,10,200,1);
    block(410,100,100,10,1);
    block(450,100,10,50,1);
    block(0,300,520,9,1);
    sboost(310,100,100,20,-2);
    sboost(310,100,100,20,-2);
    ice(100,100,210,20);
    sboost(310,280,100,20,2);
    sboost(310,280,100,20,2);
    sboost(310,280,100,20,2);
    sboost(310,280,100,20,2);
    ice(410,280,100,20);
    ice(490,170,20,110);
    phone(480,125);
    }
    if(lvl===35){
    snow(true);
    jblock(75+30,200,30,30,1,4);
    block(75+35,130,25,260,1);
    ice(75+30,230,5,160);
    ice(15,10,5,320);
    jblock(10,260,10,30,1,2);
    block(10,0,5,330,1);
    slope(10,330,10,15,1,3);
    jblock(10,120,10,30,1,2);
    deathblock(112,130,20,10);
    slope(110,130,10,10,1,2);
    slope(125,130,10,10,1,1);
    jump_orb(122,60);
    block(200,0,10,300,1);
    block(400,0,10,300,1);
    block(300,100,10,300,1);
    ice(200,300,30,10,1);
    deathblock(210,305,20,5,1);
    ice(200,300-50,30,10,1);
    deathblock(210,305-50,20,5,1);
    ice(200,300-100,30,10,1);
    deathblock(210,305-100,20,5,1);
    ice(570,200,20,190);
    sboost(520-50,375,50,15,2);
    sboost(520-50,375,50,15,2);
    sboost(520-50,375,50,15,2);
    sboost(520-50,375,50,15,2);
    sboost(520-50,375,50,15,2);
    sboost(520,375,50,15,2);
    sboost(520,375,50,15,2);
    sboost(520,375,50,15,2);
    sboost(520,375,50,15,2);
    sboost(520,375,50,15,2);
    owblock(550,150,50,50,3,3);
    owblock(500,150,50,50,3,3);
    owblock(400,150,50,50,3,3);
    owblock(450,150,50,50,3,3);
    phone(500,50);
    }
    
    //Extra
    if(lvl==='Map'){
        vertical=false;
        noStroke();
        if(maps===1){
    basic(7);
    block(192,190,486,10,7);
    block(101,190,410,10,7);
    block(10,280,440,10,7);
    block(560,300,300,10,7);
    block(10,100,440,10,7);
    level_entrance(200,340,1);
    level_entrance(300,340,2);
    level_entrance(400,340,3);
    level_entrance(500,340,4);
    level_entrance(300,230,5);
    level_entrance(200,230,6);
    level_entrance(100,230,7);
    level_entrance(200,130,8);
    level_entrance(350,130,9);
    level_entrance(350,40,10);
    level_entrance(150,40,'Supreme',1);
    level_entrance(20,40,'Map',2);
    phone(560,50);
        }
        if(maps===2){
    wooden(7);
    block(192,190,486,10,34);
    block(101,190,410,10,34);
    block(10,280,440,10,34);
    block(560,300,300,10,34);
    block(10,100,440,10,34);
    level_entrance(200,340,20);
    level_entrance(300,340,19);
    level_entrance(400,340,18);
    level_entrance(500,340,17);
    level_entrance(300,230,16);
    level_entrance(200,230,15);
    level_entrance(100,230,14);
    level_entrance(200,130,13);
    level_entrance(350,130,12);
    level_entrance(350,40,11);
    level_entrance(200,40,'Shop');
    level_entrance(110,340,'Supreme',2);
    level_entrance(20,330,'Map',3);
    if(dist(30,15,X,Y)<30){
        X+=30;
    }
    level_entrance(20,55,'Map',1);
    phone(560,50);
        }
        if(maps===3){
        snow();
        block(192,190,486,10,1);
    block(101,190,410,10,1);
    block(10,280,440,10,1);
    block(560,300,300,10,1);
    block(10,100,440,10,1);
    level_entrance(200,340,21);
    level_entrance(300,340,22);
    level_entrance(400,340,23);
    level_entrance(500,340,24);
    level_entrance(300,230,25);
    level_entrance(200,230,26);
    level_entrance(100,230,27);
    level_entrance(200,130,28);
    level_entrance(350,130,29);
    level_entrance(350,40,30);
    level_entrance(150,40,'Supreme',1);
    level_entrance(20,40,'Map',4);
    level_entrance(20,344,'Map',2);
    if(dist(30,330,X,Y)<30){
        X+=30;
    }
    phone(560,50);
        }
    }
    if(lvl==='Shop'){
        basic(10);
        fill(36, 0, 0);
        rect(10,10,580,380);
        fill(255, 0, 0);
        text("Supreme Abilities",20,30);
        stroke(255, 0, 0);
        line(10,50,590,50);
        line(10,100,590,100);
        text("Tei",20,30);
        pushMatrix();
        popMatrix();
    }
    /***
     If you want to make a level, put it here!
     It will be on the 30th level slot.
     **/
    if(lvl==="custom"){
    /**How to use blocks:
    If oh noes pops up, make sure there is ; after line of code, and you typed it correctly.
    Also, create this in a spinoff
    **/
    //  Defult: block(x,y,width,height,color);
    //  Phone: phone(x,y);
    //  2-4 phones
    //  bphones = amount;
    //  bphone(x,y,which);
    //  Teleporter:  teleporter(x1,y1,x2,y2                                       );
    
/**Colors!   1=White,2-7 is gray, 8=black, 9-29 is color, 30-35 is browns**/
    basic(7);
    phone(200,318);
    fill(0,0,0);
    text(round(ftime/60),100,200);
    freezetime(60*(6),60*(0),1);
    
    
    
    }
   if(keys[32]&&crown===5||supreme_mode&&KeysRef.held('ArrowDown')){
      px=X-10;
      py=Y+30-heightY;
   
   }
   if(crown===5||supreme_mode&&KeysRef.held('ArrowDown')){
   fill(cor3);
   noStroke();
   block(px,py,50,10,37);
   if(keys[8]){
       px=-100;
   }
   if(KeysRef.held('ArrowDown')&&Y>py-50&&Y<py&&X+30>px&&X<px+50){
       sy+=3;
       py+=sy;
   }
   }
    if(crown===4&&keys[32]||keys[32]&&crown===5){
        fill(0);
        text("Tap to teleport",10,20);
    }
if(crown === 11&&keys[32]||whoknows==="Chargy"||whoknows==="Eligamer123567"){
for(let i = 35;i>1;i--){
        stroke(0,100,255,i);
        if(whoknows==="Chargy"||whoknows==="Eligamer123567"){
        stroke(cor3,i);    
        }
        strokeWeight(i);
        if(whoknows==="Chargy"){
        strokeWeight(i+10);
        }
        line(X+15,Y+15,X+15-sx,Y+15-sy);
        strokeWeight(1);
        stroke(0,0,0);
        noStroke();
}
}
if(!incannon){
    if(crown===4&&keys[32]){
    noFill();
    stroke(0, 0, 0);
    ellipse(X+15,Y+15,150,150);
    noStroke();
    }
    if(flight===false&&whoknows!=="AVG_FARMER"){
    noStroke();
    pushMatrix();
    translate(X+15,Y+15);
    rotate(ang);
    fill(cor2);
    if(whoknows === "Chargy"||whoknows==="Eligamer123567"){
    stroke(cor3);
    if(whoknows === "Eligamer123567"){
    fill(cor3,200);
    }
    }else{
    noStroke();
    }
    arc(0,0,30,30,180,360);
    rect(-15,-1,30,16);
    stroke(0, 0, 0);
    strokeWeight(3);
    if(whoknows!=="Chargy"&&whoknows!=="Eligamer123567"){
    line(-13,0,13,0);
    }
    strokeWeight(1);
    noStroke();
    fill(cor4);
    rect(-7.5,-5,5,10);
    rect(2,-5,5,10);
    fill(cor5);
    if(sx<=0){
    rect(-5+sx*0.5,-4+sy*0.5,3,7.5);
    }else{
    rect(-5,-4+sy*0.5,3,7.5);    
    }
    if(sx>=0){
    rect(2+sx*0.5,-4+sy*0.5,3,7.5);
    }else{
    rect(2,-4+sy*0.5,3,7.5);    
    }
    popMatrix();
    }else if(whoknows!=="AVG_FARMER"){
        for(let i = 35;i>1;i--){
            fill(cor,i);
        noStroke();
        ellipse(X+15,Y+15,i,i);
}
noStroke();
    pushMatrix();
    translate(X+15,Y+15);
    rotate(ang);
    fill(cor4);
    rect(-7.5,-5,5,10);
    rect(2,-5,5,10);
    fill(cor5);
    if(sx<=0){
    rect(-5+sx*0.5,-4+sy*0.5,3,7.5);
    }else{
    rect(-5,-4+sy*0.5,3,7.5);    
    }
    if(sx>=0){
    rect(2+sx*0.5,-4+sy*0.5,3,7.5);
    }else{
    rect(2,-4+sy*0.5,3,7.5);    
    }
    popMatrix();
    }else{
    fill(255,0,0,0);
    stroke(255, 0, 0);
    noStroke();
    fill(0, 0, 0);
    pushMatrix();
    translate(X+15,Y+15);
    if(flight===false){
    if(sx>=0){
    noStroke();
        fill(cor);
    rect(-15,1,28,10);
    rect(-13,3,27,8);
    rect(-5,-8,2,10);
    rect(8,-8,2,10);
    rect(-5,-8,15,2);
    fill(cor2);
    ellipse(-4,11,7.5,7.5);
    ellipse(8,11,7.5,7.5);
    arc(5-3,-1,10,10,180,360);
    rect(0-3,-1,10,2);
    fill(cor4);
    rect(2,-3,2,3);
    fill(cor5);
    rect(3,-2.5,1,1.5);
    fill(255,255,255,50);
    rect(-3,-6,12,7);
    stroke(cor);
    strokeWeight(3);
    line(-5,0,-13,-13);
    strokeWeight(2);
    stroke(102, 102, 102);
    line(-13,-12,-13,-5);
    strokeWeight(1);
    fill(cor2);
    noStroke();
    ellipse(-13,-2,7,7);
    }
    if(sx<0){
    noStroke();
        fill(cor);
    rect(-13,1,28,10);
    rect(-14,3,27,8);
    rect(-9,-8,2,10);
    rect(5,-8,2,10);
    rect(-8,-8,15,2);
    fill(cor2);
    ellipse(-7,11,7.5,7.5);
    ellipse(4,11,7.5,7.5);
    arc(5-6,-1,10,10,180,360);
    rect(0-6,-1,10,2);
    fill(cor4);
    rect(-4,-3,2,3);
    fill(cor5);
    rect(-4,-2.5,1,1.5);
    fill(255,255,255,50);
    rect(-7,-6,12,7);
    stroke(cor);
    strokeWeight(3);
    line(7,0,14,-13);
    strokeWeight(2);
    stroke(102, 102, 102);
    line(14,-12,14,-5);
    strokeWeight(1);
    fill(cor2);
    noStroke();
    ellipse(14,-2,7,7);
    }
    }
    else{
    if(tttime>14){
    tttime=-15;
    }
    if(tttime>12&&sy<-1){
    tttime=-15;
    }
    if(onblock===false){
    tttime+=5;
    }
    if(sy>1){
    tttime-=4;
    }
    if(sy<-1){
    tttime+=2;
    }
    stroke(cor5);
    strokeWeight(3);
    line(-tttime,-15,tttime,-15);
    line(0,-15,0,-5);
    line(-5,15,10,15);
    if(sx>=0){
    line(-15,-tttime/3,-15,tttime/3);
    line(-15,0,-12,0);
    }
    if(sx<0){
    line(15,-tttime/3,15,tttime/3);
    line(15,0,12,0);
    }
    strokeWeight(1);
    noStroke();
    if(sx>=0){
    fill(cor);
    arc(1,2,22,20,0,180);
    arc(-2,2,15,15,0,270);
    fill(cor2);
    arc(5-1,-1,10,10,180,360);
    rect(0-1,-1,10,3);
    fill(cor4);
    rect(4,-3,2,3);
    fill(cor5);
    rect(5,-2.5,1,1.5);
    }
    if(sx<0){
        fill(cor);
    arc(1,2,22,20,0,180);
    arc(4,2,15,15,270,360);
        fill(cor2);
    arc(5-8,-1,10,10,180,360);
    rect(0-8,-1,10,3); 
    fill(cor4);
    rect(-5,-3,2,3);
    fill(cor5);
    rect(-5,-2.5,1,1.5);
    }
    }
    popMatrix();
    }
}
if(KeysRef.held('ArrowDown')&&supreme_mode===true&&flight===false){
    noStroke();
    fill(0, 200, 255);
    rect(X-5,Y+30,40,3);
    stroke(0,0,0);
}
if(keys[32]&&crown===2&&flight===false){
    sy=0;
}
if(keys[32]&&crown===3){
    jump=false;
    jt=3;
}

    if(vertical===true){
        if(heightY<topb*-1-10){
        if(Y<50){
            Y+=5;
            heightY+=10;
        }
        }
        if(heightY>0){
            if(Y>350){
                Y-=5;
                heightY-=10;
            }
        }
    }
    if(keys[32]&&supreme_mode===false&&crown===1){
        frameRate(500);
        using_ability=true;
    }else{frameRate(60); using_ability=false;if(crown===2){frameRate(frames);}}
    if(sppppeeed3===true){
    fill(255, 0, 0);
    text(round(sppppeeed),465,19);
    if(sppppeeed2>60){
    sppppeeed += 1;
    if(keys[32]){
        sppppeeed+=-0.8;
    }
    sppppeeed2 = 0;
    sppppeeed5 = sppppeeed;
    }
    sppppeeed2 += 1;
    }
    if(sppppeeed4===true&&sppppeeed5!==0){
        fill(0, 0, 0);
    text("Final time: "+round(sppppeeed5)+" Seconds",40,19);    
    }
    if(keys[32]&&supreme_mode===true){
        teleporting=true;
    }
    if(teleporting===true){
        fill(0,0,0,100);
        rect(0,0,600,400);
        fill(0, 200, 255);
        ellipse(mouseX,mouseY,10,10);
        sy=0;
        sx=0;
        fill(255, 255, 255);
        text("Tap to teleport",40,40);
        if(MouseRef.held('left')){
            X=mouseX-15;
            Y=mouseY-15;
            teleporting=false;
        }
    }
    if(devmode){
        fill(255, 0, 0);
        text(round(mouseX)+','+round(mouseY-heightY),50,100);
    }
    if(keys[49]){
        swichlvl('World',1);
        crown=0;
    }
    if(keys[50]){
        swichlvl('World',2);
        crown=0;
    }
    if(keys[51]){
        swichlvl('World',3);
        crown=0;
    }
    if(swiching===true){
    if(animation_time <= 0){
            animation_time = 255;
        }
        
        animation_time-=5;
        fill(0,0,0,animation_time*1);
        if(died){
        fill(255,0,0,animation_time*1);
        }
        if(map_swich === 1){
        fill(0,50,100,animation_time);
        }
            noStroke();
        rect(0,0,600,400);
        rect(0,animation_time*2,600,400);
        rect(0,animation_time*-2,600,400);
        rect(animation_time*2,0,600,400);
        rect(animation_time*-2,0,600,400);
        
        sy=0;
        if(animation_time===5){
            died=false;
            map_swich=0;
            swiching = false;
        }
    }
    if(settings_open===1){
        fill(64, 64, 64);
        rect(50,25,500,350);
        if(whoknows === "AVG_FARMER"){
            fill(0, 0, 0);
            text("Low  Med Hi",158,168);
            fill(0, 113, 138);
            ellipse(175,185,25,25);
            fill(0, 0, 0);
            ellipse(225,185,25,25);
            fill(138, 0, 0);
            ellipse(275,185,25,25);
            if(dist(mouseX,mouseY,175,185)<25){
                gear = 'low';
            }
            if(dist(mouseX,mouseY,225,185)<25){
                gear = 'med';
            }
            if(dist(mouseX,mouseY,275,185)<25){
                gear = 'high';
            }
        }
        fill(255, 255, 255);
        text("Effects are "+effects+".",58,46);
        fill(82, 82, 82);
        rect(100,100,150,50);
        rect(350,100,150,50);
        rect(100,200,150,50);
        rect(350,40,150,50);
        if(mouseX>350&&mouseX<350+150&&mouseY>40&&mouseY<40+50&&MouseRef.held('left')){
            swichlvl('enter',-3);
        }
        if(mouseX>100&&mouseX<100+150&&mouseY>200&&mouseY<200+50&&MouseRef.held('left')){
    saves[0] =levels_complete;
    saves[1] = supreme_levels_complete;
    saves[2]=crown;
    saves[3]=cx;
    saves[4]=deaths;
    saves[5]=t_complete;
    saves[6]=round(X);
    saves[7]=round(Y);
    saves[8]=heightY;
    saves[9]=lvl;
    saves[10]=flight;
    saves[11]=keyscollected;
    saves[12]=battery; 
            fill(0, 0, 0);
            text("Save code: "+saves,60,255,500,200);
            fill(82, 82, 82);
            println("save code: "+saves);
        }
        rect(350,200,150,50);
        if(mouseX>350&&mouseX<350+150&&mouseY>200&&mouseY<200+50&&MouseRef.held('left')){
    levels_complete = saves[0];
    supreme_levels_complete = saves[1];
    crown = saves[2];
    cx = saves[3];
    deaths = saves[4];
    t_complete = saves[5];
    X=saves[6];
    Y=saves[7];
    heightY=saves[8];
    lvl=saves[9];
    flight=saves[10];
    keyscollected=saves[11];
    battery=saves[12];  
        }
        rect(100,300,150,50);
        if(mouseX>100&&mouseX<100+150&&mouseY>300&&mouseY<300+50&&MouseRef.held('left')){
        if(t_complete===true||devmode===true){
        swichlvl('exit');
    }else{swichlvl('enter',0);}
        }
        if(mouseX>350&&mouseX<350+150&&mouseY>300&&mouseY<300+50&&MouseRef.held('left')){
    settings_open=0;
}  
if(mouseX>350&&mouseX<350+150&&mouseY>100&&mouseY<100+50&&MouseRef.held('left')){
swichlvl('enter',"custom");
devmode=true;
}
if(mouseX>100&&mouseX<100+150&&mouseY>100&&mouseY<100+50&&MouseRef.held('left')){
swichlvl('enter',-2);
} 
        rect(350,300,150,50);
        fill(0, 0, 0);
        text("Settings",90,70);
        text("How to play",110,130);
        text("Exit Level",115,330);
        text("Back to game",354,330);
        text("Creater",384,130);
        text("Colors",390,73);
        text("Load save",374,230);
        text("Save code",120,230);
    }
    pushMatrix();
    noStroke();
    translate(580,20);
    if(gear==='low'){
    fill(0, 48, 74);
    }
    if(gear==='med'){
    fill(31, 31, 31);
    }
    if(gear==='high'){
    fill(69, 0, 0);
    }
    ellipse(0,0,20,20);
    rect(4,-5,10,10);
    rotate(60);
    rect(4,-5,10,10);
    rotate(60);
    rect(4,-5,10,10);
    rotate(60);
    rect(4,-5,10,10);
    rotate(60);
    rect(4,-5,10,10);
    rotate(60);
    rect(4,-5,10,10);
    rotate(60);
    rect(4,-5,10,10);
    fill(255, 255, 255);
    ellipse(0,0,10,10);
    stroke(0, 0, 0);
    popMatrix();
    if(crown===2){
        fill(0,255,0,100);
        text("Faster",2,18);
        text("Faster",2,18);
        text("Faster",2,18);
        rect(0,0,75,25);
        fill(255, 0, 0,100);
        text("Slower",2,45);
        text("Slower",2,45);
        text("Slower",2,45);
        rect(0,25,75,25);
        fill(0, 0, 0);
        text("Speed:"+frames,80,20);
    }
    if(codee===0&&keys[49]){
        codee=1;
    }
    if(codee===1&&keys[50]){
        codee=2;
    }
    if(codee===2&&keys[51]){
        codee=3;
    }
    if(codee===3&&keys[50]){
        codee=4;
    }
    if(codee===4&&keys[51]){
        codee=5;
    }
    if(codee===5&&keys[50]){
        codee=6;
    }
    if(codee===6&&keys[49]){
        codee='done';
    }
    if(gear==='low'){
        sx*=0.9;
    }
    if(gear==='high'){
        sx*=1/0.9;
    }
    if(whoknows==="AVG_FARMER"){
        cursor("NONE");
        strokeWeight(6);
        stroke(cor3);
        line(mouseX+5,mouseY+5,mouseX+15,mouseY+15);
        strokeWeight(4);
        line(mouseX+-1,mouseY+5,mouseX+2,mouseY+8);
        line(mouseX+5,mouseY+-1,mouseX+9,mouseY+3);
        strokeWeight(1);
        stroke(0, 0, 0);
    }
    if(whoknows==="Eligamer123567"){
    Creater_power();
    }
};
/***

***/





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
