var timer;
var timesRun = 0;
window.onLoad = (function($) {
  timer = setInterval(fixSizes, 1);
  $.fn.writeText = function(content) {
    var contentArray = content.split(""),
    current = 0,
    elem = this;

    typeTime = 45;

    setInterval(function() {
      if(current < contentArray.length) {
        elem.text(elem.text() + contentArray[current++]);
        mainCon = document.getElementById("mainContainer");
        mainCon.scrollTop = mainCon.scrollHeight;
      }
    }, typeTime);
  };
})(jQuery);

$(window).resize(fixSizes);

function fixSizes(){
  mapContainer = document.getElementById("map");
  mainRect = document.getElementById("mainContainer");
  size = (map.clientHeight * 2 + 30);
  mainRect.style.height = size + "px";

  timesRun++;
  if(timesRun > 5){
    clearInterval(timer);
  }
}



$(".paraText").writeText("The Grid. A digital frontier. I tried to picture clusters of information as they moved through the computer. What did they look like? Ships? motorcycles? Were the circuits like freeways? The Grid. A digital frontier. I tried to picture clusters of information as they moved through the computer. What did they look like? Ships? motorcycles? Were the circuits like freeways? The Grid. A digital frontier. I tried to picture clusters of information as they moved through the computer. What did they look like? Ships? motorcycles? Were the circuits like freeways? The Grid. A digital frontier. I tried to picture clusters of information as they moved through the computer. What did they look like? Ships? motorcycles? Were the circuits like freeways? The Grid. A digital frontier. I tried to picture clusters of information as they moved through the computer. What did they look like? Ships? motorcycles? Were the circuits like freeways? The Grid. A digital frontier. I tried to picture clusters of information as they moved through the computer. What did they look like? Ships? motorcycles? Were the circuits like freeways? The Grid. A digital frontier. I tried to picture clusters of information as they moved through the computer. What did they look like? Ships? motorcycles? Were the circuits like freeways? The Grid. A digital frontier. I tried to picture clusters of information as they moved through the computer. What did they look like? Ships? motorcycles? Were the circuits like freeways? ")
