var beginButton;
var achievementButton;
window.onload = function(){
  beginButton = document.getElementById('beginbutton');
  achievementButton = document.getElementById('achievementsbutton');

  beginButton.style.cursor = 'pointer';
  achievementButton.style.cursor = 'pointer';

  beginButton.onclick = function() {
    window.location.href = "begin.html";
  };

  achievementButton.onclick = function() {
    window.location.href = "achievements.html";
  };
}
