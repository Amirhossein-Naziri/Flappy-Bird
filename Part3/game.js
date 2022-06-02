
var cvs = document.getElementById("mycanvas");
var canvas = cvs.getContext("2d");

var myImg = new Image();
myImg.src = "img/sprite.png"

var frame = 0;


var background = {
    sX:0,
    sY:0,
    w:275,
    h:226,
    x:0,
    y:cvs.height - 226,
    draw: function(){
        canvas.drawImage(myImg,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        canvas.drawImage(myImg,this.sX,this.sY,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
    }
}

var forground = {
    sX:276,
    sY:0,
    w:224,
    h:112,
    x:0,
    y:cvs.height -112,
    draw: function(){
        canvas.drawImage(myImg,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        canvas.drawImage(myImg,this.sX,this.sY,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
    }
}

var bird = {
    myanimation:[
        {sX:276 , sY:112},
        {sX:276 , sY:139},
        {sX:276 , sY:164},
        {sX:276 , sY:139}
    ],
    w:34,
    h:26,
    x:50,
    y:150,
    birdFrame:0,
    draw: function(num){

        let mybird = this.myanimation[this.birdFrame]
        canvas.drawImage(myImg,mybird.sX,mybird.sY,this.w,this.h,this.x - this.w/2,this.y - this.h/2,this.w,this.h);
    }
}


function update(){
    //bird.draw(0);
    for(let i=0;i<3;i++){
        bird.draw(i);
        console.log("hi")
    }

};

function draw(){
    canvas.fillStyle = "#70c5ce"
    canvas.fillRect(0,0,cvs.width , cvs.height);
    background.draw();
    forground.draw();
    update()
};

function animation(){
    update();
    draw();
    frame ++;
    requestAnimationFrame(animation);
}

animation()

