//                          piyade sazi harakate pas zamine va lole ha

var cvs = document.getElementById("mycanvas");
var canvas = cvs.getContext("2d");

var myImg = new Image();
myImg.src = "img/sprite.png"

var SCORE = new Audio();
SCORE.src = "aduio/flappy_bird_codes_audio_score.wav"

var die = new Audio();
die.src = "aduio/flappy_bird_codes_audio_die.wav"

var hit = new Audio();
hit.src = "aduio/flappy_bird_codes_audio_hit.wav"

var start = new Audio();
start.src = "aduio/flappy_bird_codes_audio_start.wav"

var FLAP = new Audio();
FLAP.src = "aduio/flappy_bird_codes_audio_flap.wav"

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
            start.play();
            state.current = state.game
            break;
        case state.game:
            FLAP.play()
            bird.flap();
            break;
        default:
            state.current = state.getReady;
            bird.cvs_rotation = 0;
            score.value = 0;
            this.speed = 0;
            pipes.location = []
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
    dx:2,
    x:0,
    y:cvs.height -112,
    draw: function(){
        canvas.drawImage(myImg,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        canvas.drawImage(myImg,this.sX,this.sY,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
    },
    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx) % (this.w/4)
        }
    }
}

var pipes = {
    top:{
        sX:553,
        sY:0
    },
    bottom:{
        sX:502,
        sY:0
    },
    w:52,
    h:400,
    dx: 2,
    gap:100,
    maxYlocation:-150,
    location:[],
    draw:function(){
        for(let i = 0 ; i < this.location.length ; i++){
            let p = this.location[i]
            let topYpos = p.y;
            let bottomYpos = p.y + this.h + this.gap;
            canvas.drawImage(myImg,this.top.sX,this.top.sY,this.w,this.h,p.x,topYpos,this.w,this.h);
            canvas.drawImage(myImg,this.bottom.sX,this.bottom.sY,this.w,this.h,p.x,bottomYpos,this.w,this.h);
        }
    },
    update:function(){
        if(state.current != state.game) return
        if(frame % 100 == 0){
            this.location.push({
                x:cvs.width,
                y:this.maxYlocation * (Math.random() + 1)
            })
        }
        for(let i = 0 ; i < this.location.length ; i++){
            let p = this.location[i]
            p.x -= this.dx;
            let bottomPipesLocaction = p.y + this.h + this.gap;
            // mikahim bakhorde parande be lole ha ra controll konim.
            if(bird.x + bird.rad > p.x && bird.x - bird.rad < p.x + this.w && bird.y + bird.rad > p.y && bird.y - bird.rad < p.y + this.h){
                state.current = state.over;
                hit.play()
            };
            if(bird.x + bird.rad > p.x && bird.x - bird.rad < p.x + this.w && bird.y + bird.rad > bottomPipesLocaction && bird.y - bird.rad < bottomPipesLocaction + this.h){
                state.current = state.over;
                hit.play();
            };
            if(p.x + this.w <= 0){
                this.location.shift();
                score.value += 1;
                SCORE.play();
                score.best = Math.max(score.value , score.best);
                localStorage.setItem("best",score.best);
            } 
        }  
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
    rad:12,
    gravity:0.3,
    jump:4.7,
    cvs_rotation:0,
    birdFrame:0,
    draw : function(){
        let mybird = this.myanimation[this.birdFrame]
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
        if(this.y + this.h/2 >= cvs.height - forground.h){
            this.y = cvs.height - forground.h - this.h/2;
            this.birdFrame = 1;
            if(state.current == state.game){
                state.current = state.over; 
                die.play();
                this.speed = 0;
            }
        }
    },

    flap: function(){
        this.speed = -this.jump;
    }
}

function update(){
    bird.update();
    forground.update();
    pipes.update()
};

var score = {
    value : 0,
    best : parseInt(localStorage.getItem("best")) || 0 ,
    draw:function(){
        canvas.fillStyle = "#FFF"
        canvas.strokeStyle = "#000"
        if(state.current == state.game){
            // ba kam ya ziyad kardan in property zakhamate neveshte ma kam ya ziyad mishavad.
            canvas.linewidth = 2;
            canvas.font = "35px IMPACT"
            canvas.fillText(this.value , cvs.width/2 , 50);
            canvas.strokeText(this.value , cvs.width/2 , 50);
        }else if(state.current == state.over){
            canvas.linewidth = 2;
            canvas.font = "35px IMPACT"
            canvas.fillText(this.value , 246 , 192);
            canvas.strokeText(this.value , 246 , 192);
            canvas.fillText(this.best , 246 , 237);
            canvas.strokeText(this.best , 246 , 237);
        }
    }
}

function draw(){
    canvas.fillStyle = "#70c5ce"
    canvas.fillRect(0,0,cvs.width , cvs.height);
    background.draw();
    pipes.draw();
    forground.draw();
    bird.draw();
    getReady.draw();
    gameover.draw();
    score.draw();
};

function animation(){
    update();
    draw();
    frame ++;
    requestAnimationFrame(animation);
};
animation();

