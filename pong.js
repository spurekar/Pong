window.onload = function() {

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
};
