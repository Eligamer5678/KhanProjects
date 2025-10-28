var money = 0;
var mons = round(money);
var sides = 6;
var amount = random(1,6);
var amoun = round(amount);
var dice = function(){
rect(150,200,100,100,20);
fill(107, 107, 107);
rect(160,265,80,25,10);
fill(0, 0, 0);
textSize(30);
text(amoun,162,289);
fill(107, 107, 107);
rect(160,207,80,25,10);
fill(0, 0, 0);
text(sides,162,231);
};
var doubleroll = 1;
var roll = function(){
    fill(255, 255, 255);
    rect(125,311,150,75,50);
    fill(0, 0, 0);
    textSize(50);
    text("Roll!",150,362);
    mouseClicked = function(){
        if(mouseY>311 && mouseY<384 && mouseX>125 && mouseX<276){
    amount = random(1,sides);
    amoun = round(amount);
    money+=amoun;
        }
        if(mouseY>311 && mouseY<384 && mouseX>125 && mouseX<276&&sides>24){
    amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*4;
        }
    };
};
var price1 = 1000;
var price2 = 100;
var price3 = sides*2;
var a = 255;
var a2 = 0;
var b = 255;
var b2 = 0;
var c = 255;
var c2 = 0;

var Upgradedice = function(){
    fill(a,a2,0);
    rect(10,100,80,40,20);
    fill(255, 255, 255);
    textSize(15);
    text("Add 1 Side",14,123);
     fill(b, b2, 0);
    rect(160,100,80,40,20);
    fill(255, 255, 255);
    textSize(15);
    text("Add 10%",170,123);
     fill(c, c2, 0);
    rect(310,100,80,40,20);
    fill(255, 255, 255);
    textSize(14);
    text("Double Roll",314,123);
    fill(255, 255, 255);
    if(money>price1){
    a = 0;
    a2 = 255;
    }else{
    a = 255;
    a2 = 0;
    }
    if(money>price2){
    b = 0;
    b2 = 255;
    
    }else{
    b = 255;
    b2 = 0;
    }
    if(money>price3){
    c = 0;
    c2 = 255;
    }else{
    c = 255;
    c2 =0;
    
    }
    
};
var dice2 = function(){
    rect(10,200,100,100,20);
fill(107, 107, 107);
rect(20,265,80,25,10);
fill(0, 0, 0);
textSize(30);
text(amoun,24,289);
fill(107, 107, 107);
rect(20,207,80,25,10);
fill(0, 0, 0);
text(sides,22,231);
};
var dice3 = function(){
    fill(255, 255, 255);
    rect(290,200,100,100,20);
fill(107, 107, 107);
rect(300,265,80,25,10);
fill(0, 0, 0);
textSize(30);
text(amoun,304,289);
fill(107, 107, 107);
rect(300,207,80,25,10);
fill(0, 0, 0);
text(sides,302,231);
};
var abc = 13;
draw = function() {
   
    background(0, 0, 0);
    fill(255, 255, 255);
    dice();
    roll();
    Upgradedice();
    fill(255, 255, 255);
    textSize(50);
    mons = round(money);
    text("$"+mons,0,50);
   
 keyReleased = function(){
     if(money>price1 && key.toString() === '1'){
     sides+=1;
     money-=price1;
     price1*=1.2;
     
     }
     if(money>price2 && key.toString() === '2'){
     money+=money/10;
     money-=price2;
     price2*=1.2;
     }
     if(money>price3 && key.toString() === '3' && sides<50){
     money+=sides*2;
     money-=price3;
     price3*=1.2;
     }else if(money>price3 && key.toString() === '3'){
         money*=1.2;
     money-=price3;
     price3*=1.2;
     }
     if(key.toString() === 'r'){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun;
     }if(key.toString() === 'r'&&sides>24){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*4;
     }
     if(key.toString() === 'r'&&sides>49){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*10;
     }
     if(key.toString() === 'o'){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun;
     }if(key.toString() === 'o'&&sides>24){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*4;
     }
     if(key.toString() === 'o'&&sides>49){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*10;
     }
     if(key.toString() === 'l'){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun;
     }if(key.toString() === 'l'&&sides>24){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*4;
     }
     if(key.toString() === 'l'&&sides>49){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*10;
     }
     if(key.toString() === '!'){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*5;
     }if(key.toString() === '!'&&sides>24){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*15;
     }
     if(key.toString() === '!'&&sides>49){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*50;
     }
      if(key.toString() === '!'&&sides>99){
       amount = random(1,sides);
    amoun = round(amount);
    money+=amoun*amoun*amoun*amoun*amoun*amoun*amoun*amoun*amoun*amoun+money/2*amoun;
     }
     if(sides === 15){
         money*=10;
         sides+=1;
     }
      if(sides === 30){
         money*=10;
         sides+=5;
     }
      if(sides === 45){
         money*=10;
         sides+=10;
     }
      if(sides === 100){
         money*=10;
         sides+=20;
     }
 };
  if(sides>24){
     dice2();
     }
     if(sides>49){
     dice3();
     }
     if(amoun<25 && sides>49){
         amoun = 25;
     }
     if(sides === 1000){
     background(255, 221, 0);
     textSize(75);
     text("You win!",55,70);
     textSize(20);
     text("Click to go back",130,384);
     text(mons,abc,133);
     if(keyCode === RIGHT && keyIsPressed){
     abc-=5;
     }
     if(keyCode === LEFT && keyIsPressed){
     abc+=5;
     
     }
     
     if(mouseIsPressed){
     sides+=1;
     
     }
     }
};