var player={
    
}

function detectKey(e) {


    let posLeft = document.getElementById("player").offsetLeft;
    let posTop = document.getElementById("player").offsetTop;

    e = e || window.event;

    if (e.keyCode == '32') {
        // up arrow
        document.getElementById("player").style.marginTop  = (posTop-58*4)+"px";
    }

    else if (e.keyCode == '40') {
        // down arrow
        document.getElementById("player").style.marginTop  = (posTop+58)+"px";
    }
    else if (e.keyCode == '37') {
       // left arrow
        document.getElementById("player").style.marginLeft  = (posLeft-58)+"px";
        document.getElementById("player").style.rotate = "45deg";
    }
    else if (e.keyCode == '39') {
       // right arrow
        document.getElementById("player").style.marginLeft  = (posLeft+58)+"px";
    }
   if(posTop<document.getElementById("screen").offsetTop){
        document.getElementById("player").style.backgroundColor ="red";
        document.getElementById("player").style.marginTop= posTop+"px";
        console.log(posTop);
    }
    

}