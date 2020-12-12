class Food{
    constructor(){
        this.foodStock=0
        this.lastFed;
    }

    dogImg = loadImage('images/dogImg.png');
    milkImg=loadImage('images/Milk.png');

    getFoodStock(){
        database.ref('Food').on('value',function(data){
            this.foodStock=data.val();
        });
     }
     updateFoodStock(count){
        database.ref('/').update({
            Food:count
        })
     }
     

     display(){
         var x=80,y=100;
         imageMode (CENTER);
         image(this.image,720,220,70,70);
         
         if(this.foodStock!=0){
             for(var i=0;i<this.foodStock;i++){
                 if(i%10==0){
                     x=80;
                     y=y+50
                 }
                 image(this.image,x,y,50,50);
                 x=x+50;
             }
         }

     }

   
}
