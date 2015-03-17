var latestInput; //used to check for input
var isTyping = false;
var clearTextTimer = null;
var timer;
var timesRun = 0;
var textOnScreen = "";
var typeTime = 55; /*Very fast for immediate results, good reading speed is 45*/
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

function getPrintedText(){
  return elem = document.getElementById('paraText').innerHTML;
}

function type() {
    if (text === textOnScreen){
      setTimeout(function(){type();}, typeTime);
      isTyping = false;
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
type();
addTextToScreen('<h2 id="title" style="font-family:neb">Detetxtive...               It is time to begin your story.</h2>');
console.log("done first bit ye");
clearText();
addTextToScreen('<p style="font-family:ebitparty">"Welcome to Sandyford Detective-       uh,    I never caught your name.      I\'m Cheif Burns,      you are?"</p>');


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
      addTextToScreen("<i>" + printMainText + "</i><br>");
      latestInput = printMainText;
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

function clearText(){
  var currentText = textOnScreen;

    var thread = setInterval(function(){
      console.log(currentText.size);
        if(currentText === getPrintedText()){
          console.log(currentText.length);
          textOnScreen = textOnScreen.substring(currentText.length);
          text = "";
          i=0;
          document.getElementById('paraText').innerHTML = "";
          console.log(currentText);
          console.log(textOnScreen);
          clearInterval(thread);
        }
    },1);

}
