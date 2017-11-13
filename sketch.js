var myData;
var astronauts = [];
var maxRadius=0;
var fondo;
var tot=0;
var moneta;
var ronzio;
var porta;

function preload(){
  myData = loadJSON("./assets/peopleinspace.json");
  moneta = loadSound("./assets/moneta.mp3");
  ronzio = loadSound("./assets/ronzio.mp3");
  porta = loadSound("./assets/serranda.mp3");
}

function setup() {
  createCanvas(500,500);
  console.log(myData.number);
  
  var people=myData.people;
  
  for(var i = 0; i<6; i++){
    var myAstronaut = people[i];
    //console.log(myAstronaut.name);
    var newAstronaut = new astronaut(i+1,height/2,myAstronaut.name,myAstronaut.launchdate);
    astronauts.push(newAstronaut);
  }
  fondo=new serranda();
  for(var i = 0; i<6; i++){
    tot=parseInt(astronauts[i].daysInSpace)+tot;
  }
  console.log(tot);
}
  
function draw() {
  var fine=true;
  if(ronzio.isPlaying()==false)
    ronzio.loop();
  background(255,255,255);
  //var people=myData.people;
  fill(0,0,50);
  rect(width/10,0,width-(2*width/10),height-height/10);
  textFont('Space Mono');
  textAlign(CENTER,CENTER);
  textSize(height/18);
  fill(250,217,31);
  text("They spent a total of",width/5,0,width-(2*width/5),height/5);
  textSize(height-2*height/3);
  
  text(parseInt(tot),width/5,height/3,width-(width/5),height-height/3);
  textSize(height/15);
  text("days in space.",width/5,height-height/3,width-(2*width/5),height/5);
  fill(200,200,200);
  stroke(0,0,0);
  quad(0,0,width/10,0,width/10,height,0,height);
  quad(width-width/10,0,width,0,width,height,width-width/10,height);
  fill(180,180,180);
  quad(width/10,height-height/10,width-width/10,height-height/10,width,height,0,height);
  
  fondo.display();
  fill(0,0,0);
  quad(width-width/17,((height/2)-(this.maxRadius)),width-width/23,((height/2)-(this.maxRadius)),width-width/23,((height/2)+(this.maxRadius)),width-width/17,((height/2)+(this.maxRadius)));
  
  for(var i = 0; i<6; i++){
    astronauts[i].display();
    astronauts[i].fluttua();
    astronauts[i].click();
  }
  
  fill(200,200,200);
  quad(width-width/23,0,width,0,width,height-height/10,width-width/23,height-height/10);
  
  if(mouseIsPressed){
      if(mouseY>height-height/10){
        for(var i = 0; i<6; i++){
          astronauts[i].restart();
        }
        fondo.restart();
      }
  }
  for(var i = 0; i<6; i++){
    if(astronauts[i].dentro==true)
      fine=false;
  }
  if(fine==true){
    fondo.move();
  }
}

function astronaut(x,y,name,date){
  this.dentro=true;
  this.firsty=y;
  this.sel=0;
  
  this.ny=y;
  this.name=name;
  this.launchDate=date;
  var init=0;
  this.acc=random(-0.25,0.25);
  this.accY=0;
  
  this.aux=0;
  
  this.daysInSpace = (Date.now() - Date.parse(this.launchDate))/(1000*60*60*24);
  
  this.radius=map(this.daysInSpace,0,200,0,width/5);
  if(this.radius>maxRadius){
    maxRadius=this.radius;
  }
  this.firstX=map(x*150,150,6*150,width/20+this.radius,width-(width/20)-this.radius);
  this.offset=random(0,this.radius/100);
  
  this.x=map(x*150,150,6*150,width/20+this.radius,width-(width/20)-this.radius);
  
  
  //this.x=random(windowWidth/4,windowWidth-windowWidth/4);
  //this.y=random(windowHeight/4,windowHeight-windowHeight/4);
  
  this.display=function(){
    fill(250,217,31);
    strokeWeight(0);
    
    ellipse(this.x,this.ny,this.radius*2);
    this.init==1;
    
    fill(0);
    strokeWeight(0);
    textAlign(CENTER,CENTER);
    textSize(this.radius/1.5);
    //console.log(this.name);
    //noFill();
    strokeWeight(0);
    //rect(this.x-this.radius ,this.ny-this.radius, this.radius*2, this.radius*2);
    text(parseInt(this.daysInSpace).toString(), this.x-this.radius/1.2 ,this.ny-this.radius/1, this.radius*2, this.radius*2);
    textSize(this.radius/4);
    text("Days", this.x-this.radius ,this.ny-this.radius, this.radius*2, this.radius);
  }
  
  this.fluttua=function(){
    if(this.ny>=this.firsty+this.offset+this.radius || this.ny<=0+this.radius){
      this.acc=-this.acc;
    }
    if(this.ny<=this.firsty-this.offset-this.radius || this.ny>=height-this.radius-height/20){
      this.acc=-this.acc;
    }
    this.ny=this.ny+this.acc;
    this.x=this.x+this.accY;
    
    for(var i = 0; i<6; i++){
      if(dist(this.x,this.ny,astronauts[i].x,astronauts[i].ny)<=this.radius+astronauts[i].radius && dist(this.x,this.ny,astronauts[i].x,astronauts[i].ny)!=0){
        this.acc=-astronauts[i].acc;
      }
    }
  }
  
  this.click=function(){
    if(mouseIsPressed){
      if(dist(this.x,this.ny,mouseX,mouseY)<this.radius && mouseY<height-height/20-this.radius && mouseX>0+width/20+this.radius && mouseY>0+this.radius ){
        this.aux=0;
        for(var i = 0; i<6; i++){
          if(astronauts[i].sel==1){
            aux=1;
          }
        }
        if(this.aux==0){
          this.sel=1;
          if(mouseX+this.radius>width-width/20 && (mouseY-this.radius<((height/2)-maxRadius-height/100)  || mouseY+this.radius>((height/2)+(maxRadius)+height/100))){
          }else{
            this.x=mouseX;
            this.firsty=mouseY;
            this.ny=this.firsty;
            if(mouseX>width-width/20){
              this.acc=0;
              this.accY=1;
              this.dentro=false;
              if(moneta.isPlaying()==false)
                moneta.play();
            }
          }
        }
      }
      this.aux=0;
      
    }
    this.sel=0;
  }
  this.restart=function(){
    this.dentro=true;
    this.ny=this.firsty;
    this.acc=random(-0.25,0.25);
    this.accY=0;
    this.x=this.firstX;
  }
}

function serranda(){
  this.acc=0;
  this.y=0;
  this.display=function(){
    if(this.y+height-height/10>height/25){
      this.y+=this.acc;
    }else{
      porta.stop();
    }
    rect(width/10,this.y,width-(2*width/10),height-height/10);
  }
  this.move=function(){
    console.log("move");
    this.acc=-2;
    if(porta.isPlaying()==false){
      porta.setVolume(0.25);
      porta.play();
    }
  }
  this.restart=function(){
    this.acc=0;
    this.y=0;
  }
}


function windowResized(){
   //resizeCanvas(windowWidth,windowHeight);
}