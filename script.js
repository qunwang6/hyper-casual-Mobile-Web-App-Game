/*
    TODO : 
    1. Add more barriers - NOT NEEDED -
    2. Increase the speed of barriers - DONE -
    3. Show tutorial of how to do it - DONE -
    4. Change game UI - DONE -
    5. Add scores - DONE -
    6. Start game earlier - NOT NEEDED -
    7. Losing page - DONE -
    8. Check if not phone
*/

var possiblePos = [2.5, 22.5, 42.5, 62.5, 82.5];
var barrierPos = 0;
var barriersSpeed = 4000;

var leftBarrier = 0;
var rightBarrier = 0;

var pos = 42.5;
var transSpeed = 100;

var score = 0;

function lost() {
    if(score > 0) {
        score--;
    }
    $("#lost-score").text("SCORE : " + score);
    $("#lostPage").delay(1000).slideDown();
    $("#retry").delay(2000).fadeIn();
}

function tutorial() {
    hideMainPage();
    showGameElements();
    animateTutorial();
}

function startGame() {
    hideMainPage();
    $("#barrier-left, #barrier-right").delay(1500).animate({width : "1px"});
    showGameElements();
    generateBarriers();
}

function hideMainPage() {
    $("#top, #developer, #btn-container, #tut-txt, #startFrmTutorial").fadeOut(1000);
}

function hideGameElements() {
    $("#score, #barrier-left, #barrier-right, #obj").hide();
}

function showGameElements() {
    $("#score, #barrier-left, #barrier-right, #obj").delay(1500).fadeIn(1000);
}

function animateTutorial() {
    $("#barrier-left, #barrier-right").css("top", "10vh");
    $("#tut-txt").text("Swipe left or right to move the ball");
    $("#tut-txt").delay(1500).fadeIn();
    $("#barrier-left, #barrier-right").delay(3000).animate({width : "41vw"});
    $("#tut-txt").delay(3500).fadeOut();
    setTimeout(function() {
        $("#tut-txt").css("top", "20vh");
        $("#tut-txt").text("When the barriers approach, make sure the ball is between the barriers. It's that simple");
    }, 6500);
    $("#barrier-left, #barrier-right").delay(1000).animate({top : "60vh"});
    $("#tut-txt").delay(1500).fadeIn();
    $("#tut-txt").delay(3500).fadeOut();
    $("#startFrmTutorial").delay(12000).fadeIn();
}

function generateBarriers() {
    var refresh = setTimeout(function() {
        score++;
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
                        $("#barrier-left").hide();
                        $("#barrier-right").hide();
                        clearTimeout(refresh);
                        lost();
                    } else {
                        document.getElementById("score").innerHTML = score;
                    }  
                } 
            }        
        });

        /*If score is 6 or below, use Math.Random to choose whether,
          to increse to 10,000 or to decrease to 1000.
          If the score is more than 6, keep decreasing to 1000
        */
        if(Math.round(Math.random()) && barriersSpeed < 10000 && score <= 6) {
            barriersSpeed += 1000;
        } else {
            barriersSpeed = Math.max(barriersSpeed - 1000, 1000);    
        }

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

    if ( Math.abs( xDiff ) > Math.abs( yDiff )) {
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
