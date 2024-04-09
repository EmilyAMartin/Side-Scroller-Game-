
const canvas = document.getElementById('canvas');

let ctx = canvas.getContext('2d');
    canvas.width = 980;
    canvas.height = 730;

let img = new Image();
    img.src = "background.png";
    let imgWidth = 0;

let scrollSpeed = 2;

let spiritWidth = 75;
let spiritHeight = 75;
let spiritX = 90;
let spiritY = 90;
let spiritImg;
let spirit = {
    x : spiritX,
    y : spiritY,
    width : spiritWidth,
    height : spiritHeight
} 

window.onload = function() {  
    spiritImg = new Image(); // This draws the spirit character//
    spiritImg.src = "spirit.png";
    spiritImg.onload = function() {
    context.drawImage(spiritImg, spirit.x, spirit.y, spirit.width, spirit.height); 
    }
    
function loop()
{
        ctx.drawImage(img, -imgWidth, 0); //Background 1
        ctx.drawImage(img, -imgWidth, 0 - canvas.width); //Background 2
        imgWidth += scrollSpeed;
 
        if (imgWidth == canvas.width)
            imgWidth = 0;
            window.requestAnimationFrame(loop);
    }
    loop();
}