//@ts-check
//Source MDN: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
//two options:
//a) localStorage does not exist
//b) loalStorage exists but is disabled
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

let styles = {
    warning: "color: white; background-color: darkorange; padding: 5px; border-radius: 15px",
    info: "color: white; background-color: gray; padding: 5px; border-radius: 15px",
    goodNews:  "color: white; background-color: darkgreen; border-radius: 15px; padding: 5px",
    badNews: "color: white; background-color: red; border-radius: 15px; padding: 5px"
}

/* Which key has which keyCode? Head over to https://keycode.info/ */
let keysPressed = {};
window.onkeyup = function(e) { 
    console.log("%c key up: "+e.keyCode, styles["info"]);
    keysPressed[e.keyCode] = 0; 
}
window.onkeydown = function(e) { 
    console.log("%c key down: "+e.keyCode, styles["info"]);
    keysPressed[e.keyCode] = 1; 
}

//key for each path
function getHighlightStorageKey() {
    let path = window.location.pathname;
    let key = path + "-text-highlights";
    return key;
}

//notes are stored in localStorage too 
function getAnnotationStorageKey(timestamp) {
    let path = window.location.pathname;
    let key = path + "-" + timestamp;
    return key;
}

function hidePopup(){
    document.getElementById("popup").style.display = "none";    
}

function showPopup(){
    document.getElementById("popup").style.display = "block";      
}

function clearPopup(){
    document.getElementById("popup-text").value = "";
    document.getElementById("popup").removeAttribute("data-timestamp");
}

function addEventListenerToHighlights(hltr) {
    let highlights = document.querySelectorAll(".text-highlighted");

    highlights.forEach(function (highlight) {
        highlight.addEventListener('dblclick', function (e) {
            
            //several highlights can have the same timestamp
            let dataTimestamp = this.getAttribute("data-timestamp");
            //hltr.removeHighlights(this);
            let toDelete = document.querySelectorAll(".text-highlighted[data-timestamp='" + dataTimestamp + "']");

            toDelete.forEach(function (del) {
                hltr.removeHighlights(del);
            });

            localStorage.setItem(getHighlightStorageKey(), hltr.serializeHighlights());
            localStorage.removeItem(getAnnotationStorageKey(dataTimestamp));
            document.getElementById("popup").style.display = "none";

            e.preventDefault();//click on a link should not lead to additional hyperlink behaviour
        });

        highlight.addEventListener('mouseenter', function (e) {

            let popup = document.getElementById("popup");
            let dataTimestamp = this.getAttribute("data-timestamp");

            //textarea is already visible and we remain in the same highlight
            if (popup.style.display === "block" && popup.getAttribute("data-timestamp") === dataTimestamp)
                return;

            clearPopup();
            showPopup();//needed here, otherwise popup size is 0/0

            let clientWidth = document.getElementsByTagName("body")[0].clientWidth;
            let clientHeight = document.getElementsByTagName("body")[0].clientHeight;
            let popupWidth = popup.offsetWidth;
            let popupHeight = popup.offsetHeight;

            //bottom and right borders need to be treated with care
            popup.style.left = Math.min(e.pageX, clientWidth - popupWidth) + "px";
            popup.style.top = Math.min(e.pageY, clientHeight - popupHeight) + "px";

            popup.setAttribute("data-timestamp", dataTimestamp);

            let stored = localStorage.getItem(getAnnotationStorageKey(dataTimestamp));
            if (stored != null) {
                document.getElementById("popup-text").value = stored;
            }
            else
                console.log("%c Nothing stored for this timestamp", styles["warning"]);
        });

        document.getElementById("popup-close").addEventListener("click", function (e) {

            let popup = document.getElementById("popup");
            let dataTimestamp = popup.getAttribute("data-timestamp");

            localStorage.setItem(getAnnotationStorageKey(dataTimestamp), document.getElementById("popup-text").value);
            hidePopup();
        });

        document.getElementsByTagName("main")[0].addEventListener("click", function (e) {
            //if click on <main> and not on any highlight, make the popup invisible
            if (e.target.closest(".text-highlighted") == null && document.getElementById("popup").style.display != "none")
                hidePopup();
        })
    });

    document.getElementById("popup-close").addEventListener("click", function (e) {
        hidePopup();
    });

    document.getElementById("deleteHighlights").addEventListener("click", function (e) {
        hltr.removeHighlights();
        localStorage.removeItem(getHighlightStorageKey());

        Object.keys(localStorage).forEach(function (key) {
            if (key.startsWith(window.location.pathname))
                localStorage.removeItem(key);
        });
    });
};

if (storageAvailable('localStorage') == true) {
    console.log("%c Browser feature localStorage available.", styles["goodNews"]);

    let hltr = new TextHighlighter(document.querySelector('section'), {
        color: getComputedStyle(document.querySelector('.text-highlighted-highlight')).backgroundColor,
        onBeforeHighlight: function(range){
            //check if 'h' is pressed
            if( keysPressed[72]>0)
                return true;
            return false;
        },
        onAfterHighlight: function (range) {
            //dump highlights out to local storage again
            localStorage.setItem(getHighlightStorageKey(), hltr.serializeHighlights());
            //add event listener to highlight so it can be removed again
            addEventListenerToHighlights(hltr);
        }
    });

    // if highlights are stored locally, pull them up
    let storedHighlights = localStorage.getItem(getHighlightStorageKey());
    if (storedHighlights != null)
        hltr.deserializeHighlights(storedHighlights);
    else
        console.log("%c No highlights stored in localStorage.", styles["warning"]);
    addEventListenerToHighlights(hltr);

    //make the highlight information box available
    document.getElementsByClassName("text-highlighted-info")[0].style.display = "block";
}
else
    console.log("%c Browser feature localStorage not available.", styles["badNews"]);



