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

  addFirstObjects();
  setInterval(blinkCursorSprite, 530);
  setInterval(draw, 33);
  setInterval(addObject, 33);
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
  }
}

function addFirstObjects(){
  var amount = Math.round(canvas.width / 200) + 1;
  for(i = amount; i >= 0; i--){
    var x = 1 + Math.round(Math.random() * 6);
    var objectImage ="assets/object" + x + ".png";
    objectsOnCanvas.push(objectImage);
    objectXs.push(i * 200 - 200);
  }
  console.log(objectXs)
}

function addObject(){
    if(objectXs.length > 0){
      if(objectXs[objectXs.length - 1] > 0){
        var x = 1 + Math.round(Math.random() * 6);
        var objectImage ="assets/object" + x + ".png";
        objectsOnCanvas.push(objectImage);
        objectXs.push(-200);
      }
    }else{
      var x = 1 + Math.round(Math.random() * 6);
      var objectImage ="assets/object" + x + ".png";
      objectsOnCanvas.push(objectImage);
      objectXs.push(-200);
    }



}

(function() {
        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
              if(canvas != null){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
              }
        }
        resizeCanvas();
})();
