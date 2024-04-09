const canvas = document.getElementById('canvas');

let ctx = canvas.getContext('2d');
    canvas.width = 980;
    canvas.height = 730;

let img = new Image();
    img.src = "background.png";
    let imgWidth = 0;

let scrollSpeed = 2;

window.onload = function() {  
function loop()
{
        ctx.drawImage(img, imgWidth, 25); //Background 1
        ctx.drawImage(img, imgWidth, 0 - canvas.width); //Background 2
        imgWidth += scrollSpeed;
 
        if (imgWidth == canvas.width)
            imgWidth = 0;
            window.requestAnimationFrame(loop);
    }
    loop();
}