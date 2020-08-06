// LEFT : Math.floor(pos - 1)
// RIGHT : (98 - Math.floor(pos) - 15)

$(document).ready(function(){
    $("#barrier-left, #barrier-right").animate({top : "110vh"}, 3000);
});

var target = document.getElementById("main-content");

target.addEventListener('touchstart', handleTouchStart, false);        
target.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             
         evt.originalEvent.touches;
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

var text = document.getElementById('word');

var pos = 42.5;
var transSpeed = 500;

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            /* left swipe */
            text.innerHTML = "LEFT";
            if(pos != 2.5) {
                pos -= 20;
            }
        } else {
            /* right swipe */
            text.innerHTML = "RIGHT";
            if(pos != 82.5) {
                pos += 20;
            }
        }                       
    } 
    // , transform : "translateX(-" + transPos + "vw)"
    $("#obj").animate({left : pos + "vw"}, transSpeed);
    $("#barrier-left").animate({width : Math.floor(pos - 1) + "vw"});
    $("#barrier-right").animate({width : (98 - Math.floor(pos) - 15) + "vw"});

    /* reset values */
    xDown = null;
    yDown = null;                                          
};
