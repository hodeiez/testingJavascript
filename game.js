function detectKey(e) {
  let player = document.getElementById("player");
  let screen = document.getElementById("screen");
  console.log("screen width " + screen.getBoundingClientRect().width);
  console.log("screen height " + screen.getBoundingClientRect().height);
  console.log(player.getBoundingClientRect().x+' p position');
  let posLeft = player.offsetLeft;
  let posTop = player.offsetTop;
  console.log("posTop " + posTop);
  console.log("posLeft " + posLeft);
  e = e || window.event;

  if (e.keyCode == "32") {
    // up arrow
    player.style.marginTop = posTop - 58 * 4 + "px";
    //player.top((posTop-58*4)+"px");
  } else if (e.keyCode == "40") {
    // down arrow
    player.style.marginTop = posTop + 58 + "px";
  } else if (e.keyCode == "37") {
    // left arrow
    player.style.marginLeft = posLeft - 58 + "px";
    player.style.rotate = "45deg";
  } else if (e.keyCode == "39") {
    // right arrow
    player.style.marginLeft = posLeft + 58 + "px";
  }
  if (posTop < document.getElementById("screen").offsetTop) {
    document.getElementById("player").style.backgroundColor = "red";
    document.getElementById("player").style.marginTop = posTop + "px";
    console.log(posTop);
  }
}
