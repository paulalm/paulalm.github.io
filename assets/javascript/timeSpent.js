---
---

//TODO: function storageAvailable(), currently in utilsHighlighter.js needs to be extracted out

//on page load, check if we have a counter for this page already
//increment the counter once a second
//show the counter on the page

let secondsOnThisPage = 0;
let timeSpentInterval = null;
let inactivityInterval = null;
let inactivitySeconds = 0;
let IDLE_TIMEOUT = Number.parseInt("{{site.idleTimeout}}"); //at what point should the timer stop?
if( isNaN(IDLE_TIMEOUT)){
    console.log("Invalid timeout setting detected, defaulting to 60 seconds");
    IDLE_TIMEOUT = 60;
}
let inactivityDetected = false;

function getTimespentKey() {
    let path = window.location.pathname;
    let key = path + "-timeSpent";
    return key;
}

function settingUpTimer(e){
    let timeDiv = document.querySelector("#timeSpent div");

    let stored = localStorage.getItem(getTimespentKey());
    if(stored != null){
        secondsOnThisPage = Number.parseInt( stored );
    }
    if( timeSpentInterval == null){
        timeSpentInterval = setInterval(function(e){
            secondsOnThisPage += 1;
            let HH = Math.floor( secondsOnThisPage / (60 * 60));
            let MM = Math.floor( secondsOnThisPage / 60) - (HH * 60);
            let SS = secondsOnThisPage % 60;
            
            timeDiv.innerHTML = `${HH<10 ? "0" : ""}${HH}:${MM<10 ? "0" : ""}${MM}:${SS<10 ? "0" : ""}${SS}`;
        },1000)    
    }

    if( inactivityInterval == null){
        inactivityInterval = setInterval(function(e){
            inactivitySeconds++;
            if(inactivitySeconds > IDLE_TIMEOUT){
                //fire a blur event
                console.log("Inactivity detected!");
                inactivityDetected = true;
                window.dispatchEvent(new Event("blur"));
            }
        },1000);
    }
}

function activtyDetected(){
    if( inactivityDetected == true){
        window.dispatchEvent(new Event("focus"));
        inactivityDetected = false;
    }
    inactivitySeconds = 0;
}


window.addEventListener("click", function(e){
    activtyDetected();
})

window.addEventListener("mousemove", function(e){
    activtyDetected();
})

window.addEventListener("keypress", function(e){
    activtyDetected();
})

window.addEventListener("scroll", function(e){
    activtyDetected();
})

function tearingDownTimer(e){
    clearInterval(timeSpentInterval);
    timeSpentInterval = null;
    clearInterval(inactivityInterval);
    inactivityInterval = null;
    localStorage.setItem( getTimespentKey(), secondsOnThisPage.toString() );   
}

window.addEventListener("load", settingUpTimer);
window.addEventListener("focus", settingUpTimer);

window.addEventListener("beforeunload", tearingDownTimer);
window.addEventListener("blur", tearingDownTimer);
