
function runGame() {   
    window.location ="game.html";
}
function showInstructions(){
    window.location = "instructions.html"
}; 
function goBack(){
    window.location = "index.html"
};
function showSettings(){
    window.location = "settings.html"
}; 

function toggleMute(){
toggleMute.addEventListener("click",() => {
toggleMute.classList.toggle("active");  
})
}