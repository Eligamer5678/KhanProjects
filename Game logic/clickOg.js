
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
    text(mouseX+" "+mouseY,200,350);
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
if(mouseIsPressed && mouseY > box1+100 && mouseY < box1+150 && click > a1 && lock1b === 1){
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
if(mouseIsPressed && mouseY > 150 && mouseY < 200 && click > a2 && lock2b === 1){
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

if(mouseIsPressed && mouseY > 250 && mouseY < 300 && superclick > a3 && lock4b === 1){
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
if(mouseIsPressed && mouseY > 200 && mouseY < 250 && superclick>a5 && lock3b === 1){
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



if(mouseIsPressed && holdclick>0){
click+=clicky*holdclick;
}

};


var multip = function(){
    fill(126, 255, 112);
    rect(0,300,399,50);
    fill(0, 0, 0);
    text("Multiplier",155,331);
    
    if(mouseIsPressed && mouseY>300 && mouseY<350 && superclick>9999){
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

if(mouseIsPressed && click > a4 && mouseY > 349 && a6  <1){
    p();
}else if(mouseIsPressed && click > a4 && mouseY > 349 && a6 > 10){
    p();
}else if(mouseIsPressed && click > a4 && mouseY > 349 && a6>4&&a6<100){
    p();
}else if(mouseIsPressed && click > a4 && mouseY > 349 && a6 === 100){
    p();
}else if(mouseIsPressed && click > a4 && mouseY > 349 && a6 === 250){
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
var f = createFont("Arial Bold Italic");
textFont(f);
text("Click!",88,78);
textSize(20);
text("An Idle Game by Eligamer567",57,115);
//play button
var f = createFont("Arial Bold");
textFont(f);
fill(0, 196, 255);
rect(150,150,100,50,10);
fill(0, 0, 0);
textSize(41);
text("Play!",153,190);
if(mouseIsPressed&&tittle === 0&&mouseX>150&&mouseX<250&&mouseY>150&&mouseY<200){
tittle = 1;
}
//how to play button
fill(255, 0, 0);
rect(25,250,100,50,10);
fill(0, 0, 0);
textSize(15);
text("How to play",33,277);
if(mouseIsPressed&&tittle === 0&&mouseX>25&&mouseX<125&&mouseY>250&&mouseY<300){
tittle = 2;
click+=clicky*10*pb*multi;
}
//Leader Board
fill(0, 219, 11);
rect(150,250,100,50,10);
fill(0, 0, 0);
textSize(15);
text("News",176,276);
if(mouseIsPressed&&tittle === 0&&mouseX>150&&mouseX<250&&mouseY>250&&mouseY<300){
tittle = 3;
}
//News
fill(255, 242, 0);
rect(275,250,100,50,10);
fill(0, 0, 0);
textSize(15);
text("Leader Board",278,279);
if(mouseIsPressed&&tittle === 0&&mouseX>275&&mouseX<375&&mouseY>250&&mouseY<300){
tittle = 4;
}
if(keyIsPressed&&tittle===0&&keyCode === LEFT){
tittle = 2;
}
if(keyIsPressed&&tittle===0&&keyCode === DOWN){
 tittle = 3;       
}    
if(keyIsPressed&&tittle===0&&keyCode === RIGHT){
    tittle = 4;
}
if(keyIsPressed&&tittle===0&&keyCode === SHIFT){
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
if(mouseIsPressed&&tittle === 2&&mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
tittle = 0;
}
if(keyIsPressed&&tittle===2&&keyCode === UP){
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
if(mouseIsPressed&&tittle === 3&&mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
tittle = 0;
}
if(keyIsPressed&&tittle===3&&keyCode === UP){
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
if(mouseIsPressed&&tittle === 4&&mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
tittle = 0;
}
if(keyIsPressed&&tittle===4&&keyCode === UP){
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
if(mouseIsPressed&&tittle===1&&mouseX>325&&mouseX<375&&mouseY>20&&mouseY<45){
tittle = 0;
}
if(keyIsPressed&&tittle===1&&keyCode === SHIFT){
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

    };
}
