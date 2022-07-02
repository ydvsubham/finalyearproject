var cv = document.getElementById("myCanvas");
cv.width=window.innerWidth;
cv.height=window.innerHeight;
var c = cv.getContext("2d");


var f=1;
var x=200;
var y=299;
function loop(){
    c.clearRect(0,0,cv.width,cv.height)
    c.beginPath();
    c.arc(x+f, y, 10, 0, Math.PI*2);
    c.stroke();
    
   f+=20
}

setInterval(loop, 20);