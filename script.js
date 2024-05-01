
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
function toggleMuted(){
    document.getElementById("soundBtn").muted = true;
    };

    //Background Audio and Buttons//
let audio, playbtn;
function initAudioPlayer(){
    audio = new Audio();
    audio.src = "./music/music.mp3";
    audio.volume = 0.05; //Volume of background music
    audio.loop = true;
    audio.play();
    //Set object references//
    playbtn = document.getElementById("playpausebtn");
    mutebtn = document.getElementById("mutebtn")
    //Add event Handeling//
    playbtn.addEventListener("click", playPause);
    mutebtn.addEventListener("click", mute);
    
    function playPause(){
        if(audio.paused){
            audio.play();
            playbtn.style.background = "url(music/pause.png) no-repeat";
        } else {
            audio.pause();
            playbtn.style.background = "url(music/play.png) no-repeat";
        }
    }
    function mute(){
        if (audio.muted){
            audio.muted = false;
            mutebtn.style.background = "url(music/speaker.png) no-repeat";
        } else {
            audio.muted = true;
            mutebtn.style.background = "url(music/speaker_muted.png) no-repeat";
        }   
    }
} window.addEventListener("load", initAudioPlayer);