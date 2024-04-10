

//Background//
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
    canvas.width = 980;
    canvas.height = 730;

let img = new Image();
    img.src = "background.png";
    let backgroundWidth = 0;
    let scrollSpeed = 2;

window.onload = function() {
function background()
{
        ctx.drawImage(img, -backgroundWidth, 0); //Background 1
        ctx.drawImage(img, -backgroundWidth + canvas.width, 0); //Background 2
        backgroundWidth += scrollSpeed;
         
        if (backgroundWidth == canvas.width)
            backgroundWidth = 0;
            window.requestAnimationFrame(background);
    }
    background();
}
   