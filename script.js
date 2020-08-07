/*
    TODO : 
    1. Add more barriers
    2. Increase the speed of barriers - DONE -
    3. Show tutorial of how to do it
    4. Change game UI
    5. Add scores - DONE -
    6. Start game earlier
*/

var possiblePos = [2.5, 22.5, 42.5, 62.5, 82.5];
var barrierPos = 0;
var barriersSpeed = 10000;

var leftBarrier = 0;
var rightBarrier = 0;

var pos = 42.5;
var transSpeed = 200;

var score = 0;
var loops = 0;

generateBarriers();

function generateBarriers() {
    var refresh = setTimeout(function() {
        score++;
        loops++;
        document.getElementById('barrier-left').style.top = "-10vh";
        document.getElementById('barrier-right').style.top = "-10vh";
        barrierPos = possiblePos[Math.floor(Math.random() * 5)];
        leftBarrier = Math.floor(barrierPos - 1);
        rightBarrier = (98 - Math.floor(barrierPos) - 15);
        document.getElementById('barrier-left').style.width = leftBarrier + "vw"; 
        document.getElementById('barrier-right').style.width = rightBarrier + "vw";
        $("#barrier-left, #barrier-right").animate({top : "110vh"},{
            duration: barriersSpeed,
            step: function(now, fx) {
                var curPos = $('#barrier-left').position();
                var barTop = (Math.floor(curPos.top/100)*100) - 100; 
                var barBottom = (Math.floor($("#obj").position().top/100)*100) - 100;
                if(barTop == (barBottom - 100)) {
                    if(!(pos > leftBarrier && pos < (leftBarrier + 1 + 15 + 1))) {
                        // document.getElementById("word").innerHTML = "You Lost";
                        $("#barrier-left").hide();
                        $("#barrier-right").hide();
                        clearTimeout(refresh);
                        console.log("ENTERED");
                    } else {
                        document.getElementById("score").innerHTML = score;
                    }  
                } 
            }        
        });
        barriersSpeed = Math.max(barriersSpeed - 1000, 1000);
        generateBarriers();
    }, barriersSpeed + 1500);
}

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
            if(pos != 2.5) {
                pos -= 20;
            }
        } else {
            /* right swipe */
            if(pos != 82.5) {
                pos += 20;
            }
        }                       
    } 

    $("#obj").animate({left : pos + "vw"}, transSpeed);

    /* reset values */
    xDown = null;
    yDown = null;                                          
};
