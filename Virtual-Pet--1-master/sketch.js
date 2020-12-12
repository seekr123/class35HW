var dog,dogIMG,happydogIMG,milk,milkImg;
var database,foodS,foodStock;
var btnFeed,btnAddFeed,addFeed,foodObj;
var fedTime,lastFed;

function preload()
{
  dogIMG=loadImage('images/dogImg.png');
  happydogIMG=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250, 250, 10,10);
  dog.addImage(dogIMG);
  dog.scale=0.2;

  foodObj=new Food()
  
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on('value',readStock);

  btnFeed=createButton('Feed the Dog');
  btnFeed.mousePressed(feedDog);
  btnFeed.position(600,100);

  btnAddFeed=createButton('Add feed');
  btnAddFeed.mousePressed(addFood);
  btnAddFeed.position(800,100);



}


function draw() {  

  background(46, 139, 87);
  
  
  database.ref('fedTime').on('value',data=>{
    lastFed=data.val();
  })

 

  if (lastFed>=12){
    text('last Feed: '+lastFed % 12 +' PM',350,30);
  }
  else if(lastFed==0){
    text('last Feed: 12 AM ', 350,30);
  }
  else{
    text('last Feed: '+ lastFed+'AM',350,30);
  }
  //add styles here
  foodObj.display();

  drawSprites();
  
  fill (138,46,98);
  stroke (4);
  text ('food left : '+foodS,100,200)
  textSize (14);
  text('Tip: press the up arrow to feed Rex',20,30)

  



}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  }

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').set({
    Food:x
  })
  
}
function addFood(){

  if(foodS<30){

    database.ref('/').update({
      'Food':foodS+1
    })

  }

  
}
function feedDog(){
  var foodDed=foodS-1;  
  dog.addImage(happydogIMG)
  database.ref('/').update({
    Food:foodDed,
    fedTime: hour()
  })
}