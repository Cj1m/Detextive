var timer;
var timesRun = 0;
var textOnScreen = "";
var typeTime = 45; /*Very fast for immediate results, good reading speed is 45*/
//var i = 0;
//var isTag = false;
window.onLoad = (function($) {
  timer = setInterval(fixSizes, 1);
  $("#inputTextMain").keypress(printText);
  $("#inputTextNotes").keypress(printNotes);
})(jQuery);

var i = 0,
    isTag=false,
    text;

function type() {
    if (text === textOnScreen){
      setTimeout(function(){type();}, typeTime);
      return;
    }
    text = textOnScreen.slice(0, i+1);
    i++;
    var elem = document.getElementById('paraText');

    elem.innerHTML = text;

    var char = text.slice(-1);

    if( char === '<' ) isTag = true;
    if( char === '>' ) isTag = false;
    elem.scrollTop = elem.scrollHeight;

    if (isTag) return type();
    setTimeout(function(){type();}, typeTime);
}

function addTextToScreen(textForScreen){
  textOnScreen = textOnScreen + textForScreen;
}

addTextToScreen('<h2 id="title" style="font-family:neb">Detetxtive...               It is time to begin your story</h2>');
addTextToScreen('<p style="font-family:ebitparty">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>');
type();
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
      printMainText = document.getElementById("inputTextMain").value;
      addTextToScreen("<br><i>" + printMainText + "</i>");
      x = document.getElementById("inputTextMain");
      x.value = "";
  }
}

function printNotes(event) {
  if(event.keyCode == 13){
    var x = document.getElementById("inputTextNotes");
      if(x.value != ""){
        var printNotesText = document.getElementById("inputTextNotes").value;
        var inputText = "&bull;" + printNotesText + "<br />";
        var elem = document.getElementById('notesText');
        elem.innerHTML += inputText;
        elem.scrollTop = elem.scrollHeight;
        x.value = "";
      }
  }
}
