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

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame || 
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
})();

//Initialize canvas and required variables
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    W = window.innerWidth,
    H = window.innerHeight;

//Initialize game pieces
var ball = {},
    paddles = [2];

//Initialize other components
var mouse = {},
    points = 0, //current score
    init,
    over = 0, //set to 1 when game ends
    paddleHit;

//Note mouse movements
canvas.addEventListener("mousemove", trackPosition, true);

//Canvas properties
canvas.width = W;
canvas.height = H;

//Paint canvas
function paintCanvas() {
    ctx.fillStyle = "navy";
    ctx.fillRect(0,0,W,H);
}

//Paddle object
function Paddle(pos) {
    //height and width
    this.h = 5;
    this.w = 150;

    //position
    this.x = W/2 - this.w/2;
    this.y = (pos == "top") ? 0 : H - this.h;
}

//Initialize new paddles
paddles.push(new Paddle("bottom"));
paddles.push(new Paddle("top"));

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

//Draw everything on canvas
function draw() {
    paintCanvas();
    for (var i=0; i < paddles.length; i++) {
        p = paddles[i];
        ctx.fillStyle = "white";
        ctx.fillRect(p.x,p.y,p.w,p.h);
    };

    ball.draw();
    update();
}

//Function to track mouse position
function trackPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

//Function for running the animation
function animLoop() {
    requestAnimFrame(animLoop);
    draw();
};

animLoop();

//Function to update the screen (main for this program)
function update() {

    //Move paddles with mouse
    if (mouse.x && mouse.y) {
        for (var i = 1; i < paddles.length; i++) {
            p = paddles[i];
            p.x = mouse.x - p.w/2;
        }
    }

    //Move the ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    //Handle collisions
    //on paddles
    p1 = paddles[1]; //bottom
    p2 = paddles[2]; //top

    if(collision(ball,p1)) {
        collideAction(ball,p1);
    }

    else if(collision(ball,p2)) {
        collideAction(ball,p2);
    }

    else {
        //on top wall
        if (ball.y + ball.r > H) {
            ball.y = H - ball.r;
            gameOver();
        }
        //on bottom wall
        else if (ball.y < 0) {
            ball.y = ball.r;
            gameOver();
        }

        //on vertical walls
        //on left wall
        if (ball.x - ball.r < 0) {
            ball.vx = -ball.vx;
            ball.x = ball.r;
        }
        //on right wall
        else if (ball.x + ball.r > W) {
            ball.vx = -ball.vx;
            ball.x = W - ball.r;
        }
    }
}

//Function to check collision btwn ball and paddle
function collision(b,p) {
    if (b.x + ball.r >= p.x && b.x - ball.r <= p.x + p.w) {
        if (b.y >= (p.y - p.h) && p.y > 0) {
            paddleHit = 1;
            return true;
        }
        else if (b.y <= p.h && p.y == 0) {
            paddleHit = 2;
            return true;
        }
        else
            return false;
    }
}


//Function which handles a collision
function collideAction(ball, p) {
    ball.vy = -ball.vy;

    if (paddleHit == 1) {
        ball.y = p.y - p.h;
        //particlePos.y = ball.y + ball.r;
        //multiplier = -1;
    }
    else if (paddleHit == 2) {
        ball.y = p.h + ball.r;
        //particlePos.y = ball.y - ball.r;
        //multiplier = 1;
    };

    points++;

};

function gameOver() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over! You scored " + points + " points!", W/2, H/2 + 25);

    //stop animation
    cancelRequestAnimFrame(init);

    //set a game over flag
    over = 1;
};

