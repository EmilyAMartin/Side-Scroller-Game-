const canvas = document.getElementById('canvas');

let ctx = canvas.getContext('2d');
    canvas.width = 980;
    canvas.height = 730;

let img = new Image();
    img.src = "background.png";
 

window.onload = function() {
    let imgWidth = 0;
    let scrollSpeed = 2;
    function loop()
    {
        ctx.drawImage(img, 0, imgWidth);
        ctx.drawImage(img, 0, imgWidth - canvas.width);
        imgWidth += scrollSpeed;
 
        if (imgWidth == canvas.width)
            imgWidth = 0;
            window.requestAnimationFrame(loop);
    }
    loop();
}