

var cvs = document.getElementById("mycanvas");
var canvas = cvs.getContext("2d");

var myImg = new Image();
myImg.src = "img/sprite.png"

var frame = 0;

var state = {
    current: 0,
    getReady : 0,
    game : 1,
    over: 2
}

// in function ra baraye taghire state(halat haye mokhtalefe bazi) ha yarif mikonim.
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
            break
    }
}

document.addEventListener("click" , clickHandler);
// baraye kilide space ham mesle bala event moshabeh ra piyade mikonim.
document.addEventListener("keydown" , function(e){
    // adade 32 marbot be kilid "space" ast.
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
    birdFrame:0,
    draw : function(){
        let mybird = this.myanimation[this.birdFrame]
        canvas.drawImage(myImg,mybird.sX,mybird.sY,this.w,this.h,this.x - this.w/2,this.y - this.h/2,this.w,this.h);
    },
    // baraye tabdil parande be animation va piyade sazi bal zadane on az methode zir estefade konim.
    update : function(){
        let period = state.current == state.getReady ? 12 : 7
        // mikhahim dar har 5 frame yek bar animation ma taghir konad.
        // piyade sazi zir yani aghar hasele taghisme "frame" bar 5 barbar ba 0 bod 1 vahed ezafe konad va aghar barabar ba 0 nabod 0 vahed ezafe konad. 
        this.birdFrame += frame % period == 0 ? 1 : 0;
        // baraye inke animation ma az index 4 obor nakonad az bayad har bar be chahar resid on ra sef konim.
        this.birdFrame = this.birdFrame % this.myanimation.length;
    },
    flap: function(){

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
}

animation()

