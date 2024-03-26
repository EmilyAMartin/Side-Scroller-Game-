var sprit = document.getElementById("sprit");
var plant = document.getElementById("plant");
var counter=0;
function jump(){
    if(sprit.classList == "animate"){return}
    sprit.classList.add("animate");
    setTimeout(function(){
        sprit.classList.remove("animate");
    },300);
}    
var checkDead = setInterval(function() {
    let spritTop = parseInt(window.getComputedStyle(sprit).getPropertyValue("top")); 
    let plantLeft = parseInt(window.getComputedStyle(plant).getPropertyValue("left"));
    if(plantLeft<20 && plantLeft>-20 && spritTop>=130){
        plant.style.animation = "none";
        alert("Game Over. score: "+Math.floor(counter/100));
        counter=0;
        plant.style.animation = "plant 1s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);
