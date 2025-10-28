 
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

};
