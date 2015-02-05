var beginButton;
var achievementButton;
var context;
window.onload = function(){
  beginButton = document.getElementById('beginbutton');
  achievementButton = document.getElementById('achievementsbutton');
  var canvas = document.getElementById("animations");
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
}
