var latestInput; //used to check for input
var previousInput;
var clearTextTimer = null;
var timer;
var timesRun = 0;
var textOnScreen = "";
var previousAct = 0;
var i = 0,
    isTag=false,
    text;
var typeTime = 55; /*Very fast for immediate results, good reading speed is 45*/

//<GAME VARIABLES!!!>
var name;
//</GAME VARIABLES!!!>

//Initialize listeners etc
window.onLoad = (function($) {
  timer = setInterval(fixSizes, 1);
  $("#inputTextMain").keypress(printText);
  $("#inputTextNotes").keypress(printNotes);

  $("#mapImage").draggable({
      stop: function(event, ui) {
        mapWidth = $("#mapImage").width() -  $("#map").width();
        mapHeight = $("#mapImage").height() -  $("#map").height();
        
        if(ui.position.left>0){
          $("#mapImage").animate({"left": "0px"}, 300);
        }else if(ui.position.left<-mapWidth){
          $("#mapImage").animate({"left": "-"+mapWidth+"px"}, 300);
        }

        if(ui.position.top > 0){
          $("#mapImage").animate({"top": "0px"}, 300);
        }else if(ui.position.top < -mapHeight){
          $("#mapImage").animate({"top": "-"+mapHeight+"px"}, 300);
        }
    }, scroll: false });
})(jQuery);

$(window).resize(fixSizes);

//Adjusts element sizes according to screen size
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


//Called once, types while queue is not empty
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

//Add text to typing queue
function addTextToScreen(textForScreen){
  textOnScreen = textOnScreen + textForScreen;
}

//Skip typing just display text
function skipTyping(){
  i = textOnScreen.length - 1;
  text = textOnScreen.slice(0,i);
}

//Get text on screen
function getPrintedText(){
  return elem = document.getElementById('paraText').innerHTML;
}

//Receives user input and adds to screen
function printText(event) {
  if(event.keyCode == 13){
      printMainText = document.getElementById("inputTextMain").value;

      if(printMainText != ""){
        addTextToScreen("<i>" + printMainText + "</i><br>");
        latestInput = printMainText;
        x = document.getElementById("inputTextMain");
        x.value = "";
        startNextPartOfAct();
      }else{
        skipTyping();
      }
  }
}

//Used to print notes in the notes section (bottom right)
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

//Before input
function startNextAct(){
  if(previousAct == 1){
    secondAct(true);
    previousAct = 2;
  }else if(previousAct == 2){

  }
}

//After input
function startNextPartOfAct(){
  if(previousAct == 0){
    firstAct();
    previousAct = 1;
    previousInput = latestInput;
    startNextAct();
  }else if(previousAct == 2){
    secondAct(false);
  }else if(previousAct == 3){

  }
}

//Used to clear text from screen
function clearText(){
  var currentText = textOnScreen;
    var thread = setInterval(function(){
        if(currentText === getPrintedText()){
          textOnScreen = textOnScreen.substring(currentText.length);
          console.log(currentText.length);
          text = "";
          i=0;
          document.getElementById('paraText').innerHTML = "";
          clearInterval(thread);
        }
    },1);
}


//ACTS
function firstAct(){
  name = latestInput;
  addTextToScreen('<p style="font-family:ebitparty">"Ah, well it\'s a pleasure to meet you ' + name + '"</p>            ');
  addTextToScreen('<p style="font-family:ebitparty">"Now, down to this case of yours. As you may already know there have been a string of murders here in Sandyford - 3 to be precise. Each murder has happened 1 day after the last. If this pattern continues, there will be a murder tonight. Your job is to find out whoever is behind this and get them behind bars before there is no one left in this bloody town to save."</p>');
  addTextToScreen('<p style="font-family:ebitparty">"Good luck detective.       I know you won\'t let me down."             </p>');
}

function secondAct(first){
  if(first == true){
    clearText();
    addTextToScreen('<p style="font-family:ebitparty"><u>Chapter 1:       The Town</u></p>            ');
    addTextToScreen('<p style="font-family:ebitparty">"It must have been a long journey down here, perhaps you\'d like to turn in for the night. There is a fantastic hotel a few streets away from here, I can give you directions if you\'d like."</p>');

  }else{
    var directionsResponse;
    var validResponse = true;
    switch(yesorno(latestInput)) {
      case "yes":
          directionsResponse = '<p style="font-family:ebitparty">Sure, ...</p>  ';
          break;
      case "no":
          directionsResponse = '<p style="font-family:ebitparty">Looks like you still got some energy inside of you. How about you visit ...</p>';
          break;
      case "undef":
          directionsResponse = '<p style="font-family:ebitparty">Sorry, I don\'t quite understand what you are saying.</p>';
          validResponse = false;
          break;
    }

    addTextToScreen(directionsResponse);

    if(validResponse){
      startNextAct();
    }
  }

}



//Runs on startup, no touchy!
type();
addTextToScreen('<h2 id="title" style="font-family:neb">Detetxtive...               It is time to begin your story.</h2>                                           ');
clearText();
addTextToScreen('<p style="font-family:ebitparty">"Welcome to Sandyford Detective-       uh,    I never caught your name.      I\'m Cheif Burns,      you are?"</p>');


//Text analysis
function yesorno(word){
  word = word.toLowerCase();
  if(word.indexOf("no") > -1){
    return 'no';
  }else if(word.indexOf("yes") > -1 || word.indexOf("yeah") > -1){
    return 'yes';
  }else{
    return 'undef';
  }
}
