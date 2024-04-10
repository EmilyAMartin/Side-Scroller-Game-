
//Background//
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
    canvas.width = 980;
    canvas.height = 730;

let img = new Image();
    img.src = "background.png";
    let backgroundWidth = 0;
    let scrollSpeed = 2;

//Sprit//
let spiritWidth = 75;
let spiritHeight = 75;
let spiritX = 75;
let spiritY = 500;
let spiritImg = new Image();
    spiritImg.src = "spirit.png";

let spirit = {
    x : spiritX,
    y : spiritY,
    width : spiritWidth,
    height : spiritHeight
} 

window.onload = function() {
function loop()
{
        ctx.drawImage(img, -backgroundWidth, 0); //Background 1
        ctx.drawImage(img, -backgroundWidth + canvas.width, 0); //Background 2
        backgroundWidth += scrollSpeed;
        ctx.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height); 
         
        if (backgroundWidth == canvas.width)
            backgroundWidth = 0;
            window.requestAnimationFrame(loop);
    }
    loop();
}

requestAnimationFrame(update);
setInterval(placeObstacle, 1000); //1000 milliseconds = 1 second
document.addEventListener("keydown", moveSpirit);

   
