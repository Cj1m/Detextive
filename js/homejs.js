var beginButton;
var achievementButton;
var canvas;
var context;
var cursorSprite;

var objectsOnCanvas = [];
var objectXs = [];

window.onload = function(){
  beginButton = document.getElementById('beginbutton');
  achievementButton = document.getElementById('achievementsbutton');
  canvas = document.getElementById("animations");
  cursorSprite = document.getElementById("cursorsprite");
  context = canvas.getContext("2d");

  beginButton.style.cursor = 'pointer';
  achievementButton.style.cursor = 'pointer';
  canvas.width = window.innerWidth;
  canvas.height = 250;


  beginButton.onclick = function() {
    window.location.href = "begin.html";
  };

  achievementButton.onclick = function() {
    window.location.href = "achievements.html";
  };

  setInterval(blinkCursorSprite, 530);
  setInterval(draw, 33);
  addObject();
  setInterval(addObject, 6000);
}

function blinkCursorSprite(){
  if(cursorSprite.style.opacity == 0){
    cursorSprite.style.opacity = 1;
  }else{
    cursorSprite.style.opacity = 0;
  }
}

function draw(){
  context.clearRect(0, 0, canvas.width, canvas.height);

  for(i = 0; i < objectsOnCanvas.length; i++){
    var img = new Image();
    img.src = objectsOnCanvas[i];
    context.drawImage(img, objectXs[i],canvas.height-img.height, img.width, img.height);
    objectXs[i]++;
    if(objectXs[i] > canvas.width){
      objectsOnCanvas.splice(i, 1);
      objectXs.splice(i, 1);
    }
    console.log(objectsOnCanvas);
  }
}

function addObject(){
  var x = 1 + Math.round(Math.random() * 6);
  var objectImage ="assets/object" + x + ".png";


  objectsOnCanvas.push(objectImage);
  objectXs.push(0);
}

(function() {
        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
        }
        resizeCanvas();
})();
