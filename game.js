

function detectKey(e,player) {

    var posLeft = document.getElementById(player).offsetLeft;
    var posTop = document.getElementById(player).offsetTop;

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        document.getElementById(player).style.marginTop  = (posTop-58)+"px";
    }
    
    else if (e.keyCode == '40') {
        // down arrow
        document.getElementById(player).style.marginTop  = (posTop+58)+"px";
    }
    else if (e.keyCode == '37') {
       // left arrow
        document.getElementById(player).style.marginLeft  = (posLeft-58)+"px";
    }
    else if (e.keyCode == '39') {
       // right arrow
        document.getElementById(player).style.marginLeft  = (posLeft+58)+"px";
    }

}