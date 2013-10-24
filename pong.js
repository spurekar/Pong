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
};
