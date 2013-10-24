//RequestAnimFrame: browser API to get smooth animations
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( callback ){ 
        return window.setTimeout(callback,1000/60); 
    }; 
})();


//Initialize canvas and required variables
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    W = window.innerWidth,
    H = window.innerHeight;

//Canvas properties
canvas.width = W;
canvas.height = H;
ctx.fillRect(0,0,W,H);

//Initialize game pieces
var particles = [],
    ball = {},
    paddles = [2];

//Paint canvas
function paintCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,W,H);
} 

//Ball object
ball = {
    x: 50,
    y: 50,
    r: 5,
    c: "white",
    vx: 4,
    vy: 8,

    //Function for drawing the ball on canvas
    draw: function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        //parameters above are: x init coord, y init coord, arc radius, starting angle, final angle, cw (ccw)
        ctx.fill();
    }
};

//Paddle object
function paddle(pos) {
    //height and width
    this.h = 5;
    this.w = 150;

    //position
    this.x = W/2 - this.w/2;
    this.y = (pos == "top") ? 0 : H - this.h;
};

//Initialize new paddles
paddles.push(new paddle("bottom"));
paddles.push(new paddle("top"));

//Draw everything on canvas
function draw() {
    paintCanvas();
    for (var i=0; i < paddles.length; i++) {
        p = paddles[i];
        ctx.fillStyle = "white";
        ctx.fillRect(p.x,p.y,p.w,p.h);
    }

    ball.draw();
};

//Function for running the animation
function animLoop() {
    requestAnimFrame(animLoop);
    draw();
}

animLoop();

