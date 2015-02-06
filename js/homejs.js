var beginButton;
var achievementButton;
var context;
var cursorSprite;
window.onload = function(){
  beginButton = document.getElementById('beginbutton');
  achievementButton = document.getElementById('achievementsbutton');
  var canvas = document.getElementById("animations");
  cursorSprite = document.getElementById("cursorsprite");
  context = canvas.getContext("2d");

  beginButton.style.cursor = 'pointer';
  achievementButton.style.cursor = 'pointer';
  context.fillRect(0,0,canvas.width,canvas.height);

  beginButton.onclick = function() {
    window.location.href = "begin.html";
  };

  achievementButton.onclick = function() {
    window.location.href = "achievements.html";
  };

  setInterval(blinkCursorSprite, 530);
}

function blinkCursorSprite(){
  if(cursorSprite.style.opacity == 0){
    cursorSprite.style.opacity = 1;
  }else{
    cursorSprite.style.opacity = 0;
  }
}
