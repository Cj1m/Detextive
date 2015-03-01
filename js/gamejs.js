var timer;
var timesRun = 0;
var textOnScreen = "";
var typeTime = 45; /*Very fast for immediate results, good reading speed is 45*/
//var i = 0;
//var isTag = false;
window.onLoad = (function($) {
  timer = setInterval(fixSizes, 1);
  $("#inputText").keypress(printText);
})(jQuery);

var i = 0,
    isTag=false,
    text;

function type() {
    text = textOnScreen.slice(0, i+1);
    if (text === textOnScreen){
      setTimeout(function(){type();}, typeTime);
      return;
    }
    i++;
    document.getElementById('paraText').innerHTML = text;

    var char = text.slice(-1);
    console.log(char);
    if( char === '<' ) isTag = true;
    if( char === '>' ) isTag = false;

    if (isTag) return type();
    setTimeout(function(){type();}, typeTime);
}

function addTextToScreen(textForScreen){
  textOnScreen = textOnScreen + textForScreen;
}
type();
addTextToScreen("is it a bird?");
addTextToScreen("<br>is it a plane?");
addTextToScreen("<br>...");
addTextToScreen("<br>no - it's <i>superman</i>");




$(window).resize(fixSizes);

function fixSizes(){
  mapContainer = document.getElementById("map");
  padder = document.getElementById("breaker");
  mainRect = document.getElementById("mainContainer");
  size = (map.clientHeight * 2 + 30 + padder.clientHeight);
  mainRect.style.height = size + "px";

  timesRun++;
  if(timesRun > 5){
    clearInterval(timer);
  }
}

function printText(event) {
  if(event.keyCode == 13){
      printText = document.getElementById("inputText").value;
      addTextToScreen("<br>" + printText);
      x = document.getElementById("inputText");
      x.value = "";

  }
}

//$(".paraText").writeText("Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.")
//type("hl<br>");
//type("jala");
