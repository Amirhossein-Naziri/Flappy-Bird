
var cvs = document.getElementById("mycanvas");
var canvas = cvs.getContext("2d");

var frame = 0;

var myimg = new Image();
myimg.src = "img/"

function update(){

};

function draw(){
    canvas.fillRect(0,0,cvs.width , cvs.height);
    canvas.fillstyle = "70c5ce"
};

function animation(){
    update();
    draw();
    frame ++;
    requestAnimationFrame(animation);
}

animation()

