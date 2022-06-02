//                                         piyade sazi jajebe roye parande

var cvs = document.getElementById("mycanvas");
var canvas = cvs.getContext("2d");

var myImg = new Image();
myImg.src = "img/sprite.png"

var angle = Math.PI / 180
var frame = 0;

var state = {
    current: 0,
    getReady : 0,
    game : 1,
    over: 2
};

function clickHandler(){
    switch(state.current){
        case state.getReady:
            state.current = state.game
            break;
        case state.game:
            bird.flap();
            break;
        default:
            state.current = state.getReady;
            this.cvs_rotation = 0;
            this.speed = 0;
            break
    }
}

document.addEventListener("click" , clickHandler);
document.addEventListener("keydown" , function(e){

    if(e.which = 32){
        clickHandler()
    }
})

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

var getReady = {
    sX:0,
    sY:228,
    w:173,
    h:153,
    x:cvs.width/2 - 173/2,
    y:100,
    draw: function(){
        if(state.current == state.getReady){
            canvas.drawImage(myImg,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        }
    }
}

var gameover = {
    sX:175,
    sY:228,
    w:225,
    h:202,
    x:cvs.width/2 - 215/2,
    y:90,
    draw: function(){
        if(state.current == state.over){
            canvas.drawImage(myImg,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        }
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
    speed:0,
    gravity:0.3,
    jump:4.7,
    cvs_rotation:0,
    birdFrame:0,
    draw : function(){
        let mybird = this.myanimation[this.birdFrame]
        // bayad tori piyade sazi konim ke vaghti parande dar hale piani amadan ya soghot kardan ast sare jahate sare parande taghir konad.
        // baraye in kar bayad dar hale bala raftan ya pain amadan zaviye canvas man ra dar ha drame taghir dahim.
        // baraye inke sare parande ra taghir dahim bayad marakaze(chakhesh) canvas ra markazr parande gharar dihim.
        canvas.save()
        canvas.translate(this.x , this.y);
        canvas.rotate(this.cvs_rotation);
        canvas.drawImage(myImg,mybird.sX,mybird.sY,this.w,this.h,- this.w/2,- this.h/2,this.w,this.h);
        canvas.restore();
    },
    update : function(){
        let period = state.current == state.getReady ? 12 : 7
        this.birdFrame += frame % period == 0 ? 1 : 0;
        this.birdFrame = this.birdFrame % this.myanimation.length;
        if(state.current == state.getReady){
            this.y = 150;
        }else{
            this.speed += this.gravity;
            this.y += this.speed
            if(this.speed < this.jump){
                this.cvs_rotation =   -angle * 30 ;
            }else{
                this.cvs_rotation = angle * 45;
            }
        }
        // tori piyade sazi mikonim ke vaghti parande be zamin(forgroun) resid motavaghef shavad va ma game over shavim.
        if(this.y + this.h/2 >= cvs.height - forground.h){
            this.y = cvs.height - forground.h - this.h/2;
            this.birdFrame = 1;
            if(state.current == state.game){
                state.current = state.over; 
                this.speed = 0;
            }
        }
    },
    // dar in function bala paridane parande ra shabih sazi mikonim.
    flap: function(){
        this.speed = -this.jump;
    }
}

function update(){
    bird.update()

};

function draw(){
    canvas.fillStyle = "#70c5ce"
    canvas.fillRect(0,0,cvs.width , cvs.height);
    background.draw();
    forground.draw();
    bird.draw();
    getReady.draw();
    gameover.draw()
    
};

function animation(){
    update();
    draw();
    frame ++;
    requestAnimationFrame(animation);
};
animation();

